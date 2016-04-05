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
  .directive("eventForm", [
    "EventFactory",
    "$state",
    EventFormDirectiveFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "ng-view/event.index.html",
      controller: "event_index_controller",
      controllerAs: "IndexVM"
    })
    .state("show",{
      url: "/:id",
      templateUrl: "ng-view/event.show.html",
      controller: "event_show_controller",
      controllerAs: "ShowVM"
    });
  }

  function EventFactoryFunction($resource){
    var vm = this;
    var event = $resource("http://localhost:3000/events/:id.json", {}, {
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
    var IndexVM = this;
    this.events = EventFactory.query();
    this.newEvent = new EventFactory();
  }

  function EventShowControllerFunction(EventFactory, $stateParams){
    var ShowVM = this;
    ShowVM.event = EventFactory.get({id: $stateParams.id})
  }

  function EventFormDirectiveFunction(EventFactory, $state){
    return{
      templateUrl: "ng-view/event.form.html",
      scope: {
        event: "=",
        formMethod: "@"
      },
      link: function(scope){
        scope.create = function(){
          scope.event.save(scope.event, function(response){
            event.all.push(response);
          });
        }
      }
    }
  }

}());
