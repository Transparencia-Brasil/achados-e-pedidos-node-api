(function (routes) {

	routes.init = function (app) {

		var express 	= require("express");
		var router 		= express.Router();

		var interacaoController = require('../controllers/interacaoController');
               
        router.route('/interacoes/criar/:codigo')
			.put(interacaoController.criar);

		router.route('/interacoes/gravar/:codigo')
			.put(interacaoController.gravar);

		router.route('/interacoes/apagar/:codigo')
			.delete(interacaoController.apagar);

		router.route('/interacoes/contar/')
			.post(interacaoController.contar);

		router.route('/interacoes/consultar/')
			.post(interacaoController.consultar);

		router.route('/interacoes/consultar/:codigo')
			.get(interacaoController.consultarPorId);

		app.use('/api', router);
		
	};

})(module.exports);