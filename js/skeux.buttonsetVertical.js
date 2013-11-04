//		jQuery.ui.buttonset.prototype._init.call(this);

$.widget("skeux.buttonsetUx", jQuery.ui.buttonset, {
	version: "0.0.1",

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

	refresh: function() {

		switch(this.options.orientation) {
		case 'vertical':
			var corners = this.options.corners;
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

			var w = skeux_max_width(this.element, '.ui-button-text');
			this.element.find('.ui-button').width(w);
			this.element.width(skeux_max_width(this.element, ':ui-button'));
			break;
		case 'horizontal':
			var corners = this.options.corners;
			var rtl = this.element.css( "direction" ) === "rtl";

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

			var w = skeux_max_width(this.element, '.ui-button-text');
			this.element.find('.ui-button').width(w);
//			this.element.width(skeux_max_width(this.element, ':ui-button'));
			break;
		case 'inherit':
		default:
			jQuery.ui.buttonset.prototype.refresh.call(this);
		}
		if (this.options.align) { 
			this.element.find( ".ui-button-text" )
				.css('textAlign', this.options.align)
				.end(); 
		}
	},

	_destroy: function() {
		this.element.removeClass( "ui-buttonset skeux-buttonset-v skeux-buttonset-h");
		this.buttons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass("ui-corner-left ui-corner-right ui-corner-top ui-corner-bottom skeux-buttonset-v-button skeux-buttonset-v-button-right skeux-buttonset-v-button-last")
			.end()
			.button( "destroy" );
	}
});

