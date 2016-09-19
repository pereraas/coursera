(function(){
  "use strict";

  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController)

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope){
    var comma = ','; // separator
    $scope.menuItems = "";
    $scope.msg = "";
    $scope.noOfLunchItems = "";
    $scope.checkTooMuch = function (){
      if($scope.menuItems === ""){
          $scope.msg = "Please enter data first";
          $scope.noOfLunchItems = 0;
      }else {
        var lunchItems = splitString($scope.menuItems, comma);
        $scope.noOfLunchItems = lunchItems.length;
        if (lunchItems.length <= 3){
          $scope.msg = "Enjoy!";
        }else if (lunchItems.length > 3) {
          $scope.msg = "Too much!";
        }
      }
    }
}

function splitString(stringToSplit, separator) {
  var arrayOfStrings = stringToSplit.split(separator);
  return arrayOfStrings;
}

})()
