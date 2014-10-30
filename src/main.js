/* jslint vars: true, plusplus: true, devel: true */

requirejs.config({

  baseUrl: 'src',
  
  paths: {
    version: './components/version',
    server: './components/server'
  }
  
});

requirejs(['version', 'server'], 
  function (version,   server) {
    'use strict';
    
    var mm = server.hello('Server says hello!'); 
    
    console.log('Version: ' + version);
    console.log(mm);  

});
