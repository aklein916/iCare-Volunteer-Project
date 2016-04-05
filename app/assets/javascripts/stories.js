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
  }
})();
// (function(){
//   angular
//   .module("story", ["ngResource"])
//   .controller("story_controller", StoryController);
//
//   StoryController.$inject = ["$resource"];
//
//   function StoryController($resource){
//     var vm= this;
//     var story = $resource("/stories/:id.json", {}, {
//       vm.data.forEach(function(story){
//       });
//       vm.sort_data_by = function(name){
//         vm.sort_on = name;
//       }
//     })
//   }
// })
