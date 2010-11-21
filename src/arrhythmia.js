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
					this.report(element);
					return false;
				}
				for(var i=0, len=childBlocks.length; i<len; i++) {
					var validBlock = this.validatePosition($(childBlocks[i]));
					if(!validBlock) {
						console.warn("  %o",element[0]);
						return false;
					}
				}
				if(console.group) { console.group("Arrhythmia Report"); }
				this.report(element);
				return false;
			}
			return true;
		},
		
		report: function(element) {
			console.warn("Arrhythmic element found: %o", element[0]);
			this.examine(element);
			console.warn("DOM trace:");
			element.css("background-color", "purple");
			console.warn("  %o", element[0]);
			return false;
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
			var scores = [];
			for(var i=0;i<4;scores[i++]=0);
			
			var ERROR_MARGIN=0,
				ERROR_BORDER=1,
				ERROR_PADDING=2,
				ERROR_ELEMENT=3;
				
			var elementHeight = element.height(),
				heightWithMargin = element.outerHeight(true),
				heightWithBorder = element.outerHeight(),
				heightWithPadding = element.innerHeight();
			
			var margin 	= heightWithMargin - heightWithBorder,
				border 	= heightWithBorder - heightWithPadding,
				padding = heightWithPadding - elementHeight;
			
			var validWithMargin	 = (heightWithMargin % this.lineHeight === 0),
				validWithBorder	 = (heightWithBorder % this.lineHeight === 0),
				validWithPadding = (heightWithPadding % this.lineHeight === 0),
				validElement	 = (elementHeight % this.lineHeight === 0);
			
			if(!validWithMargin) { scores[ERROR_MARGIN]++;}
			if(margin % this.lineHeight !=0) { scores[ERROR_MARGIN]++;}
			
			if(!validWithBorder) { scores[ERROR_BORDER]++ }
			if(border % this.lineHeight !=0) { scores[ERROR_BORDER]++;}
			
			if(!validWithPadding) { scores[ERROR_PADDING]++ }
			if(padding % this.lineHeight !=0) { scores[ERROR_PADDING]++;}
			
			if(!validElement) { scores[ERROR_ELEMENT]+=2 }
			
			var highest = 0;
			var highestIndex = -1;
			for(var i=0; i<4; i++) {
				if(scores[i] > highest) {
					highest = scores[i];
					highestIndex = i;
				}
			}
			
			switch(highestIndex) {
				case ERROR_MARGIN:
					console.warn("The element's margin is %dpx and may be at fault.", margin);
				break;
				case ERROR_BORDER:
					console.warn("The element's border is %dpx and may be at fault.", border);
				break;
				case ERROR_PADDING:
					console.warn("The element's padding is %dpx and may be at fault.", padding);
				break;
				case ERROR_ELEMENT:
					console.warn("The element's height is %dpx and may be at fault.", elementHeight);
				break;
				default:
					console.warn("No issues could be found with the element.");
				break;
			}
			return;
		}
	}	

	window.Arrhythmia = function(jQuery_selector, jQuery_context) {
		var context = new jQuery.fn.init(jQuery_selector, jQuery_context);
		return new Arrhythmia(context);
	};
	
})();