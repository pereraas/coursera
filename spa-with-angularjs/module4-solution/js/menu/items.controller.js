(function () {
  'use strict'

  angular.module('MenuApp')
  .controller('ItemDetailController', ItemDetailController);

  ItemDetailController.$inject = ['items'];

  function ItemDetailController(items) {
    var ctrl = this;
    ctrl.items = items;

  }
})()
