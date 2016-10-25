(function(){
'use strict';

angular.module("ShoppingListCheckOff", [])
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$inject = ["ShoppingListCheckOffService"];
AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];

function ToBuyController(ShoppingListCheckOffService){

  var toBuyCtrl = this;
  toBuyCtrl.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyCtrl.removeItem = function(itemIdex){
    ShoppingListCheckOffService.removeItem(itemIdex);
  }

  toBuyCtrl.getSize = function(){
    return toBuyCtrl.items.length;
  }

}

function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBoughtCtrl = this;
  alreadyBoughtCtrl.items = ShoppingListCheckOffService.getBoughtItems();

  alreadyBoughtCtrl.getSize = function(){
    return alreadyBoughtCtrl.items.length;
  }

}

function ShoppingListCheckOffService(){
  var service = this;
  service.toBuyItems = [
    { name: "Cookies", quantity: "10 bags" },
    { name: "Chips", quantity: "5 bags" },
    { name: "Coca-cola", quantity: "12 bottles" },
    { name: "Chocolates", quantity: "10 slabs" },
    { name: "Coffee", quantity: "2 bottles" },
    { name: "Peanuts", quantity: "2 bags" },
    { name: "Tuna", quantity: "10 tins" },
    { name: "Chicken", quantity: "2 kg" }

  ];

  service.boughtItems = [];

  service.getToBuyItems = function(){
    return service.toBuyItems;
  }

  service.getBoughtItems = function(){
    return service.boughtItems;
  }

  service.removeItem = function(itemIdex){
      service.addItem(service.toBuyItems[itemIdex]);
      service.toBuyItems.splice(itemIdex, 1);
  }

  service.addItem = function(item){
      service.boughtItems.push(item);
  }
}



})()
