;(function ($) {
  'use strict';
  
  // @todo: prevent multiple ajax calls

  $.UUJS = function (options) {

    var defaults = {
      urls: { // Default URLs
        'getStatus': 'http://check.unblock-us.com/get-status.js',
        'setTrial': 'http://realcheck2.unblock-us.com/startTrialNew.php',
        'setCountry': 'http://realcheck.unblock-us.com/set-country.php',
        'setCaption': 'http://check.unblock-us.com/set-captions'
      },
      timeout: 3000, // Milliseconds
      retry: 3 // How many times should retry if timeout
    };

    var plugin = this,
        subscribeEvent, 
        unsubscribeEvent, 
        publishEvent,
        handlers = {};
    
    plugin.settings = {};
    
    function _generateServerUrl() {
      if (location.protocol === 'https:') { 
        return 'https://check.unblock-us.com/get-status.js'; 
      }
      return 'http://c' + Math.floor(( Math.random() * 1000000) + 1) + '.check.unblock-us.com/get-status.js';
    }

    function _serverCall(email) {

      // @todo: make email mandatory 
      email = email || '1@2.ca';
      
      console.log('Getting status for: ' + email);
      
      var call;

      call = $.ajax({
        url: _generateServerUrl(),
        data: { 'email': email || '1@2.ca' },
        dataType: "jsonp",
        cache: false,
        async: true,
        timeout: plugin.settings.timeout,
        tryCount: 0,
        retryLimit: plugin.settings.retry,
        
        beforeSend: function(xhr, opts) {
          console.log('Ajax call started');
          publishEvent('onStart', []);
          // @todo: remove this
          $('.sc').html('&nbsp');
          $("#loading").fadeIn();          
        },
        
        success: function(data) {
          console.log('Ajax call was successful');
          console.log('Server response: ' + JSON.stringify(data));
          publishEvent('onSuccess', [data]);
        },

        always: function() {
          console.log('Ajax call ended');
          setTimeout(function() { $("#loading").fadeOut(); }, 500);     
        },
        
        error: function (xhr, status, error) {
          console.log('Ajax call ended with error: ' + error);
          publishEvent('onFail', [xhr, status, error]); 
          if (status === 'timeout' && this.retryLimit > 0) {
            this.tryCount++;
            if (this.tryCount < this.retryLimit) {
              console.log('Retry remaining: ' + (this.retryLimit - this.tryCount));
              $.ajax(this);
            }
          }
        }

      });
      
      return call;
    }    

    /* 
     * Subscribe an event handler
     */
    subscribeEvent = function (event, callback) {

      if (typeof(event) === 'object') {
        var res = [];
        for (var m in event) {
          if (typeof event[m] === "function") {
            res.push(m);
            subscribeEvent(m, event[m]);
          }
        }
        return;
      }
      
      if (!handlers[event]) {
        handlers[event] = [];
      }
      
      handlers[event].push(callback);
      
      return [event, callback];
    };
    
    /* 
     * Unsubscribe the event handler
     */
    unsubscribeEvent = function (handler) {
      var t = handler[0],
          i = handlers[t].length - 1;

      if (handlers[t]) {
        for (i; i >= 0; i -= 1) {
          if (handlers[t][i] === handler[1]) {
            handlers[t].splice(i, 1);
          }
        }
      }
    };
    
    /* 
     * Publish events
     */
    publishEvent = function (event, args) {
      if (handlers[event] === null) { return false; }
      $.each(handlers[event], function () {
        this.apply(plugin, args || []);
      });
      return true;
    };

    var _init = function () {
      plugin.settings = $.extend({}, defaults, options);
    };
    _init(); 
    
    return {
      subscribe : subscribeEvent,
      unsubscribe : unsubscribeEvent,
      publish : publishEvent,
      handlers: handlers,
      callServer: _serverCall
    };
  };

})($);  
