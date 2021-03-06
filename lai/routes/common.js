(function (routes) {

	routes.init = function (app) {

		var express 	= require("express");
		var router 		= express.Router();

		var commonController = require('../controllers/commonController');

        router.route('/contar/')
			.post(commonController.contar);

		router.route('/consulta-simples/')
			.post(commonController.consultaSimples);
		
		router.route('/consultar/')
			.post(commonController.consultar);

		router.route('/busca-avancada/')
			.post(commonController.buscaAvancada);

		app.use('/api', router);
		
	};

})(module.exports);
