//= require angular
//= require angular-resource

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
  .factory("Story", [
    "$resource",
    storyFactoryFunction
  ])
  .controller("indexCtrl", [
    "Story",
    indexCtrlFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "ng-views/story.index.html"
      controller: "indexCtrl",
      controllerAs: "indexVM"
    })
    .state("show", {
      url: "/:id"
    });
  }
  function storyFactoryFunction($resource){
    var Story = $resource("/stories/:id/json", {}, {
      update: {method: "PUT"}
    });
    Story.all = Story.query();
    return Story;
    
    function indexCtrlFunction(Story){
    var indexVM = this;
    indexVM.stories = Story.all;
    indexVM.newStory = new Story();
  }

  function storyFormFunction(Story){
    return{
      templateUrl: "ng-views/stories.form.html",
      scope: {
        story: "="
      },
      link: function(scope){
        scope.create = function(){
          Story.save(scope.destination, function(response){
            Story.all.push(response);
          });
        }
      }
    }
  }
})();
