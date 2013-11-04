/* Returns the maximum width of a subset of descendant elements */
function skeux_max_width(el, subSet) {
	var wSet = [];

	el.find(subSet).each(function() {
		wSet.push($(this).outerWidth());
	});

	return Math.max.apply(null, wSet);
}

/* Drop corners on all descendants of $el's; not pretty yet */
function skeux_drop_corners($el) {
	var classes = [ 'ui-corner-all', 
					'ui-corner-top', 'ui-corner-bottom',
					'ui-corner-left', 'ui-corner-right',
					'ui-corner-tl', 'ui-corner-tr',
					'ui-corner-br', 'ui-corner-bl' ],
		i;
	$el = typeof $el !== 'undefined' ? $el : $('.skeux-no-corners');

	$el.each(function() {
		for (i in classes) {
			$(this).find('.' + classes[i]).each(function() {
				$(this).removeClass(classes[i]);
			});
			$el.removeClass(classes[i]);
		}
	});
}

/*** To be included in the widgets ***/

function skeux_parse_nav_vertical() {
	$('.skeux-tabs-nav-v').each(function() {
		$(this).removeClass('ui-tabs-nav');
		$(this).children('.ui-corner-top').removeClass('ui-corner-top').addClass('ui-corner-left');
		var wNav = $(this).outerWidth();
		$(this).parent().children('.ui-tabs-panel').each(function(index, el) {
			var w = parseInt($(this).css('margin-left')) + wNav; 
			$(this).css('margin-left', w + 'px');
		}); 
	});
}

function skeux_parse_slider_marks() {
	$('.skeux-slider-marks').each(function() {
		var min = $(this).slider('option', 'min');
		var max = $(this).slider('option', 'max');
		var step = $(this).slider('option', 'step');
		if ($(this).slider('option', 'orientation') == 'horizontal') {
			$(this).wrap('<div class="skeux-slider-h-wrapper"></div>');
		} else {
			$(this).wrap('<div class="skeux-slider-v-wrapper"></div>');
		}
		$(this).after('<div class="skeux-slider-mark-min">' + min + '</div>');
		$(this).after('<div class="skeux-slider-mark-max">' + max + '</div>');

		var v = 1;
		var c = parseInt((max-min)/(step*v));
		var maxTicks = parseInt($(this).width() / 32);

		while (c > maxTicks) {
			c = parseInt((max-min)/(step*(++v)));
		}

		if (c > 0) {
			var dTick = $(this).width()/c;
			var xTick;		

			while (c > 1) {
				xTick = Math.round(dTick * (c-1));
				$(this).after('<div class="skeux-slider-mark-tick" style="left: ' + (xTick-16) + 'px"></div>');
			 	c--;
			}
		}
	});
}
	
function skeux_parse_all() {
	skeux_parse_nav_vertical();
	skeux_parse_slider_marks();

	skeux_drop_corners();
}

