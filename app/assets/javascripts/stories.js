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
  .factory("StoryFactory", [
    "$resource",
    StoryFactoryFunction
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
    .state("storyIndex", {
      url: "/stories",
      templateUrl: "ng-view/story.index.html",
      controller: "story_index_controller",
      controllerAs: "StoryIndexVM"
    })
    .state("storyShow", {
      url: "/stories/:id",
      templateUrl: "ng-view/story.show.html",
      controller: "story_show_controller",
      controllerAs: "StoryShowVM"
    });
  }

  function StoryFactoryFunction($resource){
    return $resource("http://localhost:3000/stories/:id.json", {}, {
      update: {method: "PUT"}
    });
    // vm.data = story.query();
    // vm.sort_data_by = function(name){
    //   vm.sort_on = name;
    //   vm.is_descending =!(vm.is_descending);
    // }
  }

  function StoryIndexControllerFunction(StoryFactory){
    var StoryIndexVM = this;
    this.stories = StoryFactory.query();
    this.newStory = new StoryFactory();
  }

  function StoryShowControllerFunction(StoryFactory, $stateParams){
    var StoryShowVM = this;
    StoryShowVM.story = StoryFactory.get({id:$stateParams.id})
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
          scope.story.$save(scope.story, function(response){
            $state.go("storyIndex", {}, {reload: true});
          });
        }
      }
    }
  }

}());
