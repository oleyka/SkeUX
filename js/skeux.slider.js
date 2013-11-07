//		jQuery.ui.tabs.prototype._init.call(this);

/* Extension of jQuery slider widget
 * 
 * @method ui.slider
 * @param {Boolean} marks Tickmarks, defaults to false.
 * @param {Number} tick_step If ommitted and marks == true, tick_step == step.
 *   If no step either, then tick_step is calculated based on min and max.
 * @param {Boolean} current Display the current value of the slider,
 *   defaults to false.
 * @param {Boolean} mark_initial Display a special mark at the initial 
 *   slider value
 */
$.widget("ui.slider", jQuery.ui.slider, {
	skeux_version: "0.0.1",
	options: {
		marks: false,
		mark_initial: false,
		tick_step: null,
		current: false,
	},

	_init: function() {
		this.element.addClass('skeux');

		if (this.options.marks) {
			$(this.element).append('<div class="skeux-slider-mark-min">' + 
				this.options.min + '</div>');
			$(this.element).append('<div class="skeux-slider-mark-max">' + 
				this.options.max + '</div>');
			this.tickMark();
		}
	},
	// resize is not working
	resize: function() {
		console.log("resize!");
		if (this.options.marks) {
			this.element.remove('.skeux-slider-tick');
			this.tickMark();
		}
	},
	tickMark: function() {
		var min = this.options.min,
			max = this.options.max,
			stepTick = (this.options.tick_step !== null) ? 
				this.options.tick_step : this.options.step,
			$el = this.element,
			w = $el.innerWidth(),
			h = $el.innerHeight(),
			wTick, hTick, dTick,
			countMax, c;

		switch(this.options.orientation) {
		case 'horizontal':
			wTick = parseInt($el.find('.skeux-slider-mark-min').width());
			countMax = Math.floor(w / wTick);

			// no overlaping ticks
			if ((max - min) / stepTick > countMax) {
				stepTick = (max - min) / countMax;
			} else {
				countMax = Math.ceil((max - min) / stepTick);
			}

			if (countMax > 0) {
				dTick = stepTick * w / (max - min);
			}

			// one tick less than the amount of fragments
			for (c = 1; c < countMax; c++) {
				$el.append('<div class="skeux-slider-tick" ' + 
					' style="left:' + parseInt(c * dTick - wTick / 2) + 'px"></div>');
			}
			break;
		case 'vertical':
			hTick = parseInt($el.find('.skeux-slider-mark-min').height());
			countMax = Math.floor(h / hTick);

			// no overlaping ticks
			if ((max - min) / stepTick > countMax) {
				stepTick = (max - min) / countMax;
			} else {
				countMax = Math.ceil((max - min) / stepTick);
			}

			if (countMax > 0) {
				dTick = stepTick * h / (max - min);
			}

console.log(h, hTick);
console.log(countMax, dTick);

			// one tick less than the amount of fragments
			for (c = countMax; c > 1; c--) {
				$el.append('<div class="skeux-slider-tick" ' + 
					' style="bottom:' + parseInt(c * dTick - dTick - hTick / 2) + 'px"></div>');
			}
			break;
		default: ;
		}
	}
});



