(function() {
  'use strict';

  angular.module('data')
  .service('MenuDataService', MenuDataService)
  .constant('ApiBasePath','https://davids-restaurant.herokuapp.com');

  MenuDataService.$inject = ['$q', '$http','ApiBasePath'];
  function MenuDataService($q, $http, ApiBasePath) {

    var menuDataSvc = this;
    menuDataSvc.menuItemsForCategory = [];
    menuDataSvc.menuItems = null;

    menuDataSvc.getAllCategories = function(){
      var deferred = $q.defer();
      $http.get(ApiBasePath + '/categories.json')
        .then(
            function (result) {
              deferred.resolve(result.data)
            },
            function (result) {
              deferred.reject("");
            }
        );
      return deferred.promise;
    }

    menuDataSvc.getItemsForCategory = function (categoryShortName) {
      var deferred = $q.defer();
      if (menuDataSvc.menuItemsForCategory[categoryShortName]) {
            deferred.resolve(menuDataSvc.menuItemsForCategory[categoryShortName]);
      }else{

        $http.get(ApiBasePath + '/menu_items.json?category='+ categoryShortName)
          .then(
              function (result) {
                menuDataSvc.menuItemsForCategory[categoryShortName] = result.data.menu_items;
                deferred.resolve(menuDataSvc.menuItemsForCategory[categoryShortName]);
              },
              function (result) {
                deferred.reject("");
              }
          );
      }

      return deferred.promise;
    }

    menuDataSvc.searchItems = function(searchTerm){
       var deferred = $q.defer();
       if(!menuDataSvc.menuItems){
         $http.get(ApiBasePath + '/menu_items.json')
         .then(
             function(result){
               menuDataSvc.menuItems = result.data.menu_items;
               if (menuDataSvc.menuItems){
                    menuDataSvc.foundItems = searchItem(menuDataSvc.menuItems, searchTerm);
                    deferred.resolve(menuDataSvc.foundItems);
               }else{
                 deferred.reject("");
               }
             },
             function(result){
               deferred.reject("");
             }
         );
       }else{
         menuDataSvc.foundItems = searchItem(menuDataSvc.menuItems, searchTerm);
         deferred.resolve(menuDataSvc.foundItems);
       }

     return deferred.promise;
   }

   function searchItem(menuItems, searchTerm){
      var foundItems = [];
      if(menuItems){
        for (var i = 0; i < menuItems.length; i++) {
            var description = menuItems[i].description;
            if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                foundItems.push(menuItems[i]);
            }
        }
      }
      return foundItems;
    }

  }

})();
