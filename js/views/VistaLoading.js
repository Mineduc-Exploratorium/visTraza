define([
  'underscore',
  'backbone',
  'jquery',
  'd3',
	], function(_, Backbone,$, d3){

	var VistaLoading = Backbone.View.extend(
	/** @lends VistaLoading.prototype */
	  {

		/**
		* @class VistaLoading Muestra / oculta un indicador de carga de datos
		*
		* @augments Backbone.View
		* @constructs
		*
		*/
		initialize: function() {
			this.render();
		},

		/**
		* Muestra el indicador de carga 	
		*
		*/
		show: function() {
			this.$indicator.show();
		},

		/**
		* Esconde el indicador de carga 	
		*
		*/
		hide: function() {
			this.$indicator.hide();
		}, 

		/**
		* Despliegua elementos visuales 	
		*/
		render: function() {
			this.$indicator = $("<div>");
			this.$indicator.append("<progress>");
			this.$indicator.append("<label>Cargando ...</label>");

			this.$el.append(this.$indicator);
		}
	});

  return VistaLoading;
});

