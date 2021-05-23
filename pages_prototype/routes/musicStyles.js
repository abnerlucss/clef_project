var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Estilo = require('../models').Estilo;

/* ROTA QUE RECUPERA TODAS OS ESTILOS CADASTRADOS */
router.get('/', function (req, res, next) {
    console.log('Recuperando todos os estilos');

    let instrucaoSql = `select * from estilo order by nomeEstilo;`;

    sequelize.query(instrucaoSql, {
        model: Estilo,
        mapToModel: true
    })
        .then(resultado => {
            console.log(`Encontrados: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

/* ROTA QUE RECUPERA O NUMERO DE ESCOLHAS DOS USUÁRIOS PARA CADA ESTILO  */
router.get('/rankingStyles', function (req, res, next) {
    console.log('Recuperando todos as escolhas dos usuários para cada instrumento');

    let instrucaoSql = `select count(idEstilo) as 'escolhas', estilo.nomeEstilo from estilo join usuario on idEstilo = fkestiloFavorito
	group by idEstilo;`;

    sequelize.query(instrucaoSql, {
        model: Estilo,
        mapToModel: true
    })
        .then(resultado => {
            console.log(`Resultado: ${resultado.length}`);
            res.json(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
});

module.exports = router;
