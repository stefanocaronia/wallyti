(function($){
	$.fn.wallyti = function(args) {	
		
		var defaults = {
			blockMaxWidth: 360,
			blockMinWidth: 240,
			blockMargin: 35,			
			delayOnResize: 60,
			disableTransitions: false,
			cssTransition: "all 0.2s ease-in-out",
			onComplete: function(){}			
		};
		
		var options = {};
		
		if (typeof(args)=="function") {
			options = $.extend(defaults, {
				onComplete: args
			});
		} else if (typeof(args)!="object") {
			options=defaults;
		} else { 
			options = $.extend(defaults, args);
		}			
		
		return this.each(function() {	

			var colWidth;
			var blockWidth;
			var blockMargin;
			var blockMaxWidth;
			var blockMinWidth;
			var colPos = [];
			var colFit = [];
			var blocks = [];
			
			var colCount = 1;		
			var container = $(this);			
			var blocks = container.children();			
			var numBlocks = blocks.length;			
			var blocksToMove = numBlocks;
			var done = false;
			
			// check if blocks has css transitions
			var hasCssTransition = blocks.css('transition')!="all 0s ease 0s" && blocks.css('transition')!="" && blocks.css('transition').length!=0;
			
			// css for container			
			container.addClass('wallyti-container').css({
				'-moz-box-sizing': 'border-box', 
				'-webkit-box-sizing': 'border-box',
				'box-sizing': 'border-box',
				'position': 'relative',
				'padding': '0' 
			});
			
			// css for blocks
			blocks.addClass('wallyti-block').css({
				'-moz-box-sizing': 'border-box', 
				'-webkit-box-sizing': 'border-box',
				'box-sizing': 'border-box',
				'position': 'absolute',
				'visibility': 'hidden'
			});	

			// option css transition
			if (options.cssTransition && numBlocks<=40 && !options.disableTransitions) {
				blocks.css({
					'-webkit-transition': 	options.cssTransition, 
					'-moz-transition': 		options.cssTransition, 
					'-o-transition': 		options.cssTransition, 
					'transition':			options.cssTransition
				});
				hasCssTransition = true;
				
			} else if (numBlocks>40||options.disableTransitions) { // too many blocks, disbling css transitions
				blocks.css({
					'-webkit-transition': 	'none', 
					'-moz-transition': 		'none', 
					'-o-transition': 		'none', 
					'transition':			'none'
				});
				hasCssTransition = false;
			}	
						
			// get container width
			var containerWidth = container.outerWidth();			
			
			// verify if window has vertical scrollbar
			var windowHasScrollbar=($(document).height() > $(window).height());	
			
			// get max block width setting
			if (container.attr('wallyti-block-max')) blockMaxWidth = parseInt(container.attr('wallyti-block-max'));
			else blockMaxWidth=options.blockMaxWidth;
			
			// get min block width setting
			if (container.attr('wallyti-block-min')) blockMinWidth = parseInt(container.attr('wallyti-block-min'));
			else blockMinWidth=options.blockMinWidth;
			
			// get margin setting
			if (container.attr('wallyti-block-margin')) blockMargin = parseInt(container.attr('wallyti-block-margin'));
			else blockMargin=options.blockMargin;
			
			// col num from wich to start
			var maxCols = Math.floor(containerWidth/blockMinWidth)+2;
			
			// finding column number
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
			
			// executed after all boxes are newPositiond
			function complete() {
				setTimeout(function(){
					if (windowHasScrollbar!=($(document).height()>$(window).height()) || containerWidth!=container.outerWidth()) {					
						container.wallyti(options);
						return;
					}
				},100);
				options.onComplete(); // custom callback
			}	
			
			// executed every box positioning
			function onBlockMoved() {
				if (done) return;
				done=(--blocksToMove==0);
				if (done) complete();
			}
			
			// box arrange cycle
			blocks.each(function(){	
				var block = $(this);
				var blockHeight;				
				var column = ( colCount > 1 ? colPos.indexOf(Math.min.apply(Math,colPos)) : 0);	
				var newPosition = {					
					top: colPos[column],
					left: ( (column*colWidth)>=0 ? column*colWidth : 0 ),				
					width: blockWidth
				}	
				
				// clone box
				cloned = block.clone();				
				cloned.css(newPosition).css("visibility","hidden").addClass("cloned").appendTo(container);								
				blockHeight=cloned.outerHeight();
				colPos[column]+=blockHeight+blockMargin;					
				cloned.remove();				
				
				// adding movement class and take it out when animation end
				if (hasCssTransition && block.css('top')!=newPosition.top && block.css('left')!=newPosition.left) {// only if position is changed 
					block.addClass('wallyti-moving').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(e){
						block.removeClass('wallyti-moving');
						onBlockMoved();
					});	
				}
				
				// moving the real block
				block.css('visibility','visible');
				block.css(newPosition);
				
				// in there is no transition or it is first load
				if (!hasCssTransition || parseInt(container.data('wallyti-executed'))!='1') 
					onBlockMoved();					
			});		
				
			// set new container height
			container.height(Math.max.apply(Math,colPos));	
							
			// setup resize event
			$(window).off('resize.wallyti').on('resize.wallyti',function(){				
				clearTimeout(window.resizedFinished);
				window.resizedFinished = setTimeout(function(){
					if (containerWidth!=container.outerWidth()) {
						container.wallyti(options);					
					}
				}, options.delayOnResize);				
			});
			
			container.data('wallyti-executed','1');
		});
	}	
}) (jQuery);