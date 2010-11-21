$(function() {
	function assertValidRhythm() {
		return this.Arrhythmia("body").validateRhythm() === true;
	}

	function assertInvalidRhythm() {
		return this.Arrhythmia("body").validateRhythm() === false;
	}
    
	DOMTest.addTest("http://localhost:8000/src-test/doms/fail_element_border.html",
				 	assertInvalidRhythm);
	
	DOMTest.addTest("http://localhost:8000/src-test/doms/fail_element_height.html",
				 	assertInvalidRhythm);
	
	DOMTest.addTest("http://localhost:8000/src-test/doms/fail_element_margin.html",
				 	assertInvalidRhythm);
	
	DOMTest.addTest("http://localhost:8000/src-test/doms/fail_element_padding.html",
	 				assertInvalidRhythm);
	 				
	DOMTest.addTest("http://localhost:8000/src-test/doms/fail_element_with_children.html",
        			assertInvalidRhythm);
	
	DOMTest.addTest("http://localhost:8000/src-test/doms/pass.html",
	 				assertValidRhythm);
});
