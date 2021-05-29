create table instrumento(
	idInstrumento int primary key identity,
    nomeInstrumento varchar(45),
    srcImg varchar(150)
);

insert into instrumento values
	('Piano','./img/instruments/piano.jpg'),
	('Guitarra','./img/instruments/guitarra.jpg'),
	('Contrabaixo','./img/instruments/bass.jpg'),
	('Bateria','./img/instruments/drums.jpg'),
	('Saxofone','./img/instruments/sax.jpg'),
	('Violino','./img/instruments/violin.jpg'),
	('Flauta','./img/instruments/flauta.jpg'),
	('Violão','./img/instruments/acoustic-guitar.jpg');


SELECT * FROM instrumento;

create table estilo(
	idEstilo int primary key identity,
    nomeEstilo varchar(50)
);

SELECT * FROM usuario;


insert into estilo values
	('Jazz'),
	('Samba'),
	('Bossa Nova'),
	('Reggae'),
	('Eletrônica'),
	('Pop'),
	('Mpb'),
	('Latina'),
	('Rock'),
	('Forró'),
	('Heavy Metal'),
	('Funk'),
	('Gospel'),
	('Axé'),
	('Funk'),
	('Instrumental'),
	('Clássica'),
	('Blues'),
	('K-POP'),
	('Rock Alternativo'),
	('Hip Hop'),
	('Pagode'),
	('Sertaneja'),
	('Épica'),
	('R&B'),
	('SoundTrack');

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY identity,
	nome VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
	login VARCHAR(50) unique NOT NULL,
	senha VARCHAR(50) NOT NULL,
    fkInstrumentoFavorito INT,
    foreign key(fkInstrumentoFavorito) references instrumento(idInstrumento),
    fkEstiloFavorito INT,
    foreign key(fkEstiloFavorito) references estilo(idEstilo)
);

select * from usuario;


create table post(
	idPost int primary key identity,
    titulo varchar(50) not null,
    texto varchar(1500) not null,
    dataPost datetime default current_timestamp,
    fkUsuario int,
    foreign key(fkUsuario) references Usuario(idUsuario)
);

select count(instrumento.idInstrumento) as 'escolhas', nomeInstrumento from instrumento inner join usuario on instrumento.idInstrumento = usuario.fkInstrumentoFavorito
	group by nomeInstrumento;

select count(idEstilo) as 'escolhas', nomeEstilo from estilo join usuario on idEstilo = fkestiloFavorito
	group by nomeEstilo;

