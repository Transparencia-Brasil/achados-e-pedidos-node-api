

CREATE TABLE IF NOT EXISTS `dashboard` (
  `Codigo` int(11)  NULL,
  `Mes` VARCHAR(255) NULL,
  `Ano` VARCHAR(255)  NULL,
  `CodigoAgente` int(11)  NULL,
  `NomeAgente` VARCHAR(1000)  NULL,
  `Poder` VARCHAR(255)  NULL,
  `NivelFederativo` VARCHAR(255)  NULL,
  `Uf` VARCHAR(255)  NULL,
  `Cidade` VARCHAR(255)  NULL,
  `CodigoStatusPedido` int(11)  NULL,
  `StatusPedido` VARCHAR(255)  NULL,
  `CodigoSituacaoPedido` int(11)  NULL,
  `SituacaoPedido` VARCHAR(255)  NULL,
  `CodigoUltimaInteracao` int(11)  NULL,
  `UltimaInteracao` VARCHAR(255)  NULL,
  `DataEnvio` datetime  NULL,
  `DataPrimeiraResposta` datetime  NULL,
  `DataUltimaResposta` datetime  NULL,
  `TempoPrimeiraResposta` VARCHAR(255)  NULL,
  `TempoRespostaFinal` VARCHAR(255)  NULL,
  `TeveRecurso` VARCHAR(255)  NULL
);




 DELIMITER //
 CREATE PROCEDURE PreparaDashboard()
   BEGIN
   
   
	   
	SET lc_time_names = 'pt_BR';

		
	truncate table dashboard;


	INSERT INTO dashboard (
		Codigo,
		Mes,
		Ano, 
		CodigoAgente,
		NomeAgente,
		Poder,
		NivelFederativo,
		Uf,
		Cidade,
		CodigoStatusPedido,
		StatusPedido,
		CodigoSituacaoPedido,
		SituacaoPedido,
		CodigoUltimaInteracao,
		UltimaInteracao,
		DataEnvio,
		DataPrimeiraResposta,
		DataUltimaResposta,
		TempoPrimeiraResposta,
		TempoRespostaFinal,
		TeveRecurso
	)

	SELECT 
		Codigo,
		MONTHNAME(DataEnvio) AS Mes,
		YEAR(DataEnvio) AS Ano, 
		CodigoAgente,
		NULL AS NomeAgente,
		NULL AS Poder,
		NULL AS NivelFederativo,
		NULL AS Uf,
		NULL AS Cidade,
		CodigoStatusPedido,
		NULL AS StatusPedido,
		CodigoTipoPedidoSituacao AS CodigoSituacaoPedido,
		NULL AS SituacaoPedido,
		
		NULL AS CodigoUltimaInteracao,
		NULL AS UltimaInteracao,
		
		DataEnvio,
		NULL AS DataPrimeiraResposta,
		NULL AS DataUltimaResposta,
		
		NULL AS TempoPrimeiraResposta,
		NULL AS TempoRespostaFinal,
		'Nao' AS TeveRecurso
	FROM pedidos;

	UPDATE dashboard d
	JOIN 
	(SELECT agentes.Nome,
			  agentes.Codigo,
			  uf.Nome AS agente_UF,
			  cidade.Nome AS agente_Cidade,
			  tipo_poder.Nome AS agente_Poder,
			  tipo_nivel_federativo.Nome AS agente_Nivel_Federativo
	   FROM agentes,
			uf,
			cidade,
			tipo_poder,
			tipo_nivel_federativo
	   WHERE agentes.CodigoUF = uf.Codigo
		 AND agentes.CodigoCidade = cidade.Codigo
		 AND agentes.CodigoPoder = tipo_poder.Codigo
		 AND agentes.CodigoNivelFederativo = tipo_nivel_federativo.Codigo) 
	AS a
	ON (a.Codigo = d.CodigoAgente)
	SET
	d.NomeAgente = a.Nome,
	d.Poder = a.agente_Poder,
	d.NivelFederativo = a.agente_Nivel_Federativo,
	d.Uf = a.agente_UF,
	d.Cidade = a.agente_Cidade;
		
	UPDATE dashboard d
	JOIN status_pedido sp
		ON (d.CodigoStatusPedido = sp.Codigo)
	SET
		d.StatusPedido = sp.Nome;

	UPDATE dashboard d
	JOIN tipo_pedido_situacao tps
		ON (d.CodigoSituacaoPedido = tps.Codigo)
	SET
		d.SituacaoPedido = tps.Nome;

	UPDATE dashboard d
	JOIN 
	(SELECT CodigoPedido, MAX(CodigoTipoPedidoResposta) AS CodigoTipoPedidoResposta from pedidos_interacoes GROUP BY CodigoPedido) AS i
		ON (d.Codigo = i.CodigoPedido)
	SET d.CodigoUltimaInteracao = i.CodigoTipoPedidoResposta;

	UPDATE dashboard d
	JOIN tipo_pedido_resposta tpr
		ON (d.CodigoUltimaInteracao = tpr.Codigo)
	SET
		d.UltimaInteracao = tpr.Nome;

	UPDATE dashboard d
	JOIN pedidos_interacoes pi
		ON (d.Codigo = pi.CodigoPedido AND d.CodigoUltimaInteracao = pi.CodigoTipoPedidoResposta)
	SET d.DataUltimaResposta = pi.DataResposta;

	UPDATE dashboard d
	JOIN pedidos_interacoes pi
		ON (d.Codigo = pi.CodigoPedido AND pi.CodigoTipoPedidoResposta = 1)
	SET d.DataPrimeiraResposta = pi.DataResposta;

	UPDATE dashboard 
	SET TempoPrimeiraResposta = datediff(DataPrimeiraResposta, DataEnvio);

	UPDATE dashboard 
	SET TempoRespostaFinal = datediff(DataUltimaResposta, DataEnvio)
    WHERE CodigoUltimaInteracao > 1;

	UPDATE dashboard 
	SET TeveRecurso = 'Sim' WHERE CodigoUltimaInteracao > 3;

    UPDATE dashboard 
	SET CodigoAgente = '' WHERE CodigoAgente is NULL;

	UPDATE dashboard 
	SET CodigoStatusPedido = '' WHERE CodigoStatusPedido is NULL;

	UPDATE dashboard 
	SET CodigoSituacaoPedido = '' WHERE CodigoSituacaoPedido is NULL;

	UPDATE dashboard 
	SET Poder = '' WHERE Poder is NULL;
    
    UPDATE dashboard 
	SET Mes = '' WHERE Mes is NULL;
    
    UPDATE dashboard 
	SET Ano = '' WHERE Ano is NULL;
    
    UPDATE dashboard 
	SET NomeAgente = '' WHERE NomeAgente is NULL;
    
    UPDATE dashboard 
	SET NivelFederativo = '' WHERE NivelFederativo is NULL;
    
    UPDATE dashboard 
	SET NivelFederativo = '' WHERE NivelFederativo is NULL;
    
    UPDATE dashboard 
	SET Uf = '' WHERE Uf is NULL;
    
    UPDATE dashboard 
	SET Cidade = '' WHERE Cidade is NULL;
    
    UPDATE dashboard 
	SET StatusPedido = '' WHERE StatusPedido is NULL;
    
    UPDATE dashboard 
	SET SituacaoPedido = '' WHERE SituacaoPedido is NULL;
    
    UPDATE dashboard 
	SET UltimaInteracao = '' WHERE UltimaInteracao is NULL;
    
    UPDATE dashboard 
	SET TempoPrimeiraResposta = '' WHERE TempoPrimeiraResposta is NULL OR TempoPrimeiraResposta < 0;

	UPDATE dashboard 
	SET TempoRespostaFinal = '' WHERE TempoRespostaFinal is NULL OR TempoRespostaFinal < 0;
    
    
    SET lc_time_names = 'en_US';
   
   
   END //
 DELIMITER ;
 
