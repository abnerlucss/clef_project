use projeto_site;

show tables;

select * from usuario;
select * from instrumento_favorito;

create table instrumento(
	idInstrumento int primary key auto_increment,
    nomeInstrumento varchar(45),
    srcImg varchar(150)
);

insert into instrumento values
	(null,'Piano','./img/instruments/piano.jpg'),
	(null,'Guitarra','./img/instruments/guitarra.jpg'),
	(null,'Contrabaixo','./img/instruments/bass.jpg'),
	(null,'Bateria','./img/instruments/drums.jpg'),
	(null,'Saxofone','./img/instruments/sax.jpg'),
	(null,'Violino','./img/instruments/violin.jpg'),
	(null,'Flauta','./img/instruments/flauta.jpg'),
	(null,'Violão','./img/instruments/acoustic-guitar.jpg');

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	login VARCHAR(50) NOT NULL,
	senha VARCHAR(50) NOT NULL,
    fkInstrumentoFavorito VARCHAR(50),
    fkEstiloFavorito VARCHAR(50)
);

select * from usuario;
select * from instrumento_favorito;
