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
  .controller("index_controller", [
    "StoryFactory",
    IndexControllerFunction
  ])
  .controller("show_controller", [
    "StoryFactory",
    "$stateParams",
    ShowControllerFunction
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
      controller: "index_controller",
      controllerAs: "IndexVM"
    })
    .state("storyShow", {
      url: "/stories/:id",
      templateUrl: "ng-view/story.show.html",
      controller: "show_controller",
      controllerAs: "ShowVM"
    });
  }

  function StoryFactoryFunction($resource){
    return $resource("http://localhost:3000/stories/:id.json", {}, {
      update: {method: "PUT"}
    });
  }

  function IndexControllerFunction(StoryFactory){
    var IndexVM = this;
    this.stories = StoryFactory.query();
    this.newStory = new StoryFactory();
  }

  function ShowControllerFunction(StoryFactory, $stateParams){
    var showVM = this;
    showVM.story = StoryFactory.get({id:$stateParams.id})
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

}());
