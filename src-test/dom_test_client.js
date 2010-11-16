$(function() {
	if(window.opener) {
		window.DOMTestClient = {};
	    window.DOMTestClient.execute = function(fnc) {
		    window.opener.DOMTest.clientFinished(fnc.apply(window));
	    }
	    window.opener.DOMTest.clientReady();
    }
});