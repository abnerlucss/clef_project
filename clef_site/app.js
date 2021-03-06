process.env.NODE_ENV = 'dev'; // altere para 'production' ou 'dev'

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usuariosRouter = require('./routes/users');
var instrumentosRouter = require('./routes/instruments');
var estilosRouter = require('./routes/musicStyles');
var postagensRouter = require('./routes/posts');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usuariosRouter);
app.use('/instruments', instrumentosRouter);
app.use('/musicStyles', estilosRouter);
app.use('/posts', postagensRouter);

module.exports = app;
