uu-js
=====

JQuery plugin for check DNS settings, IP and account status


``` javascript
var obj = {
   
  onStart: function () {
    // Do something here when the check service starts
  },
    onSuccess: function (data) {
    // Do something here when the response is successful
  },
    onFail: function (xhr, status, error) {  
    // Show errors here if the response fails
  },
  anotherMethod: function(v) {
    // You can have more attributes or functions, the plugin will ignore them   
  }
        
  // Subscribe the object        
  handler = uuJS.subscribe(obj);

}

```
