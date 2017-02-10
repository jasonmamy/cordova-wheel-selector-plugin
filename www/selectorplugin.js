var exec = require('cordova/exec');

var PLUGIN_NAME = 'SelectorCordovaPlugin';

var SelectorCordovaPlugin = {
  showSelector: function(options, cb, error_callback) {
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
          theme: options.theme || 'light',
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
              cb.apply(scope, arguments);
          }
      };

      var _error_callback = function() {
          if(typeof error_callback == 'function') { 
              error_callback.apply(scope, arguments);
      }
    };

    exec(_callback, _error_callback, PLUGIN_NAME, 'showSelector', [config]);
  }
};

module.exports = SelectorCordovaPlugin;
