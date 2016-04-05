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
  .controller("indexCtrl", [
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
  function indexCtrlFunction(){
    var indexVM = this;
    indexVM.foo ='bar';
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
