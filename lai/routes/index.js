(function (routes) {

	var express 	= require("express");

	routes.init = function (app) {

		var router = express.Router();
		
		require("./common").init(app);
		require("./pedido").init(app);
		require("./interacao").init(app);
		require("./anexo").init(app);

	};

})(module.exports);