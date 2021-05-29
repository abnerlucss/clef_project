var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Postagem = require('../models').Postagem;

/* ROTA QUE RECUPERA TODOS OS POSTS */
router.get('/', function (req, res, next) {
    console.log('Recuperando todos os estilos');

    let instrucaoSql = `select post.*, usuario.nome from post join usuario on fkUsuario = idUsuario order by idPost desc;`;

    sequelize.query(instrucaoSql, {
        model: Postagem,
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

/* ROTA QUE CRIA UM POST */
router.post('/addPost/:idUsuario',function(req, res, next) {
    console.log("Iniciando Publicação...");

	let idUsuario = req.params.idUsuario;

    Postagem.create({
        titulo: req.body.title,
        texto: req.body.text,
        fkUsuario: idUsuario
    }).then(resultado => {
        console.log("USUÁRIO CADASTRADO COM SUCESSO!");
        res.send(resultado);
    }).catch(erro => {
        console.log('ERRO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
});


module.exports = router;
