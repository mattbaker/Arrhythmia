(function(){
	//jQuery :block & :inline selectors
	$.extend($.expr[':'],{
	    inline: function(e) {
	        return $(e).css('display') === 'inline';
	    },
		block: function(e) {
	        return $(e).css('display') === 'block';
	    }
	});
	
	function Arrhythmia(context){
		this.context = context.first();
		this.offset = context.position().top;
	};
	
	Arrhythmia.prototype = {
		assertLineHeight: function(lineHeight) {
			var domLineHeight = this.getLineHeight()
			console.assert(domLineHeight === lineHeight,
						   "Line height mismatch, expected %dpx but found %dpx.",
						 	lineHeight,
							domLineHeight);
			return this;
		},
		
		validateRhythm: function(lineHeight) {
			if(typeof lineHeight === 'undefined') var lineHeight;
			this.lineHeight = lineHeight || this.getLineHeight();
			return this.validatePosition(this.context);
		},
		
		validatePosition: function(element) {
			var absoluteTop = element.position().top;
			var relativeTop = absoluteTop - this.offset;
			var relativeBottom = relativeTop + element.outerHeight(true);
			if((relativeTop % this.lineHeight !== 0) || (relativeBottom % this.lineHeight !== 0)) {
				var childBlocks = element.children(":block");
				if(childBlocks.length === 0) {
					console.warn("Arrhythmic element found: %o", element[0]);
					this.examine(element);
					console.warn("Arrhythmia DOM trace:");
					element.css("background-color", "purple");
					console.warn(" %o", element[0]);
					return false;
				}
				for(var i=0, len=childBlocks.length; i<len; i++) {
					var validBlock = this.validatePosition($(childBlocks[i]));
					if(!validBlock) {
						console.warn("  %o",element[0]);
						return false;
					}
				}
			}
			return true;
		},
		
		getLineHeight: function() {
			var height,
				heightCheckElement = $("<p>&nbsp;</p>");
			this.context.append(heightCheckElement);
			height = heightCheckElement.height();
			heightCheckElement.remove();
			return height;
		},
		
		examine: function(element) {
			var height = element.height();
			var heightTotal= element.outerHeight(true);
			var heightWithPadding = element.innerHeight();
			var totalMargin = heightTotal - heightWithPadding;
			var totalPadding = heightWithPadding - height;
			var heightWithMargin = height + totalMargin;

			if(height % this.lineHeight === 0) {
				//Element height is OK
				if(heightWithPadding % this.lineHeight === 0) {
				//Element + padding is OK
					if(heightWithMargin % this.lineHeight !== 0) {
					//Element + margin is broken
						console.warn("Your margin and border total %dpx and may be at fault.", totalMargin);
						return;
					} else {
						console.error("Arrhythmia may have encountered an error. Rhythm violation found but not identified.");
					}
				} else {
					console.warn("Your padding totals %dpx and may be at fault.", totalPadding);
					return;
				}
			} else {
				console.warn("Your element height totals %dpx and may be at fault.", height);
				return;
			}
		}
		
	}	
	
	function init(jQuery_selector, jQuery_context) {
		var context = new jQuery.fn.init(jQuery_selector, jQuery_context);
		return new Arrhythmia(context);
	}
	window.Arrhythmia = init;
})();