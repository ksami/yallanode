/*
 * Client-side JS
 */

//==========================
// Trigger events on server
//==========================

// Disconnect or window close
$(window).on('beforeunload', function(){
  console.log('dc');
});


//==============================================
// Event handlers for events triggered by server
//==============================================

// Redirect on server shutdown or restart
