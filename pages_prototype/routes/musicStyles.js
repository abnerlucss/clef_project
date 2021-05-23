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

module.exports = router;
