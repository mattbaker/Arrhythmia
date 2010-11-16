(function(){
	function DOMTest(){
		this.testFunctions = {};
		this.testResults = {};
		this.testQueue = [];
		this.client = null;
		this.currentTest = null;
	};
	
	DOMTest.prototype = {
		run: function() {
			this.runTest(this.testQueue.pop());
		},
		
		addTest: function(path, fnc) {
			this.testFunctions[path] = fnc;
			this.testQueue.push(path);
		},
		getTest: function(file) {
			return this.testFunctions[file]
		},
		runTest: function(file) {
			this.currentTest = this.getTest(file);
			this.client = window.open(file);
		},
		
		clientReady: function() {
			this.client.DOMTestClient.execute(this.currentTest);
		},
		clientFinished: function(result) {
			var path = this.client.location.pathname;
			var file = path.substring(path.lastIndexOf("/")+1,path.length);
			this.testResults[file] = result;
			this.client.close();
			
			if(this.testQueue.length) {
				var test = this.testQueue.pop();
				this.runTest(test);
			} else {
				this.finish();
			}
		},
		finish: function() {		
			var testCount = 0,
			successCount = 0,
			failureCount = 0;
			
			if(console.group) { console.group("Test Results"); }
			
			for(test in this.testResults) {				
				if(this.testResults[test]===true) { successCount++; }
				if(this.testResults[test]===false) { failureCount++; }
				testCount++;
				
				console.log("%s: %s", test, this.testResults[test]);
			}
			console.log("%d tests ran, %d succeeded, %d failed.", testCount, successCount, failureCount);
		}
	}	
	
	window.DOMTest = new DOMTest();
})();