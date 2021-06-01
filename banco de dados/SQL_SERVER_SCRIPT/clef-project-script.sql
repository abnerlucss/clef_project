create table instrumento(
	idInstrumento int primary key identity,
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


create table estilo(
	idEstilo int primary key identity,
    nomeEstilo varchar(50)
);

insert into estilo values
	(null,'Jazz'),
	(null,'Samba'),
	(null,'Bossa Nova'),
	(null,'Reggae'),
	(null,'Eletrônica'),
	(null,'Pop'),
	(null,'Mpb'),
	(null,'Latina'),
	(null,'Rock'),
	(null,'Forró'),
	(null,'Heavy Metal'),
	(null,'Funk'),
	(null,'Gospel'),
	(null,'Axé'),
	(null,'Funk'),
	(null,'Instrumental'),
	(null,'Clássica'),
	(null,'Blues'),
	(null,'K-POP'),
	(null,'Rock Alternativo'),
	(null,'Hip Hop'),
	(null,'Pagode'),
	(null,'Sertaneja'),
	(null,'Épica'),
	(null,'R&B'),
	(null,'SoundTrack');

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY identity,
	nome VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
	login VARCHAR(50) unique NOT NULL,
	senha VARCHAR(50) NOT NULL,
    fkEstiloFavorito INT,
    foreign key(fkEstiloFavorito) references estilo(idEstilo)
);

create table instrumentoUsuario(
	fkUsuario int,
    foreign key(fkUsuario) references usuario(idUsuario),
    fkInstrumento int,
    foreign key(fkInstrumento) references instrumento(idInstrumento),
    dataFavoritado datetime default current_timestamp
);

create table post(
	idPost int primary key identity,
    titulo varchar(50) not null,
    texto varchar(1500) not null,
    dataPost datetime default current_timestamp,
    fkUsuario int,
    foreign key(fkUsuario) references Usuario(idUsuario)
);


select * from usuario;
select * from instrumento;
select * from estilo;
select * from post;
select * from instrumentoUsuario;


select post.*, usuario.nome from post join usuario on fkUsuario = idUsuario;
    
select count(idEstilo) as 'escolhas', nomeEstilo from estilo join usuario on idEstilo = fkestiloFavorito
	group by nomeEstilo;
    
select count(fkInstrumento) as 'escolhas', nomeInstrumento from instrumentoUsuario join instrumento on fkInstrumento = idInstrumento group by nomeInstrumento;

select * from usuario;

insert into estilo values 
	(null,'Country');
    
    
exec sp_columns usuario;
exec sp_columns instrumentoUsuario;



insert into usuario values 
	(null,'Abner Lucas','abnerlusantos@gmail.com','abner','urubu100',null);
    
insert into instrumentoUsuario values
	(1,4,default);
    
select * from instrumentoUsuario;
select * from instrumento;

select u.nome, i.nomeInstrumento from usuario as u join instrumentoUsuario as iu on u.idUsuario = iu.fkUsuario
	join instrumento as i on iu.fkInstrumento = i.idInstrumento;
    
    
select fkInstrumento from usuario join instrumentoUsuario on fkUsuario = idUsuario where idUsuario = 2;
