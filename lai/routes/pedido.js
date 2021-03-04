(function (routes) {

	routes.init = function (app) {

		var express 	= require("express");
		var router 		= express.Router();

		var pedidoController = require('../controllers/pedidoController');
		//2017-01-22 Paulo Campos: Adicionado rota
		router.route('/pedidos/listar')
			.post(pedidoController.listar);

		router.route('/pedidos/searchasyoutype')
			.post(pedidoController.searchAsYouType);

		router.route('/pedidos/searchasyoutype-enviadopara')
			.post(pedidoController.searchAsYouTypeEnviadoPara);

		router.route('/pedidos/searchasyoutype-por')
			.post(pedidoController.searchAsYouTypePor);
               
        router.route('/pedidos/criar/:codigo')
			.put(pedidoController.criar);

		router.route('/pedidos/gravar/:codigo')
			.put(pedidoController.gravar);

		router.route('/pedidos/apagar/:codigo')
			.delete(pedidoController.apagar);

		router.route('/pedidos/contar/')
			.post(pedidoController.contar);

		router.route('/pedidos/consultar/')
			.post(pedidoController.consultar);

		router.route('/pedidos/consultar/:codigo')
			.get(pedidoController.consultarPorId);

		app.use('/api', router);
		
	};

})(module.exports);
