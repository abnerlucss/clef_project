var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/authenticate', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.user_login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login	

	let instrucaoSql = `select * from usuario where login='${login}' and senha='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ', sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Verificar se o usuário já selecionou o instrumento */
router.get('/checkInstrument/:idUsuario', function (req, res, next) {
	console.log('Se o usuário possui instrumento favorito');
	var idUsuario = req.params.idUsuario;
	let instrucaoSql = `select * from usuario where idUsuario = ${idUsuario}`;

	sequelize.query(instrucaoSql, {
		model: Usuario,
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

/* Verificar se o usuário já selecionou o estilo*/
router.get('/checkStyle/:idUsuario', function (req, res, next) {
	console.log('Verificando se o usuário possui estilo favorito');

	var idUsuario = req.params.idUsuario;
	let instrucaoSql = `select * from usuario where idUsuario = ${idUsuario}`;

	sequelize.query(instrucaoSql, {
		model: Usuario,
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

/* Cadastrar usuário */
router.post('/sign', function (req, res, next) {
	Usuario.create({
		nome: req.body.nome,
		email: req.body.email,
		login: req.body.user_login,
		senha: req.body.senha,
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* Verificação de usuário */
router.get('/session/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);

	let tem_sessao = false;
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}

});


/* Logoff de usuário */
router.get('/exit/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function (req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

// Definir instrumento favorito do usuário
router.post("/saveInstrument/:idUsuario/:instrumentoUsuario", (req, res, next) => {
	let idUsuario = req.params.idUsuario;
	let instrumento = req.params.instrumentoUsuario;

	let sqlInstruction;

	sqlInstruction = `update usuario set fkInstrumentoFavorito = ${instrumento} where idUsuario = ${idUsuario};`;

	sequelize.query(sqlInstruction).then(resultado => {
		res.send(resultado);
		console.log(`\n\nRegistro inserido com sucesso!\nO comando executado foi como abaixo:\n`);
		console.log(sqlInstruction);
		console.log(`\nFim do comando SQL executado.`);
		response.status(200).send("Dado inserido com sucesso.");
	}).catch(erro => {
		// res.send(resultado);
		// console.error(erro);
		// response.status(500).send(erro.message);
	});
});

// Definir instrumento estilo do usuário
router.post("/saveStyle/:idUsuario/:estiloUsuario", (req, res, next) => {
	let idUsuario = req.params.idUsuario;
	let estilo = req.params.estiloUsuario;

	let sqlInstruction;

	sqlInstruction = `update usuario set fkEstiloFavorito = ${estilo} where idUsuario = ${idUsuario};`;

	sequelize.query(sqlInstruction).then(resultado => {
		res.send(resultado);
		console.log(`\n\nRegistro inserido com sucesso!\nO comando executado foi como abaixo:\n`);
		console.log(sqlInstruction);
		console.log(`\nFim do comando SQL executado.`);
		res.status(200).send("Dado inserido com sucesso.");

	}).catch(erro => {
		// console.error(erro);
	});
});

module.exports = router;
