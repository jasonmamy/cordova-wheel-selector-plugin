var exec = require('cordova/exec');

var PLUGIN_NAME = 'SelectorCordovaPlugin';

var SelectorCordovaPlugin = {
  echo: function(phrase, cb) {
//        console.log('*****in echo for: ' + PLUGIN_NAME);


//    var cb = function() {
//        if(typeof cb == 'function') {
//            console.log(PLUGIN_NAME + '  ***8in callback');
//          //callback.apply(scope, arguments);
//        }
//    };

          exec(cb, null, PLUGIN_NAME, 'echo', [phrase]);
//    exec(_callback, null, PLUGIN_NAME, 'echo', [phrase]);

//    console.log(PLUGIN_NAME + '***after the echo');
//  exec(_callback, null, PLUGIN_NAME, 'echo', [phrase]);



  },
  getDate: function(options, cb) {
//    getDate: function(cb) {

//    var scope = options.scope || null;

      options || (options = {});
      var scope = options.scope || null;

      var config = {
          title: options.title || ' ',
          selectedValue: options.selectedValue || '',
          displayKey: options.displayKey || '',
          valueKey: options.valueKey || '',
          items: options.items || {},
          items2: options.items2 || {},
          items3: options.items3 || {},
          style: options.style || 'default',
          doneButtonLabel: options.doneButtonLabel || 'Done',
          cancelButtonLabel: options.cancelButtonLabel || 'Cancel'
      };

      var _callback = function() {
          if(typeof cb == 'function') {

              console.log(PLUGIN_NAME + ' arg0: ' + arguments[0].length);
              console.log(PLUGIN_NAME + ' arg0 val: ' + arguments[0][0]);
              console.log(PLUGIN_NAME + ' *callback return: ' + JSON.stringify(arguments));

              cb.apply(scope, arguments);
          }
      };


    exec(_callback, null, PLUGIN_NAME, 'getDate', [config]);
//  exec(cb, null, PLUGIN_NAME, 'getDate', []);

  },


  showSelector: function(options, cb) {

      options || (options = {});
      var scope = options.scope || null;

      function Create2DArray(rows) {
          var arr = [];

          for (var i=0;i<rows;i++) {
              arr[i] = [];
          }

          return arr;
      }

      var displayList = Create2DArray(options.items.length);

      var config = {
          title: options.title || ' ',
          selectedValue: options.selectedValue || '',
          displayKey: options.displayKey || 'description',
          items: options.items || {},
          displayItems: displayList,
          style: options.style || 'default',
          theme: options.theme || 'white',
          wrapWheelText: options.wrapWheelText || false,
          positiveButtonText: options.positiveButtonText || 'Ok',
          negativeButtonText: options.negativeButtonText || 'Cancel'
      };

      for(i in config.items) {
          for (k in config.items[i]) {
              for (n in config.items[i][k]) {
                  displayList[i][n] = config.items[i][k][n][config.displayKey];
              }
          }
      }






      var _callback = function() {
          if(typeof cb == 'function') {
//            console.log(PLUGIN_NAME + ' here...');

//            for(i in arguments) {
//
//                console.log(PLUGIN_NAME + ' some val ' i + ': '+ arguments[i]);
//            }

//            arguments = "this is a test";
//            arguments = JSON.stringify(arguments);

//            var indexes = arguments[1];
//            for(i in indexes) {
//
//                console.log(PLUGIN_NAME + ' have: ' + indexes[i] );
//            }
//
//            if(arguments[0] == 0) {
//
//                console.log(PLUGIN_NAME + ' Must be good');
//
//                console.log(PLUGIN_NAME + ' *could return: ' + JSON.stringify(arguments[1]));
//            }

//            console.log(PLUGIN_NAME + ' *could return: ' + JSON.stringify(arguments[1]));
//            console.log(PLUGIN_NAME + ' arg0: ' + arguments[0].length);
//            console.log(PLUGIN_NAME + ' arg0 val: ' + arguments[0][0]);
              console.log(PLUGIN_NAME + ' *callback return: ' + JSON.stringify(arguments));

              var blah = arguments;

//            var blah = { 0: "test", 1: "stuff"
//            };
//            cb.apply(scope, arguments);
              cb.apply(scope, blah);
          }
      };


    exec(_callback, null, PLUGIN_NAME, 'showSelector', [config]);
//  exec(cb, null, PLUGIN_NAME, 'getDate', []);

  }




};

module.exports = SelectorCordovaPlugin;
