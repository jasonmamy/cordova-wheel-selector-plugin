angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.constant('testdata', {
    simpledata: {
    numbers: [
        {description: "1"},
        {description: "2"},
        {description: "3"},
        {description: "4"},
        {description: "5"},
        {description: "6"},
        {description: "7"},
        {description: "8"},
        {description: "9"},
        {description: "10"}
    ],
    fruits: [
        {description: "Apple"},
        {description: "Orange"},
        {description: "Pear"},
        {description: "Banana"},
        {description: "Grapefruit"},
        {description: "Tangerine"}
    ],
    measurements: [
        {description: "Teaspoon"},
        {description: "Tablespoon"},
        {description: "Cup(s)"},
        {description: "Quart(s)"},
        {description: "Packages (7 oz)"},
        {description: "Packages (12 oz)"}
    ],
    planets: [
        {description: "Venus"},
        {description: "Jupiter"},
        {description: "Earth"},
        {description: "Pluto"},
        {description: "Neptune"}
    ]
    }
    ,
    complex: {
    numbers:[
        //intentional blanks - show up in ui as blanks
        {id: "", text: "", value: ""},
        {id: "id1", text: "1", value: "one"},
        {id: "id2", text: "2", value:"two"},
        {id: "id3", text: "3", value:"three"},
        {id: "id4", text: "4", value:"four"},
        {id: "id5", text: "5", value:"five"},
        {id: "id6", text: "6", value:"six"},
        {id: "id7", text: "7", value:"seven"},
        {id: "id8", text: "8", value:"eight"},
        {id: "id9", text: "9", value:"nine"},
        {id: "id10", text: "10", value:"ten"}
    ],
    measurements:[
        //intentional blanks - show up in ui as blanks
        {id: "", text: "", value: ""},
        {id: "id-17", text: "Teaspoon", value:"1tsp"},
        {id: "id-23", text: "Tablespoon", value:"1tbsp"},
        {id: "id-88", text: "Cup(s)", value:"1cup"},
        {id: "id-54", text: "Quart(s)", value:"1quart"},
        {id: "id-32", text: "Package (7 oz)", value:"7ozPckg"},
        {id: "id-58", text: "Package (12 oz)", value:"12ozPckg"}
    ]
    }
 })
.controller('main', function ($scope, $ionicModal, $ionicPopup, testdata) { 
    var themeColor = 'light';
    var wrapWheelText = false;

    $scope.selectTheme = function(userSelected) {

        if(userSelected.length == 0) {
            themeColor = 'light';
        }else{
            themeColor = userSelected;
        }
    }


    $scope.selectWrapWheelText = function(toWrap) {

        if(toWrap.length == 0) {
            wrapWheelText = false;
        }else{
            wrapWheelText = true;
        }
        console.log('wrap is: ' + wrapWheelText);
    }

    $scope.selectSomeFruit = function() {

      console.log('theme: ' + themeColor);

      if (window.SelectorCordovaPlugin) {
        var configSimple1 = {
          title: "How Many Fruit?",
          items: [
            [testdata.simpledata.numbers],
            [testdata.simpledata.fruits]
          ],
          positiveButtonText: "Ok",
          negativeButtonText: "Cancel",
          theme: themeColor,
          wrapWheelText: wrapWheelText
        }

        window.SelectorCordovaPlugin.showSelector(configSimple1, function(result) {
          console.log("result: " + JSON.stringify(result));
          var alertPopup = $ionicPopup.alert({
            title: 'You Selected',
            template: '<center>' + result[0].description + ' ' + result[1].description + '(s)' + '</center>'
          });
        });
      } else {
        console.log('no plugin');
        alert('cordova-wheel-selector-plugin not available in browser, install and run on device!');
      }
    }


    $scope.selectNumber = function() {

      if (window.SelectorCordovaPlugin) {
        var configSimple2 = {
          title: "How Many?",
          items: [
            [testdata.simpledata.numbers]
          ],
          positiveButtonText: "Ok",
          negativeButtonText: "No way",
          theme: themeColor,
          wrapWheelText: wrapWheelText
        }

        window.SelectorCordovaPlugin.showSelector(configSimple2, function(result) {
          console.log("result: " + JSON.stringify(result));
          var alertPopup = $ionicPopup.alert({
            title: 'You Selected',
            template: '<center>' + result[0].description + '</center>'
          });
        });
      } else {
        console.log('no plugin');
        alert('cordova-wheel-selector-plugin not available in browser, install and run on device!');
      }
    }

    $scope.selectQuantityNormal = function() {

      if (window.SelectorCordovaPlugin) {
        var configSimple3 = {
          title: "How Many?",
          items: [
            [testdata.simpledata.numbers],
            [testdata.simpledata.measurements],
            [testdata.simpledata.fruits]
          ],
          positiveButtonText: "Done",
          negativeButtonText: "Cancel",
          theme: themeColor,
          wrapWheelText: wrapWheelText
        }

        window.SelectorCordovaPlugin.showSelector(configSimple3, function(result) {
          console.log("result: " + JSON.stringify(result));
          var alertPopup = $ionicPopup.alert({
            title: 'You Selected',
            template: '<center>' + result[0].description + ' ' + result[1].description + ' of ' + result[2].description + '</center>' 
          });
        });
      } else {
        console.log('no plugin');
        alert('cordova-wheel-selector-plugin not available in browser, install and run on device!');
      }
    }

    $scope.selectQuantity = function() {

      if (window.SelectorCordovaPlugin) {
        var configSimple3 = {
          title: "How Many?",
          items: [
            [testdata.simpledata.numbers],
            [testdata.simpledata.measurements],
            [testdata.simpledata.fruits],
            [testdata.simpledata.planets]
          ],
          positiveButtonText: "Done",
          negativeButtonText: "Cancel",
          theme: themeColor,
          wrapWheelText: wrapWheelText
        }

        window.SelectorCordovaPlugin.showSelector(configSimple3, function(result) {
          console.log("result: " + JSON.stringify(result));
          var alertPopup = $ionicPopup.alert({
            title: 'You Selected',
            template: '<center>' + result[0].description + ' ' + result[1].description + ' of ' + result[2].description + ' from ' + result[3].description + '</center>' 
          });
        });
      } else {
        console.log('no plugin');
        alert('cordova-wheel-selector-plugin not available in browser, install and run on device!');
      }
    }


    $scope.selectQuantityComplex = function() {

      if (window.SelectorCordovaPlugin) {
        var configSimple4 = {
          title: "How Many?",
          items: [
            [testdata.complex.numbers],
            [testdata.complex.measurements]
          ],
          positiveButtonText: "Yes",
          negativeButtonText: "No",
          displayKey: "text",
          theme: themeColor,
          wrapWheelText: wrapWheelText
        }

        window.SelectorCordovaPlugin.showSelector(configSimple4, function(result) {
          console.log("result: " + JSON.stringify(result));
          var alertPopup = $ionicPopup.alert({
            title: 'You Selected',
            template: '<center>' + testdata.complex.numbers[result[0].index].value + ' ' + testdata.complex.measurements[result[1].index].text + '</center>'
          });
        });
      } else {
        console.log('no plugin');
        alert('cordova-wheel-selector-plugin not available in browser, install and run on device!');
      }
    }
})
