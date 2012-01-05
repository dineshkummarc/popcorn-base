// PLUGIN: words
// http://www.youtube.com/watch?v=OclVb7Y8_30#t=1m56s

(function (Popcorn) {

"use strict";

	var styleSheet;

	Popcorn.basePlugin( 'words' , function(options, base) {
		var popcorn,
			video,
			classes,
			container,
			textContainer,
			text, node, i;
		
		if (!options.text) {
			return;
		}

		popcorn = this;
		video = popcorn.media;

		//todo: add stylesheet with basePlugin
		if (!styleSheet) {
			styleSheet = document.createElement('style');
			styleSheet.setAttribute('type', 'text/css');
			styleSheet.appendChild(
				document.createTextNode(
					'.popcorn-words { display: none; }\n' +
					'.popcorn-words.active { display: block; }\n'
			));
			document.head.appendChild(styleSheet);
		}

		container = base.makeContainer();

		container.style.cssText = options.style || '';

		//todo: do all of this positioning stuff with basePlugin
		i = options.top;
		if (i || i === 0) {
			if (!isNaN(i)) {
				i += 'px';
			}
			container.style.top = i;
			container.style.position = 'absolute';
		}

		i = options.left;
		if (i || i === 0) {
			if (!isNaN(i)) {
				i += 'px';
			}
			container.style.left = i;
			container.style.position = 'absolute';
		}
		
		i = options.right;
		if (i || i === 0) {
			if (!isNaN(i)) {
				i += 'px';
			}
			container.style.right = i;
			container.style.position = 'absolute';
		}
		
		i = options.bottom;
		if (i || i === 0) {
			if (!isNaN(i)) {
				i += 'px';
			}
			container.style.bottom = i;
			container.style.position = 'absolute';
		}
		
		if (options.align) {
			container.style.textAlign = options.align;
		}
		
		if (options.classes) {
			base.addClass(container, options.classes);
		}
		
		if (options.link) {
			//todo: localize link
			textContainer = document.createElement('a');
			textContainer.setAttribute('href', options.link);
			if (options.linkTarget) {
				textContainer.setAttribute('target', options.linkTarget);
			} else {
				textContainer.setAttribute('target', '_new');
			}

			//pause video when link is clicked
			textContainer.addEventListener('click', function() {
				video.pause();
			}, false);

			container.appendChild(textContainer);
		} else {
			textContainer = container;
		}

		//todo: localize
		text = base.toArray(options.text, /[\n\r]/);
		for (i = 0; i < text.length; i++) {
			if (i) {
				textContainer.appendChild(document.createElement('br'));
			}
			textContainer.appendChild(document.createTextNode(text[i]));
		}
		
		if (typeof options.onLoad === 'function') {
			options.onLoad(options);
		}

		return {
			start: function( event, options ) {
				base.addClass(options.container, 'active');
			},
			end: function( event, options ) {
				base.removeClass(options.container, 'active');
			},
			_teardown: function( options ) {
				if (options.container && options.container.parentNode) {
					var parent = options.container.parentNode;
					parent.removeChild(options.container);
					delete options.container;
				}
			}
		};
	});
})( Popcorn );