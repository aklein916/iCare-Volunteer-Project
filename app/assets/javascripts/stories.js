//= require angular
//= require angular-resource

"use strict";

(function(){
  angular
  .module("story", ["ngResource"])
  .controller("story_controller", StoryController);

  StoryController.$inject = ["$resource"];

  function StoryController($resource){
    var vm= this;
    var story = $resource("/stories/:id.json", {}, {
      vm.data.forEach(function(story){
      });
      vm.sort_data_by = function(name){
        vm.sort_on = name;
      }
    })
  }
})
