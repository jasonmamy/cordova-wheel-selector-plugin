var PLUGIN_NAME = 'SelectorCordovaPlugin';
var SelectorCordovaPlugin = function() {};

SelectorCordovaPlugin.prototype.showSelector = function(options, success_callback, error_callback) {
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
      displayKey: options.displayKey || 'description',
      items: options.items || {},
      displayItems: displayList,
      defaultItems: options.defaultItems || {},
      theme: options.theme || 'light',
      wrapWheelText: options.wrapWheelText || false,
      positiveButtonText: options.positiveButtonText || 'Done',
      negativeButtonText: options.negativeButtonText || 'Cancel',
      fontSize: options.fontSize || 16
  };

  for(i in config.items) {
      for (k in config.items[i]) {
          for (n in config.items[i][k]) {
              displayList[i][n] = config.items[i][k][n][config.displayKey];
          }
      }
  }

  var _success_callback = function() {
      if(typeof success_callback == 'function') {
          success_callback.apply(scope, arguments);
      }
  };

  var _error_callback = function() {
      if(typeof error_callback == 'function') {
          error_callback.apply(scope, arguments);
      }
  }

  return cordova.exec(_success_callback, _error_callback, PLUGIN_NAME, 'showSelector', [config]);
};

//heavily modified for Ionic2
SelectorCordovaPlugin.prototype.show = function(options, success_callback, error_callback) {

    options || (options = {});
    var scope = options.scope || null;

    function Create2DArray(rows) {
      var arr = [];

      for (var i = 0; i < rows; i++) {
        arr[i] = [];
      }

      return arr;
    }

    var displayList = Create2DArray(options.items.length);
    var defaultItemsList = {};

    var config = {
      title: options.title || ' ',
      displayKey: options.displayKey || 'description',
      items: options.items || {},
      displayItems: displayList,
      defaultItems: defaultItemsList,
      theme: options.theme || 'light',
      wrapWheelText: options.wrapWheelText || false,
      positiveButtonText: options.positiveButtonText || 'Done',
      negativeButtonText: options.negativeButtonText || 'Cancel',
      fontSize: options.fontSize || 16
    };

    for (i in options.items) {
      for (k in options.items[i]) {
        displayList[i][k] = options.items[i][k][config.displayKey];
      }
    }

    if (options.defaultItems != null && options.defaultItems.length > 0) {
      for (i in options.defaultItems) {
        defaultItemsList[options.defaultItems[i].index] = options.defaultItems[i].value;
      }
    }

    var _success_callback = function() {
        if(typeof success_callback == 'function') {
            success_callback.apply(scope, arguments);
        }
    };

    var _error_callback = function() {
        if(typeof error_callback == 'function') {
            error_callback.apply(scope, arguments);
        }
    }

    return cordova.exec(_success_callback, _error_callback, PLUGIN_NAME, 'showSelector', [config]);
};

SelectorCordovaPlugin.prototype.hideSelector = function(success_callback, error_callback) {
  return cordova.exec(success_callback, error_callback, PLUGIN_NAME, 'hideSelector', []);
};

module.exports = new SelectorCordovaPlugin();
