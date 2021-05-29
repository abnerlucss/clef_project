use projeto_site;

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


create table estilo(
	idEstilo int primary key auto_increment,
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
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
    email VARCHAR(80) NOT NULL,
	login VARCHAR(50) unique NOT NULL,
	senha VARCHAR(50) NOT NULL,
    fkEstiloFavorito INT,
    foreign key(fkEstiloFavorito) references estilo(idEstilo)
);

create table favoritarInstrumento(
	fkUsuario int,
    foreign key(fkUsuario) references usuario(idUsuario),
    fkInstrumento int,
    foreign key(fkInstrumento) references instrumento(idInstrumento),
    dataFavoritado datetime default current_timestamp
);

create table post(
	idPost int primary key auto_increment,
    titulo varchar(50) not null,
    texto varchar(1500) not null,
    dataPost datetime default current_timestamp,
    fkUsuario int,
    foreign key(fkUsuario) references Usuario(idUsuario)
);

alter table post modify texto varchar(1500);



select * from usuario;
select * from instrumento;
select * from estilo;
select * from post;
select post.*, usuario.nome from post join usuario on fkUsuario = idUsuario;


    
update usuario set fkInstrumentoFavorito = 2 where idUsuario = 1;


select idInstrumento, nomeInstrumento from instrumento join usuario on idInstrumento = fkInstrumentoFavorito;


select count(instrumento.idInstrumento) as 'escolha', nomeInstrumento from instrumento inner join usuario on instrumento.idInstrumento = usuario.fkInstrumentoFavorito
	group by nomeInstrumento;

    
select count(idEstilo) as 'escolhas', nomeEstilo from estilo join usuario on idEstilo = fkestiloFavorito
	group by nomeEstilo;
    
select count(fkInstrumento) as 'escolhas', nomeInstrumento from favoritarInstrumento join instrumento on fkInstrumento = idInstrumento group by nomeInstrumento;

select * from usuario;

insert into estilo values 
	(null,'Country');
    
    
desc usuario;
desc favoritarInstrumento;



insert into usuario values 
	(null,'Abner Lucas','abnerlusantos@gmail.com','abner','urubu100',null);
    
insert ignore into favoritarInstrumento values
	(1,4,default);
    
select * from favoritarInstrumento;
select * from instrumento;

select u.nome, i.nomeInstrumento from usuario as u join favoritarInstrumento as fav on u.idUsuario = fav.fkUsuario
	join instrumento as i on fav.fkInstrumento = i.idInstrumento;
    
    
select fkInstrumento from usuario join favoritarInstrumento on fkUsuario = idUsuario where idUsuario = 3;

