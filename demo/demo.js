// ...................................................
// Initialization
// ...................................................

$(function() {
  'use strict';
  
  var uuJS = new $.UUJS();
    
  /***************************
   * UI and misc. functions
   ***************************/

  var logCount = 1;
  var logMax = 10;
  
  function addLog(msg) {
    
    if ($('#log').find('li.dropdown-header').length > logMax) {
      $('#log li.dropdown-header:lt(' + (logMax - 1) + ')').remove();
    }
    
    var li = $('<li/>')
            .html(logCount + ': ' + msg)
            .attr({'role': 'presentation'})
            .addClass('dropdown-header')
            .appendTo("#log");
    
    logCount++;
  }
  
  $(document).on('click', 'a:not(.external)', function(e) {
    e.preventDefault();
  });

  $(document).on('click', 'a.toggle', function(e) {
    var $target = $($(this).data('target'));
    $target.toggleClass('hidden');
  });
  
  $(document).on('click', '#account-ip span a', function() {
    uuJS.ip(true);
  });
  
  $(document).on('click', '#refresh-status', function() {
    var email = $('#account-email').val(); 
    uuJS.status({ email: email });
  });
  
  $('[data-toggle="popover"]').popover({
    trigger: 'hover'
  });
  

  /***************************
   * Subscribers 
   ***************************/
  
  var statusBar = {
  
    $sel: $('#status-bar').find('p'), 
    
    onStart: function () {
      var msg = 'Working'; 
      statusBar.$sel.removeAttr("class").html('<i class="fa fa-circle-o-notch fa-spin"></i> ' + msg);
      addLog(msg);
    },
    
    onSuccess: function (data) {
      var msg = 'Completed'; 
      statusBar.$sel.removeAttr("class").html('<i class="fa fa-check"></i> ' + msg).addClass('text-success');
      addLog(msg);
    },
    
    onFail: function (xhr, status, error) {  
      var msg = 'Failed: ' + error;
      statusBar.$sel.removeAttr("class").html('<i class="fa fa-close"></i> ' + msg).addClass('text-danger');
      addLog(msg);
    },
    
    anotherMethod: function(v) {
      // Skipped from subscription   
    }
  };
  
  var statusDetails = {
  
    onStart: function () {
      $('#account-status span, #account-dns span, #account-ip span').html('<i class="fa fa-circle-o-notch fa-spin text-muted"></i>');
    },
    
    onSuccess: function (data) {
      $('#account-status').find('span').html(data.status);
      $('#account-dns').find('span').html((data.our_dns) ? 'is setup' : '<a href="http://www.netprotect.com/how-to-set-up" target="_blank" class="external">Update DNS</a>');
      $('#account-ip').find('span').html((data.ip_changed && !data.reactivated) ? '<a href="#">Update IP address</a>' : data.ip);
    },
    
    onFail: function (xhr, status, error) {  
    }
    
  };
    
  uuJS.subscribe(statusBar);
  uuJS.subscribe(statusDetails);
  
  var email = $('#account-email').val() || 'babak+02@selectivevpn.com'; 
  uuJS.status({ email: email });
  
});
