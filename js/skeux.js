
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

	skeux_drop_corners();
}

