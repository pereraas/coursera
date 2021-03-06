(function(){
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com");

  function FoundItemsDirective(){
    var ddo = {
      templateUrl:'foundItems.html',
      scope:{
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveCtrl,
      controllerAs: 'foundItemsDirCtrl',
      bindToController: true
    }
    return ddo;
  }

  function FoundItemsDirectiveCtrl(){
    var directiveCtrl = this;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var narrowItCtrl = this;
    narrowItCtrl.searchTerm = '';
    narrowItCtrl.errorMsg = null;
    narrowItCtrl.found = null;
    narrowItCtrl.showSpinner = false;

    var defaultSearchBtnText = "Narrow It Down For Me!";
    narrowItCtrl.searchBtnText =  defaultSearchBtnText;

    narrowItCtrl.narrowItDown = function(){
        clearView();
        displayItems();
    }

    narrowItCtrl.removeItem = function(index){
      MenuSearchService.removeItem(index);
    }

    function clearView(){
      narrowItCtrl.errorMsg = null;
      narrowItCtrl.found = null;
    }

    function displayItems(){
      if(narrowItCtrl.searchTerm){
        narrowItCtrl.showSpinner = true;
        narrowItCtrl.searchBtnText = "Searching..."
        MenuSearchService.getMatchedMenuItems(narrowItCtrl.searchTerm)
        .then(
          function(response){
            narrowItCtrl.found = response;
            if(narrowItCtrl.found.length === 0){
              narrowItCtrl.errorMsg = "Nothing found";
            }
            narrowItCtrl.showSpinner = false;
            narrowItCtrl.searchBtnText =  defaultSearchBtnText;
          }
        );
      }else{
        narrowItCtrl.errorMsg = "Nothing found";
      }
    }
  }

MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath'];
function MenuSearchService($http, $q, ApiBasePath) {
    var menuSvc = this;
    menuSvc.menuItems = null;
    menuSvc.foundItems = null;

    menuSvc.getMatchedMenuItems = function(searchTerm){
        var deferred = $q.defer();
        if(!menuSvc.menuItems){
          $http.get(ApiBasePath + '/menu_items.json')
          .then(
              function(result){
                menuSvc.menuItems = result.data.menu_items;
                if (menuSvc.menuItems){
                  menuSvc.foundItems = searchItem(menuSvc.menuItems, searchTerm);
                  deferred.resolve(menuSvc.foundItems);
                }else{
                  deferred.reject("");
                }
              },
              function(result){
                deferred.reject("");
              }
          );
        }else{
          menuSvc.foundItems = searchItem(menuSvc.menuItems, searchTerm);
          deferred.resolve(menuSvc.foundItems);
        }

      return deferred.promise;
    }

    menuSvc.removeItem = function (itemIndex) {
      menuSvc.foundItems.splice(itemIndex, 1);
    };

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

})()
