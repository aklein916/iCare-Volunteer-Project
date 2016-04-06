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
  .controller("event_index_controller", [
    "EventFactory",
    EventIndexControllerFunction
  ])
  .controller("event_show_controller", [
    "EventFactory",
    "$stateParams",
    EventShowControllerFunction
  ])

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
    });
  }

  function EventFactoryFunction($resource){
    var vm = this;
    var event =
     $resource("http://localhost:3000/events/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.data = event.query();
    vm.sort_data_by = function(title){
      vm.sort_on = title;
      vm.is_descending =!(vm.is_descending);
    }
    return event;
  }

  function EventIndexControllerFunction(EventFactory){
    var EventIndexVM = this;
    this.events = EventFactory.query();
    this.newEvent = new EventFactory();
  }

  function EventShowControllerFunction(EventFactory, $stateParams){
    var EventShowVM = this;
    EventShowVM.event = EventFactory.get({id: $stateParams.id})
  }

}());
