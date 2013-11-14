/* Returns the maximum width of a subset of descendant elements */
function skeux_max_width(el, subSet) {
	var wSet = [];

	el.find(subSet).each(function() {
		wSet.push($(this).outerWidth());
	});

	return Math.max.apply(null, wSet);
}

/* Returns the maximum height of a subset of descendant elements */
function skeux_max_height(el, subSet) {
	var wSet = [];

	el.find(subSet).each(function() {
		wSet.push($(this).outerHeight());
	});

	return Math.max.apply(null, wSet);
}

/* Returns the sum of widths of a subset of descendant elements */
function skeux_sum_width(el, subSet) {
	var w = 0;

	el.find(subSet).each(function() {
		w += $(this).outerWidth();
	});

	return w;
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
		var c = parseInt((max - min) / (step * v));
		var maxTicks = parseInt($(this).width() / 32);

		while (c > maxTicks) {
			c = parseInt((max - min) / (step * (++v)));
		}

		if (c > 0) {
			var dTick = $(this).width() / c;
			var xTick;

			while (c > 1) {
				xTick = Math.round(dTick * (c - 1));
				$(this).after('<div class="skeux-slider-mark-tick"' +
					' style="left: ' + (xTick - 16) + 'px"></div>');
			 	c--;
			}
		}
	});
}

function skeux_parse_all() {
//	skeux_parse_slider_marks();
}

