(function () {
	"use strict";

	// some dummy data to play with..
	var allImages = {
		page1: [
			'<div><img src="img/1.jpg" alt="img01"/></div>',
			'<div><img src="img/2.jpg" alt="img02"/></div>',
			'<div><img src="img/3.jpg" alt="img03"/></div>',
			'<div><img src="img/4.jpg" alt="img04"/></div>',
			'<div><img src="img/5.jpg" alt="img05"/></div>',
			'<div><img src="img/6.jpg" alt="img06"/></div>'
		],
		page2: [
			'<div><img src="img/7.jpg" alt="img07"/></div>',
			'<div><img src="img/8.jpg" alt="img08"/></div>',
			'<div><img src="img/9.jpg" alt="img09"/></div>',
			'<div><img src="img/10.jpg" alt="img10"/></div>',
			'<div><img src="img/11.jpg" alt="img11"/></div>',
			'<div><img src="img/12.jpg" alt="img12"/></div>'
		],
		page3: [
			'<div><img src="img/17.jpg" alt="img17"/></div>',
			'<div><img src="img/18.jpg" alt="img18"/></div>',
			'<div><img src="img/19.jpg" alt="img19"/></div>',
			'<div><img src="img/20.jpg" alt="img20"/></div>',
			'<div><img src="img/21.jpg" alt="img21"/></div>',
			'<div><img src="img/22.jpg" alt="img22"/></div>'
		],
		page4: [
			'<div><img src="img/13.jpg" alt="img13"/></div>',
			'<div><img src="img/14.jpg" alt="img14"/></div>',
			'<div><img src="img/15.jpg" alt="img15"/></div>',
			'<div><img src="img/16.jpg" alt="img16"/></div>'
		]
	};

	var animEndEventNames = {
			WebkitAnimation: "webkitAnimationEnd",
			OAnimation: "oAnimationEnd",
			msAnimation: "MSAnimationEnd",
			animation: "animationend"
		},
		// animation end event name
		animEndEventName = animEndEventNames[Modernizr.prefixed("animation")],
		// event type (if mobile use touch events)
		eventtype = "click",
		// support for css animations
		support = Modernizr.cssanimations;

	function onAnimationEnd(elems, len, callback) {
		var finished = 0,
			onEndFn = function () {
				this.removeEventListener(animEndEventName, onEndFn);
				++finished;
				if (finished === len) {
					callback.call();
				}
			};

		elems.forEach(function (el, i) {
			el.querySelector("div").addEventListener(animEndEventName, onEndFn);
		});
	}

	function init() {
		[].forEach.call(document.querySelectorAll(".tt-grid-wrapper"), function (
			el
		) {
			var grid = el.querySelector(".tt-grid"),
				items = [].slice.call(grid.querySelectorAll("li")),
				navDots = [].slice.call(el.querySelectorAll("nav > a")),
				isAnimating = false,
				current = 0;

			navDots.forEach(function (el, i) {
				el.addEventListener(eventtype, function (ev) {
					if (isAnimating || current === i) return false;
					ev.preventDefault();
					isAnimating = true;
					updateCurrent(i);
					loadNewSet(i);
				});
			});

			function updateCurrent(set) {
				classie.remove(navDots[current], "tt-current");
				classie.add(navDots[set], "tt-current");
				current = set;
			}

			// this is just a way we can test this. You would probably get your images with an AJAX request...
			function loadNewSet(set) {
				var newImages = allImages.page1;
				switch (set) {
					case 1:
						newImages = allImages.page2;
						break;
					case 2:
						newImages = allImages.page3;
						break;
					case 3:
						newImages = allImages.page4;
						break;
					default:
						newImages = allImages.page1;
						break;
				}

				items.forEach(function (el) {
					var itemChild = el.querySelector("div");
					// add class "tt-old" to the elements/images that are going to get removed
					if (itemChild) {
						classie.add(itemChild, "tt-old");
					}
				});

				// apply effect
				setTimeout(function () {
					// append new elements
					[].forEach.call(newImages, function (el, i) {
						items[i].innerHTML += el;
					});

					// add "effect" class to the grid
					classie.add(grid, "tt-effect-active");

					// wait that animations end
					var onEndAnimFn = function () {
						// remove old elements
						items.forEach(function (el) {
							// remove old elems
							var old = el.querySelector("div.tt-old");
							if (old) {
								el.removeChild(old);
							}
							// remove class "tt-empty" from the empty items
							classie.remove(el, "tt-empty");
							// now apply that same class to the items that got no children (special case)
							if (!el.hasChildNodes()) {
								classie.add(el, "tt-empty");
							}
						});
						// remove the "effect" class
						classie.remove(grid, "tt-effect-active");
						isAnimating = false;
					};
					if (support) {
						onAnimationEnd(items, items.length, onEndAnimFn);
					} else {
						onEndAnimFn.call();
					}
				}, 25);
			}
		});
	}

	init();
})();
