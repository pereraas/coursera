(function () {
  'use strict'

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('home', {
          url: '/',
          templateUrl: 'templates/home.template.html',
       })
      .state('categories', {
          url:'/categories',
          templateUrl: 'templates/main-categories.template.html',
          controller: 'CategoriesCtrl as $ctrl',
          resolve:{
              categories:['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
              }]

          }
      })
      .state('categories.itemDetail', {
        url: '/items/{shortName}',
        templateUrl: 'templates/item.template.html',
        controller: "ItemDetailController as itemDetailCtrl",
        resolve:{
          items:['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName);
          }]
        }
      })
      .state('home.search', {
        url: '/search/{searchTerm}',
        templateUrl: 'templates/item.template.html',
        controller: 'ItemDetailController as itemDetailCtrl',
        resolve: {
          items:[ '$stateParams','MenuDataService', function ($stateParams, MenuDataService) {
              return MenuDataService.searchItems($stateParams.searchTerm);
          }]
        }

      });
  }

})();
