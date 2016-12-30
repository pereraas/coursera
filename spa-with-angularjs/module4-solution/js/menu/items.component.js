(function () {
  'use strict'

  angular.module('MenuApp')
  .component('itemDetails',{
    templateUrl: 'templates/item.details.template.html',
    bindings:{
      items: '<'
    }
  })

})()
