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
  .factory("StoryFactory", [
    "$resource",
    StoryFactoryFunction
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ])
  .controller("story_index_controller", [
    "StoryFactory",
    StoryIndexControllerFunction
  ])
  .controller("story_show_controller", [
    "StoryFactory",
    "$stateParams",
    StoryShowControllerFunction
  ])
  .directive("storyForm", [
    "StoryFactory",
    "$state",
    StoryFormDirectiveFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("index", {
      url: "/stories",
      templateUrl: "ng-view/story.index.html"
      controller: "story_index_controller",
      controllerAs: "StoryIndexVM"
    })
    .state("show", {
      url: "/stories/:id",
      templateUrl: "ng-view/story.show.html",
      controller: "story_show_controller",
      controllerAs: "StoryShowVM"
    });
  }
  function StoryFactoryFunction($resource){
    var vm = this;
    var story = $resource("/stories/:id/json", {}, {
      update: {method: "PUT"}
    });
    vm.data = story.query();
    return Story;

    function StoryIndexControllerFunction(StoryFactory, $stateParams){
    var StoryIndexVM = this;
    StoryIndexVM.stories = StoryFactory.query();
    StoryIndexVM.newStory = new StoryFactory();
  }

  function StoryShowControllerFunction(StoryFactory, $stateParams){
    var StoryShowVM = this;
    StoryShowVM.story = StoryFactory.get({id:$stateParams.id})
    StoryFactory.all.$promise.then(function(){
      StoryFactory.all.forEach(function(story){
        if(story.id == $stateParams.id){
          StoryShowVM.story == story;
        }
      });
    });
  }

  function StoryFormDirectiveFunction(StoryFactory, $state){
    return{
      templateUrl: "ng-view/story.form.html",
      scope: {
        story: "=",
        formMethod: "@"
      },
      link: function(scope){
        scope.create = function(){
          scope.story.save(scope.story, function(response){
            story.all.push(response);
          });
        }
      }
    }
  }
})();
