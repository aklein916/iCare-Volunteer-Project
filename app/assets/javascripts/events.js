//= require angular
//= require angular-resource

"use strict";

(function(){
  angular
  .module("events",["ngResource"])
  .controller("events_controller", ["$resource", EventsController]);

  function EventsController ($resource){
    var vm = this;
    var event = $resource("/events/:id.json", {}, {
      update: {method: "PUT"}
      vm.data = Event.query();
      vm.sort_data_by = function(title){
        vm.sort_on = title;
        vm.is_descending =!(vm.is_descending);
      });
    })
  });
})();
