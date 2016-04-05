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
  .factory("eventFactory", [
    "$resource",
    EventFactoryFunction
  ])
  .controller("index_controller", [
    "EventFactory",
    IndexControllerFunction
  ])
  .controller("show_controller", [
    "EventFactory",
    "$stateParams",
    ShowControllerFunction
  ])
  .directive("eventForm", [
    "eventFactory",
    "$state",
    EventFormDirectiveFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("index", {
      url: "/",
      templateUrl: "ng-views/events.index.html"
      controller: "index_controller",
      controllerAs: "indexVM"
    })
    .state("show",{
      url: "/:id"
      templateUrl: "ng-views/events.show.html"
      controller: "show_controller",
      controllerAs: "showVM"
    });
  }

  function EventFactoryFunction($resource){
    var vm = this;
    var event = $resource("/events/:id.json", {}, {
      update: {method: "PUT"}
      vm.data = events.query();
      vm.sort_data_by = function(title){
        vm.sort_on = title;
        vm.is_descending =!(vm.is_descending);
      });
    })
  }
  function IndexControllerFunction(EventFactory, $stateParams){
    var indexVM = this;
    indexVM.events = EventFactory.query();
    indexVM.newEvent = new EventFactory();
  }

  function ShowControllerFunction(EventFactory, $stateParams){
    var showVM = this;
    showVM.event = EventFactory.get({id: $stateParams.id})
    // eventFactory.all.$promise.then(function(){
    //   eventFactory.all.forEach(function(event){
    //     if(event.id == $stateParams.id){
    //       showVM.event = event;
  }
});
});
}

function EventFormDirectiveFunction(EventFactory, $state){
  return{
    templateUrl: "ng-views/event.form.html",
    scope: {
      event:  "=",
      formMethod:   "@"
    },
    link: function(scope){
      scope.create = function(){
        scope.event.save(scope.event, function(response){
          event.all.push(response);
        });
      }
      scope.update = function(){
        event.update({id: scope.events.id}, scope.events, function(response){
          console.log("Successful");
        });
      }
      scope.delete = function(){
        scope.event.$delete({id: scope.event.id}, function(){
          $state.go("eventIndex", {}, {reload: true});
        });
      }
    }
  }
}
})();
