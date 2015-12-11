angular.module('proventalan', ['ngMaterial', 'ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/chat', {
      templateUrl: 'components/chat/chat.html'
    })
      .when('/ladder', {
        templateUrl: 'components/ladder/ladder.html'
      })
      .when('/', {
        templateUrl: 'components/overview/overview.html'
      });
  });