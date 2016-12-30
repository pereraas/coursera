(function () {

  angular.module('Search')
  .component('search', {
    templateUrl: 'js/search/search.template.html',
    controller: SearchController,
    controllerAs: 'searchCtrl'
  });

  //SearchController.$inject = [];

  function SearchController() {
    var searchCtrl = this;
    searchCtrl.searchTerm = "";
  }

})()
