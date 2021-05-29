var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Instrumento = require('../models').Instrumento;

/* ROTA QUE RECUPERA TODOS OS INSTRUMENTOS CADASTRADOS */
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

    let instrucaoSql = `select count(fkInstrumento) as 'escolhas', nomeInstrumento from favoritarInstrumento join instrumento on fkInstrumento = idInstrumento group by nomeInstrumento;`;

    sequelize.query(instrucaoSql, {
        model: Instrumento,
        mapToModel: false
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
