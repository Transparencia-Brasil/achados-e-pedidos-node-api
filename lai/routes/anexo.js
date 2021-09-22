(function (routes) {

	routes.init = function (app) {

		var express 	= require("express");
		var router 		= express.Router();

		var anexoController = require('../controllers/anexoController');
               
        router.route('/anexos/criar/:codigo')
			.put(anexoController.criar);

		router.route('/anexos/gravar/:codigo')
			.put(anexoController.gravar);

		router.route('/anexos/extractor-update/:codigo/')
			.put(anexoController.extractorUpdate);

		router.route('/anexos/apagar/:codigo')
			.delete(anexoController.apagar);

		router.route('/anexos/contar/')
			.post(anexoController.contar);

		router.route('/anexos/consultar/')
			.post(anexoController.consultar);
		
		router.route('/anexos/listar/')
			.post(anexoController.listar);

		router.route('/anexos/listarconteudo/')
			.get(anexoController.listarconteudo);
		
		router.route('/anexos/consultar/:codigo')
			.get(anexoController.consultarPorId);

		app.use('/api', router);
		
	};

})(module.exports);