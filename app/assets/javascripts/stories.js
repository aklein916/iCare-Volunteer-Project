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
  ]);
  .factory("StoryFactory", [
    "$resource",
    StoryFactoryFunction
  ])
  .controller("index_controller", [
    "Story",
    IndexControllerFunction
  ]);
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
    .state("index", {
      url: "/stories",
      templateUrl: "ng-view/story.index.html"
      controller: "index_controller",
      controllerAs: "IndexVM"
    })
    .state("show", {
      url: "/stories/:id",
      templateUrl: "ng-view/story.show.html",
      controller: "show_controller",
      controllerAs: "ShowVM"
    });
  }
  function StoryFactoryFunction($resource){
    var vm = this;
    var story = $resource("/stories/:id/json", {}, {
      update: {method: "PUT"}
    });
    vm.data = story.query();
    return Story;

    function IndexControllerFunction(StoryFactory, $stateParams){
    var indexVM = this;
    indexVM.stories = StoryFactory.query();
    indexVM.newStory = new StoryFactory();
  }

  function ShowControllerFunction(StoryFactory, $stateParams){
    var showVM = this;
    showVM.story = StoryFactory.get({id:$stateParams.id})
    StoryFactory.all.$promise.then(function(){
      StoryFactory.all.forEach(function(story){
        if(story.id == $stateParams.id){
          showVM.story == story;
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
