/* Extension of jQuery buttonset widget
 * 
 * @class ui.buttonset
 * @param {String} align Alignment of text in the button
 *   Available values: { 'left', 'right', 'center' }
 * @param {String} orientation Buttonset orientation
 *   Available values: { 'vertical', 'horizontal', null }
 *   null value invokes the standard refresh() on _init
 * @param {Boolean} corners Rounded corners, default == true
 * 
 * @method _init Apply skeux-specific parameters
 * @method refresh_ux Replaces the original jQuery refresh 
 * @method _destroy Replaces the original jQuery _destroy 
 */

$.widget('ui.buttonset', jQuery.ui.buttonset, {
	skeux_version: "0.0.1",
	options: {
		align: null,
		orientation: null,
		corners: true
	},

	_init: function() {
		switch (this.options.orientation) {
		case 'vertical':
			this.element.addClass('skeux skeux-buttonset-v');
			this.refresh_ux();
			break;
		case 'horizontal':
			this.element.addClass('skeux skeux-buttonset-h');
			this.refresh_ux();
			break;
		default:
			this.options.orientation = null;
			this.refresh();
		}

		if (!this.options.corners) {
			skeux_drop_corners(this.element);
		}

		if (this.options.align) { 
			this.element.find( '.ui-button' )
				.css('text-align', this.options.align)
				.end(); 
		}
	},

	refresh_ux: function() {
		var corners = this.options.corners,
			rtl = this.element.css( "direction" ) === "rtl",
			w;

		switch (this.options.orientation) {
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
					.removeClass('ui-corner-all ui-corner-top ui-corner-bottom')
					.filter( ":first" )
						.addClass( corners ? 'ui-corner-top' : '')
					.end()
					.filter( ":last" )
						.addClass( corners ? 'ui-corner-bottom' : '')
					.end()
				.end();

			w = skeux_max_width(this.element, '.ui-button-text');
			this.element.find('.ui-button').width(w);
			this.element.width(skeux_max_width(this.element, '.ui-button'));
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
						.addClass( rtl && corners ? "ui-corner-right" : "ui-corner-left" )
					.end()
					.filter( ":last" )
						.addClass( rtl && corners ? "ui-corner-left" : "ui-corner-right" )
					.end()
				.end();

			w = skeux_max_width(this.element, '.ui-button-text');
			this.element.find('.ui-button').width(w);
			this.element.width(skeux_sum_width(this.element, '.ui-button'));
			break;
		default:
		}
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-buttonset" )
			.removeClass('skeux skeux-buttonset-v skeux-buttonset-h');
		this.buttons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass("ui-corner-left ui-corner-right " +
					"ui-corner-top ui-corner-bottom ")
			.end()
			.button( "destroy" );
	}
});

