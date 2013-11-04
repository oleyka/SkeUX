//		jQuery.ui.buttonset.prototype._init.call(this);

// extension of jQuery buttonset widget, additional options:
// align: { left, right, center }
// 		default = center
// orientation: { vertical, horizontal, default } 
// 		default invokes the standard refresh() on _init
// corners: { 'yes' / 'no' }
// 		default = yes
$.widget("ui.buttonset", jQuery.ui.buttonset, {
	skeux_version: "0.0.1",

	_create: function() {
		switch(this.options.orientation) {
		case 'vertical': 
		case 'v': 
			this.element.addClass('skeux-buttonset-v');
			this.options.orientation = 'vertical';
			break;
		case 'horizontal':
		case 'h':
			this.element.addClass('skeux-buttonset-h');
			this.options.orientation = 'horizontal';
			break;
		default:
			this.element.addClass('ui-buttonset');
			this.options.orientation = 'inherit';
		}
		switch(this.options.corners) { // just unifying
		case 0:
		case '0':
		case 'no':
			this.options.corners = 0;
			break;
		default:
			this.options.corners = 1;
		}
	},

	_init: function() {
		if (this.options.orientation === 'vertical' ||
			this.options.orientation === 'horizontal') {
			this.refresh_ux();
		} else {
			this.refresh();
			if (!this.options.corners) {
				skeux_drop_corners(this.element);
			}
		}

		if (this.options.align) { 
			this.element.find( ".ui-button" )
				.css('textAlign', this.options.align)
				.end(); 
		}
	},

	refresh_ux: function() {
		var corners = this.options.corners,
			rtl = this.element.css( "direction" ) === "rtl",
			w;

		switch(this.options.orientation) {
		case 'vertical':
			this.buttons = this.element.find( this.options.items )
				.filter( ":ui-button" )
					.button( "refresh" )
				.end()
				.not( ":ui-button" )
					.button()
				.end()
				.map(function() {
					return $( this ).button( "widget" )[ 0 ];
				})
					.removeClass( "ui-corner-all ui-corner-left ui-corner-right ui-corner-top ui-corner-bottom" )
					.addClass( 'skeux-buttonset-v-button' )
					.filter( ":first" )
						.addClass('skeux-buttonset-v-button-first')
						.addClass( corners ? 'ui-corner-top' : '')
					.end()
					.filter( ":last" )
						.addClass('skeux-buttonset-v-button-last')
						.addClass( corners ? 'ui-corner-bottom' : '')
					.end()
				.end();

			w = skeux_max_width(this.element, '.ui-button-text');
			this.element.find('.ui-button').width(w);
			this.element.width(skeux_max_width(this.element, ':ui-button'));
			break;
		case 'horizontal':
			this.buttons = this.element.find( this.options.items )
				.filter( ":ui-button" )
					.button( "refresh" )
				.end()
				.not( ":ui-button" )
					.button()
				.end()
				.map(function() {
					return $( this ).button( "widget" )[ 0 ];
				})
					.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )
					.filter( ":first" )
						.addClass('skeux-buttonset-h-button-first')
						.addClass( rtl && corners ? "ui-corner-right" : "ui-corner-left" )
					.end()
					.filter( ":last" )
						.addClass('skeux-buttonset-h-button-last')
						.addClass( rtl && corners ? "ui-corner-left" : "ui-corner-right" )
					.end()
				.end();

			w = skeux_max_width(this.element, '.ui-button-text');
			this.element.find('.ui-button').width(w);
//			this.element.width(skeux_max_width(this.element, ':ui-button'));
			break;
		default:
			jQuery.ui.buttonset.prototype.refresh.call(this);
		}
	},

	_destroy: function() {
		this.element.removeClass( "ui-buttonset skeux-buttonset-v skeux-buttonset-h");
		this.buttons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass("ui-corner-left ui-corner-right ui-corner-top ui-corner-bottom skeux-buttonset-v-button skeux-buttonset-v-button-first skeux-buttonset-v-button-last skeux-buttonset-h-button skeux-buttonset-h-button first skeux-buttonset-h-button-last")
			.end()
			.button( "destroy" );
	}
});

