function skeux_max_width(el, subClass) {
	var wSet = [];

	$(el).find(subClass).each(function() {
		wSet.push($(this).outerWidth());
	});

	return Math.max.apply(null, wSet);
}

function skeux_parse_nav_vertical() {
	$('.skeux-tabs-nav-vertical').each(function() {
		$(this).removeClass('ui-tabs-nav');
		$(this).children('.ui-corner-top').removeClass('ui-corner-top').addClass('ui-corner-left');
		var wNav = $(this).outerWidth();
		$(this).parent().children('.ui-tabs-panel').each(function(index, el) {
			var w = parseInt($(this).css('margin-left')) + wNav; 
			$(this).css('margin-left', w + 'px');
		}); 
	});
}

function skeux_parse_buttonset_vertical() {
	$('.skeux-buttonset-vertical').each(function() {
		$(this).removeClass('ui-buttonset');
		$(this).find('.ui-button').each(function() {
			if ($(this).hasClass('ui-corner-left')) {
				$(this).removeClass('ui-corner-left').addClass('ui-corner-top skeux-buttonset-vertical-button-first');
			}
			if ($(this).hasClass('ui-corner-right')) {
				$(this).removeClass('ui-corner-right').addClass('ui-corner-bottom skeux-buttonset-vertical-button-last');
			}
			$(this).width(skeux_max_width(this, 'span'));
		});
		// $(this).width(skeux_max_width(this, '.ui-button span'));
	});
}

function skeux_parse_slider_marks() {
	$('.skeux-slider-marks').each(function() {
		var min = $(this).slider('option', 'min');
		var max = $(this).slider('option', 'max');
		var step = $(this).slider('option', 'step');
		if ($(this).slider('option', 'orientation') == 'horizontal') {
			$(this).wrap('<div class="skeux-slider-horizontal-wrapper"></div>');
		} else {
			$(this).wrap('<div class="skeux-slider-vertical-wrapper"></div>');
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
	
function skeux_drop_corners() {
	$('.skeux-no-corners').each(function() {
		$(this).removeClass('ui-corner-all ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-tl ui-corner-tr ui-corner-br ui-corner-bl');
	});
	$('.skeux-no-corners .ui-corner-all').each(function() {
		$(this).removeClass('ui-corner-all');
	});
	$('.skeux-no-corners .ui-corner-top').each(function() {
		$(this).removeClass('ui-corner-top');
	});
	$('.skeux-no-corners .ui-corner-bottom').each(function() {
		$(this).removeClass('ui-corner-bottom');
	});
	$('.skeux-no-corners .ui-corner-left').each(function() {
		$(this).removeClass('ui-corner-left');
	});
	$('.skeux-no-corners .ui-corner-right').each(function() {
		$(this).removeClass('ui-corner-right');
	});
	$('.skeux-no-corners .ui-corner-tl').each(function() {
		$(this).removeClass('ui-corner-tl');
	});
	$('.skeux-no-corners .ui-corner-tr').each(function() {
		$(this).removeClass('ui-corner-tr');
	});
	$('.skeux-no-corners .ui-corner-br').each(function() {
		$(this).removeClass('ui-corner-br');
	});
	$('.skeux-no-corners .ui-corner-bl').each(function() {
		$(this).removeClass('ui-corner-bl');
	});
}

function skeux_parse_all() {
	skeux_parse_nav_vertical();
	skeux_parse_buttonset_vertical();
	skeux_parse_slider_marks();

	skeux_drop_corners();
}

