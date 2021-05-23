var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Instrumento = require('../models').Instrumento;

/* ROTA QUE RECUPERA TODAS OS INSTRUMENTOS CADASTRADOS */
router.get('/', function (req, res, next) {
    console.log('Recuperando todos os instrumentos');

    let instrucaoSql = `select * from instrumento;`;

    sequelize.query(instrucaoSql, {
        model: Instrumento,
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

/* ROTA QUE RECUPERA O NUMERO DE ESCOLHAS DOS USUÁRIOS PARA CADA INTRUMENTO  */
router.get('/rankingInstruments', function (req, res, next) {
    console.log('Recuperando todos as escolhas dos usuários para cada instrumento');

    let instrucaoSql = `select count(idInstrumento) as 'escolhas', instrumento.nomeInstrumento from instrumento join usuario on idInstrumento = fkInstrumentoFavorito
	group by idInstrumento;`;

    sequelize.query(instrucaoSql, {
        model: Instrumento,
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
