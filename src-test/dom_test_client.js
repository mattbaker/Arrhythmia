$(function() {
	if(window.opener && window.opener.DOMTest) {
		window.DOMTestClient = {};
	    window.DOMTestClient.execute = function(fnc) {
		    window.opener.DOMTest.clientFinished(fnc.apply(window));
	    }
	    window.opener.DOMTest.clientReady();
    }
});