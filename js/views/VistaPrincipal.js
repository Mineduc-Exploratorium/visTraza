define([
	'underscore',
	'backbone',
	'jquery',
	'd3',
	'views/VistaLoading',
	'VistaToolTip',
	'views/Visualizador',

	], function(_, Backbone,$, d3, VistaLoading, VistaToolTip, Visualizador){


	var VistaPrincipal = Backbone.View.extend(
	/** @lends VistaPrincipal.prototype */
	{

		/**
		* @class VistaPrincipal vista que despliega visualizacion de ingresos vs costos de carreras
		*
		* @augments Backbone.View
		* @constructs
		*
		* @param {object} options parametros de incializacion
		* @param {string} options.el Identificador de elemento en DOM donde se despliegau la vista
		* 
		* VistaPrincipal Inicia parametros de configuración y llamada a datos
		*/
		initialize : function() {
	    	// Auxiliar para referirse a this al interior de callback functions
	    	var self = this

			// Carga de datos
	    	this.vistaLoading = new VistaLoading({el:this.el});
			this.vistaLoading.show();
			d3.tsv("data/flujo_links.txt", function(data) {
				self.vistaLoading.hide();

				self.data = data;
				self.render();
			});
		},

		/**
		* Despliegue inicial de elementos gráficos.
		*/
		render : function() {

			// SVG - contenedor principal de elementos visuales
			this.svg = d3.select(this.el).append("svg")

			// Genera nueva vista que  despliega visualización
			this.visualizador = new Visualizador({
				svg: this.svg,
				data: this.data,
			});


		}
	});
  
  return VistaPrincipal;
});

