# jquery.wallyti (beta)

This is a simple jQuery plugin that can be used to generate a tiled wall of blocks.
The only parameters needed are the minimum block width and the maximum block width, the margin between blocks.
These values are used only to compute the number of column and they can be forced if it is needed (in case of a single column or if the min and max values can't fit for a specific container width.


## Installation

Include script *after* the jQuery library:
```html
<script src="/path/to/jquery.wallyti.js"></script>
```

Do not include the script directly from GitHub.

##Options:

* **blockMaxWidth** - sets the maximum width of the single block (in pixels)
* **blockMinWidth** - sets the minimum width of the single block (in pixels)
* **blockMargin** - sets the margin between the block (in pixels)

The above values can also be set using attributes on the container's tag:

```html
<div id="container" wallyti-block-max="300" wallyti-block-min="210" wallyti-block-margin="20">
```

* **delayOnResize** - milleseconds to wait for the window to be resized
* **disableTransitions** - disable all css transitions 
* **cssTransition** - css style for attribute transitions applied to the blocks
* **onComplete** - callback function to execute everytime all blocks are arranged

The css transition can be set also directly in the stylesheet, in the usual way:

```css
	.box {
		 transition:         opacity .25s ease-in-out;
		 -webkit-transition: opacity .25s ease-in-out;
		 -moz-transition:    opacity .25s ease-in-out;
		 -o-transition:      opacity .25s ease-in-out;
	}
```

##Usage:

You can initialize the plugin in document ready or in body onload
	
```javascript
	$(function(){
		
		/* with the default parameters:
			blockMaxWidth: 360,
			blockMinWidth: 240,
			blockMargin: 35,			
			delayOnResize: 60,
			disableTransitions: false,
			cssTransition: "all 0.2s ease-in-out",
		*/
		$('#container').wallyti();
		
		/* setting margin and a callback function */
		$('#container').wallyti({
			blockMargin: 30,
			onComplete: function(){
				// DO STUFF
			}
		});
		
		/* only callback function */
		$('#container').wallyti(function(){
			// DO STUFF
		});
		
		/* setting up a transitions */
		$('#container').wallyti({
			cssTransition: "all 1s ease-in-out",
			disableTransitions: Modernizr.touch  // disable transitions on touch devices
		});
		
	});
```

```css
	#container {
		width:80%;
	}
	
	.box {
		transition:         opacity .25s ease-in-out;
		 -webkit-transition: opacity .25s ease-in-out;
		 -moz-transition:    opacity .25s ease-in-out;
		 -o-transition:      opacity .25s ease-in-out;	
	}
	
	/* if a css transition is on the way, this is the class applied until it's finished
	.box.wallity-moving {
		opacity:0.5;
	}
```

```html
<div id="container" wallyti-block-margin="10">
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
	<div class="box"></div>
</div>
```
