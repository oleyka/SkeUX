//		jQuery.ui.tabs.prototype._init.call(this);

// extension of jQuery tabs widget, additional options:
// align: { left, right, default }
// orientation: { vertical, horizontal, default } 
// 		default invokes the standard refresh() on _init
// corners: { 'yes' / 'no' }
// 		default = yes
$.widget("ui.tabs", jQuery.ui.tabs, {
	skeux_version: "0.0.1",
	options: {
		align: null,
		orientation: null,
		corners: 1
	},

	_init: function() {
		var nav_w_outer,
			nav_h_outer,
			panel_h_outer, 
			panel_h;

		if (this.options.align) {
			this.element.find('.ui-tabs-nav')
				.css('text-align', this.options.align)
				.end();
		}

		switch(this.options.orientation) {
		case 'vertical':
		case 'v':
			this.options.orientation = 'vertical';
			break;
		case 'horizontal':
		case 'h':
		default: 
			this.options.orientation = 'horizontal';
		}

		if (this.options.orientation == 'vertical') {
			this.element
				.removeClass('ui-tabs')
				.addClass('skeux-tabs-v');
			this.element.find('li')
				.removeClass('ui-corner-top')
				.addClass('ui-corner-left')
				.end();

			nav_w_outer = this.element.find('.ui-tabs-nav').outerWidth();
			nav_h_outer = this.element.find('.ui-tabs-nav').outerHeight();
			this.element.find('.ui-tabs-panel')
				.each(function() {
					// shifting the panel content to the right
					$(this).css('margin-left', 
						parseInt($(this).css('margin-left')) + nav_w_outer);

					// adjusting the height
					panel_h_outer = $(this).outerHeight();
					panel_h = $(this).height();

					if (panel_h_outer < nav_h_outer) {
						$(this).css('min-height', 
							nav_h_outer - (panel_h_outer - panel_h));
					}
				})
				.end();
		}

		if (!this.options.corners) {
			skeux_drop_corners(this.element);
		}
	}
});

