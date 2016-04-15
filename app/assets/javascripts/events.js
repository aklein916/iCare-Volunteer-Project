//= require angular
//= require angular-resource
//= require angular-ui-router
"use strict";

(function(){
  angular
  .module("icare", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .factory("EventFactory", [
    "$resource",
    EventFactoryFunction
  ])
  .factory("StoryFactory", [
    "$resource",
    StoryFactoryFunction
  ])
  .directive("storyForm", [
    "StoryFactory",
    "$state",
    StoryFormDirectiveFunction
  ])
  .controller("event_index_controller", [
    "EventFactory",
    EventIndexControllerFunction
  ])
  .controller("event_show_controller", [
    "EventFactory",
    "$stateParams",
    EventShowControllerFunction
  ])
  .controller("story_index_controller", [
    "StoryFactory",
    StoryIndexControllerFunction
  ])
  .controller("story_form_controller", [
    StoryFormControllerFunction
  ])
  .controller("story_show_controller", [
    "StoryFactory",
    "$stateParams",
    StoryShowControllerFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("eventIndex", {
      url: "",
      templateUrl: "ng-view/event.index.html",
      controller: "event_index_controller",
      controllerAs: "EventIndexVM"
    })
    .state("eventShow",{
      url: "/events",
      templateUrl: "ng-view/event.show.html",
      controller: "event_show_controller",
      controllerAs: "EventShowVM"
    })
    .state("storyIndex", {
      url: "/stories",
      templateUrl: "ng-view/story.index.html",
      controller: "story_index_controller",
      controllerAs: "StoryIndexVM"
    })
    .state("storyForm", {
      url: "/stories/new",
      templateUrl: "ng-view/story.form.html",
      controller: "story_form_controller",
      controllerAs: "StoryFormVM"
    })
    .state("storyShow", {
      url: "/stories/:id",
      templateUrl: "ng-view/story.show.html",
      controller: "story_show_controller",
      controllerAs: "StoryShowVM"
    });

  }

  function EventFactoryFunction($resource){
    var vm = this;
    var event =
     $resource("/events/:id.json", {}, {
      UPDATE: {method: "PUT"}
    });
    vm.data = event.query();
    vm.sort_data_by = function(title){
      vm.sort_on = title;
      vm.is_descending =!(vm.is_descending);
    }
    return event;
  }
  function EventIndexControllerFunction(EventFactory, $state){
    var EventIndexVM = this;
    this.events = EventFactory.query();
    this.newEvent = new EventFactory();
    this.url = "";
    this.changeUrl = function(event){
      $state.go("eventShow")
    }
  }
  function EventShowControllerFunction(EventFactory, $stateParams){
    var EventShowVM = this;
    EventShowVM.event = EventFactory.get[{id: $stateParams.id}]
  };

  function StoryFactoryFunction($resource){
    return $resource("/stories/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.data = story.query();
    vm.sort_data_by = function(name){
      vm.sort_on = name;
      vm.is_descending =!(vm.is_descending);
    }
  return story;
  }

  function StoryIndexControllerFunction(StoryFactory){
    var StoryIndexVM = this;
    this.stories = StoryFactory.query();
    this.newStory = new StoryFactory();
  }
  function StoryFormControllerFunction(){

  }

  function StoryShowControllerFunction(StoryFactory, $stateParams){
    var StoryShowVM = this;
    StoryShowVM.story = StoryFactory.get({id:$stateParams.id})
  }

  function StoryFormDirectiveFunction(StoryFactory, $state){
    return{
      templateUrl: "ng-view/_story.form.html",
      scope: {
        formMethod: "@"
      },
      link: function(scope){
        scope.create = function(){
          StoryFactory.save(scope.story, function(response){
            StoryFactory.all.push(response);
          });
        }
      }
    }
  }
})();
