define([
	'underscore',
	'backbone',
	'jquery',
	'd3',
	], function(_, Backbone,$, d3){

	// VistaToolTip
	// ----------------------------
	// Muestra tooltip con mini ficha del item (se ubica al hacer rollover sobre el establecimiento)
	var VistaToolTip = Backbone.View.extend({

		initialize: function() {
			this.myHeight = 0;
			this.render()
		},

		// show
		// ----
		// Genera el menaje a mostrar (de acuerdo a datos ingresados) y muestra el tooltip en la
		// posición indicada
		//
		// data: {nombre:"Escuela Arturo Prat", rbd: 123, ...}
		// pos : {x: 100, y: 250}
		show: function(data) {
			$tooltip = this.$el;
			$tooltipcontent = $tooltip.find(".tooltipcontent")

			$tooltipcontent.html(this.message(data));

			// Obtiene posción relativa de body (producto de auto-margin)
			bodyLeft = document.body.getBoundingClientRect().left;
			
			var pos = {x:d3.event.pageX-bodyLeft, y:d3.event.pageY}


			// Chequea si tooltip queda fuera del área visible
			//var posY = pos.y-$(window).scrollTop() + $tooltip.height() < +$(window).height() ? pos.y +10 : $(window).height() + $(window).scrollTop() - $tooltip.height() -10 ;
			//var posX = pos.x > 0 ? pos.x+10 : 0 ;
			//var posX = pos.x > $(window).width()-$tooltip.width() ? $(window).width()-$tooltip.width() : pos.x+10 ;

			var newpos = this.tooltipPosition(pos.x, pos.y);


			$tooltip.css({"top":newpos.y, "left":newpos.x});

			$tooltip.show();
		},

		tooltipPosition: function(mouseX, mouseY) {
			var windowH = $(window).height();
			var windowW = $(window).width();
			var scrollH = $(window).scrollTop();
			var offsetV = $("body").offset().left;
			var tooltipH = this.$el.height();
			var tooltipW = this.$el.width();

			var posX = mouseX > (windowW-tooltipW-offsetV) ? windowW-tooltipW-offsetV : mouseX+10;

			if ((mouseY+tooltipH-scrollH) < windowH) {
				posY = mouseY + 10;
			} else {
				posY = windowH-tooltipH+scrollH-10;
				posX = posX<(windowW-tooltipW-offsetV) ? posX : mouseX-tooltipW -10;
			}

			return {x:posX, y:posY};
		},

		hide: function() {
			$tooltip = this.$el;
			$tooltip.hide();
		},

		message: function(data) {
			var format = d3.format(",d")
			msg = data.nombre;
			return msg
		},


		render: function() {
			$tooltip = this.$el
			
			$tooltip.attr("style", "background:#ffff99;width:350px;position:absolute;z-index:9999;border-radius: 8px;opacity:0.9;");

			$tooltip.hide();

			$tooltipcontent = $("<div>")
				.attr("class", "tooltipcontent")
				.attr("style", "padding:4px;");

			$tooltip.append($tooltipcontent);
			$tooltip.appendTo($("body"));

			return this;
		}
	});
  
  return VistaToolTip;
});




