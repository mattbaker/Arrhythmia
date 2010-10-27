(function(){
	function DOMTest(){
		this.test_functions = {};
		this.test_results = {};
		this.test_queue = [];
	};
	
	DOMTest.prototype = {
		client: function() {
			if(window.opener && window.name == "DOMTest") {
				try {
					executeTest()
				} catch(e) {
					//Send back errorwindow.opener.DOMTest.callback(window, );
					return;
				}
				window.opener.DOMTest.callback(window, );
			}
			return;     
		},
		addTest: function(path, fnc) {
			this.test_functions[file] = fnc;
			this.test_queue.push(file);
		},
		getTest: function(file) {
			//If no test defined then we should look locally
			return this.test_functions[file]
		},
		runTest: function(file) {
			var client = window.open(file);
			//inject support code?
		},
		run: function() {
			this.run_test(this.test_queue.pop());
		}
		callback: function(windowObj, success, msg) {
			var path = windowObj.location.pathname;
			var file = path.substring(path.lastIndexOf("/")+1,path.length);
			
			this.test_results[file] = success;
			
			windowObj.close();
			if(this.test_queue.length) {
				run_test(this.test_queue.pop());
			} else {
				tearDown();
				finish();
			}
		},
		tearDown: function() {
			
		},
		finish: function() {
			//Report results local
			//Report results over AJAX
		}
	}	
	
	window.DOMTest = new DOMTest();
})();