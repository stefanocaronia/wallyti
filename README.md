# Wallyti (beta)

*Wallyti* is a simple jQuery plugin that can be used to generate a tiled wall of blocks. It is currently in beta! So if you find some bugs or problems, or you have some suggestions, feel free to contribute :)

The only parameters needed are:

* the minimum block width 
* the maximum block width 
* the margin between blocks

These values are used only to compute the number of column that can fit in the container width, and *Wallity* can override them if it is needed.


## Installation

Include script *after* the jQuery library:
```html
<script src="/path/to/jquery.wallyti.min.js"></script>
```

Remember to not include the script directly from GitHub!

##Options:

* **blockMaxWidth** - sets the maximum width of the single block (in pixels)
* **blockMinWidth** - sets the minimum width of the single block (in pixels)
* **blockMargin** - sets the margin between the block (in pixels)

The above values can also be set using attributes on the container's tag:

```html
<div id="container" 
	wallyti-block-max="300" 
	wallyti-block-min="210"
	wallyti-block-margin="20" >
</div>
```

* **delayOnResize** - milleseconds to wait for the window to be resized
* **disableTransitions** - disable all css transitions 
* **cssTransition** - css style for attribute transitions applied to the blocks (es. "all .25s ease-in-out")
* **onComplete** - callback function to execute everytime all blocks are arranged

The css transition can be set also directly in the stylesheet, in the usual way:

```css
	.box {
		 transition:         all .25s ease-in-out;
		 -webkit-transition: all .25s ease-in-out;
		 -moz-transition:    all .25s ease-in-out;
		 -o-transition:      all .25s ease-in-out;
	}
```

##Usage:

You can initialize *Wallyti* in the document ready or in body onload. The plugin will initialize and run every time the method is called.

NB: Once initialized, it is automatically attached to the window resize event, so there's no need to do this yourself.
	
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
		
		/* setting margin and a callback function 
		*/
		$('#container').wallyti({
			blockMargin: 30,
			onComplete: function(){
				// DO STUFF
			}
		});
		
		/* only callback function 
		*/
		$('#container').wallyti(function(){
			// DO STUFF
		});
		
		/* setting up a transitions 
		*/
		$('#container').wallyti({
			cssTransition: "all 1s ease-in-out",
			disableTransitions: Modernizr.touch  // disable transitions on touch devices
		});
		
	});
```

There is no specific css needed, you're free to customize container and blocks. 
*Wallyti* will set the necessary attributes, for example box-sizing and position will be overwritten by the plugin script.

```css
	#container {
		width:80%;
	}
	
	.myBox {
		transition:         opacity .25s ease-in-out;
		 -webkit-transition: opacity .25s ease-in-out;
		 -moz-transition:    opacity .25s ease-in-out;
		 -o-transition:      opacity .25s ease-in-out;	
	}
	
	/* if a css transition is on the way, this is the class applied until it's finished */
	.myBox.wallity-moving {
		opacity:0.5;
	}
```

The html is very simple (class "myBox" is not needed for the plugin to work)

```html
<div id="container" wallyti-block-margin="10">
	<div class="myBox"></div>
	<div class="myBox"></div>
	<div class="myBox"></div>
	<div class="myBox"></div>
	<div class="myBox"></div>
	<div class="myBox"></div>
	<div class="myBox"></div>
	<div class="myBox"></div>
</div>
```
