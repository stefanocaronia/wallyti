(function($){
	$.fn.wallyti = function(arguments) {	
		
		var defaults = {
			blockMaxWidth: 360,
			blockMinWidth: 240,
			blockMargin: 35,			
			delayOnResize: 30,			
			jsTransition: false,
			jsTransitionSpeed: 100,
			jsTransitionEasing: "ease"			
		};
		
		var options = {};
		
		if (typeof(arguments)!="object") {
			options=defaults;
		} else { 
			options = $.extend(defaults, arguments);
		}			
		
		return this.each(function() {	

			var colWidth;
			var blockWidth;
			var blockMargin;
			var blockMaxWidth;
			var blockMinWidth;
			var colCount=1;			
			var colPos = [];
			var colFit = [];
			var blocks = [];
			
			var container = $(this);			
			var blocks = container.children();
			var containerWidth = container.outerWidth();
			var numBlocks = blocks.length;
			
			// too many blocks? disable transitions
			if (numBlocks>25) {
				blocks.css({
					'-webkit-transition': 	'none', 
					'-moz-transition': 		'none', 
					'-o-transition': 		'none', 
					'transition':			'none'
				});
				options.jsTransition = false;
			}		
			
			container.addClass('wallyti-container');			
			blocks.addClass('wallyti-block');		
						
			if (container.attr('wallyti-block-max')) blockMaxWidth = container.attr('wallyti-block-max');
			else blockMaxWidth=options.blockMaxWidth;
			
			if (container.attr('wallyti-block-min')) blockMinWidth = container.attr('wallyti-block-min');
			else blockMinWidth=options.blockMinWidth;
			
			if (container.attr('wallyti-block-margin')) blockMargin = container.attr('wallyti-block-margin');
			else if (blocks.css('margin-right')) blockMargin = parseInt(blocks.css('margin-right').replace("px", ""));		
			else blockMargin=options.blockMargin;
			
			// col num from wich to start
			var maxCols = Math.floor(containerWidth/blockMinWidth)+2;
	
			for (c=maxCols;c>0;c--) {
				colWidth = Math.floor(containerWidth/c + blockMargin/c);
				blockWidth = colWidth-blockMargin;										
				if (blockWidth < blockMinWidth) colFit[c]="narrow";					
				else if (blockWidth > blockMaxWidth) colFit[c]="wide";
				if (colFit[c+1]=="narrow"&& colFit[c]=="wide") {
					colFit[colCount=c]="ok";break;
				} else if (blockWidth >= blockMinWidth && blockWidth <= blockMaxWidth) {
					colFit[colCount=c]="ok";break;
				}							
			}
			
			// initialize columns array
			for (c=0;c<colCount;c++) colPos[c]=0;
						
			container.css('position','relative');
			blocks.css('position','absolute');	
			
			blocks.each(function(){	
			
				var block = $(this);
				var blockHeight;				
				var column = ( colCount > 1 ? colPos.indexOf(Math.min.apply(Math,colPos)) : 0);	
				var blockPosition = {
					top: colPos[column],
					left: ( (column*colWidth)>=0 ? column*colWidth : 0 ),				
					width: blockWidth
				}	
								
				if (block.css('top')!=blockPosition.top && block.css('left')!= blockPosition.left) { // only if position is changed
					// adding movement class and take it out when animation end
					block.addClass('wallyti-moving').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e){
						block.removeClass('wallyti-moving');
					});				
				}
				
				cloned = block.clone();				
				cloned.css(blockPosition).css("visibility","hidden").addClass("cloned").appendTo(container);								
				blockHeight=cloned.outerHeight();
				colPos[column]+=blockHeight+blockMargin;					
				cloned.remove();				
				
				if (options.jsTransition) 
					block.animate(blockPosition, jsTransitionSpeed, jsTransitionEasing);	
				else
					block.css(blockPosition);								
			});		
			
			container.height(Math.max.apply(Math,colPos));
						
			$(window).off('resize.wallyti').on('resize.wallyti',function(){				
				clearTimeout(window.resizedFinished);
				window.resizedFinished = setTimeout(function(){
					if (containerWidth!=container.outerWidth()) {
						container.wallyti();					
					}
				}, options.delayOnResize);				
			});
			
		});
	}	
}) (jQuery);