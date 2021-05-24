var instrumento;
var estilo;

// FUNÇÃO QUE FAZ A REQUISIÇÃO DE TODOS OS INSTRUMENTOS CADASTRADOS NO BANCO 
function loadInstruments() {
    fetch("/instruments")
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    generateInstrumentLayout(resposta);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                finalizarAguardar("Nenhum resultado encontrado ou erro na API");
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção das publicações: ${error.message}`);
        });
}

// FUNÇÃO QUE FAZ A REQUISIÇÃO DE TODOS OS ESTILOS CADASTRADOS NO BANCO 
function loadStyles() {
    fetch("/musicStyles")
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    generateStyleLayout(resposta);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');

            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção das publicações: ${error.message}`);
        });
}

// FUNÇÃO QUE CRIA O LAYOUT DINÂMICO AO RECEBER OS PARÂMETROS(ESTILOS)
function generateStyleLayout(musicStyles) {
    var selection_style = document.getElementById("selection-genres");
    selection_style.innerHTML = "";

    for (let i = 0; i < musicStyles.length; i++) {
        var style = musicStyles[i];

        var card_style = document.createElement("div");

        card_style.className = `card-selection ${style.idEstilo}`;
        card_style.innerHTML = `${style.nomeEstilo}`;
        selection_style.appendChild(card_style);
    }

    var cards = selection_style.children;
    for (let item of cards) {
        item.addEventListener('click', () => {
            favorite_style_interface(item);
        });
    }

    var cores = ['#f9ca24', '#f0932b', '#686de0', '##40739e', '##fff200', '#535c68', '#22a6b3', '#be2edd', '#6ab04c', '#eb4d4b', '#badc58', '#e056fd', '#ffbe76', '#44bd32', '#ffb8b8'];

    for (let card of document.querySelectorAll('.card-selection')) {
        var num_random = parseInt(Math.random() * cores.length);
        card.style.backgroundColor = cores[num_random];
    }
}

// FUNÇÃO QUE CRIA O LAYOUT DINÂMICO AO RECEBER OS PARÂMETROS(INSTRUMENTOS)
function generateInstrumentLayout(instruments) {
    var selection_instrument = document.getElementById("selection-instrument");
    selection_instrument.innerHTML = "";

    for (let i = 0; i < instruments.length; i++) {
        var instrument = instruments[i];

        var card_instrument = document.createElement("div");
        card_instrument.className = `card-selection ${instrument.idInstrumento}`;
        card_instrument.style.backgroundImage = `url(${instrument.srcImg})`;
        card_instrument.innerHTML = `${instrument.nomeInstrumento}`;
        selection_instrument.appendChild(card_instrument);

        var favorite_icon = document.createElement("span");
        favorite_icon.className = 'material-icons';
        favorite_icon.innerHTML = 'favorite_border';

        card_instrument.appendChild(favorite_icon);
    }

    var cards = selection_instrument.children;
    for (let item of cards) {
        item.addEventListener('click', () => {
            favorite_instrument_interface(item);
        });
    }
}

// Função acionada pelo onClick que recebe o contexto(objeto) do elemento como parâmetro
function favorite_instrument_interface(context) {
    //Antes de tudo: pego o elemento pai do contexto e todas as tags span do elemento pai
    let parent = context.parentNode;

    //Pegando os elementos filhos
    let cards = parent.children;

    // Isso gera uma lista de elementos html
    // Portanto eu seleciono cada elemento da lista e configuro o texto para 'favorite_border'
    // Desse modo, reseto o ícone para o coração sem preenchimento, tal como a borda
    for (let elem of cards) {
        elem.style.border = 'none';
        elem.querySelector('.material-icons').innerHTML = 'favorite_border';
    }
    // Altera o texto do elemento selecionado(context)
    context.querySelector('.material-icons').innerHTML = 'favorite';
    context.style.border = 'solid 3px var(--white)';

    return instrumento = context.className.split(' ')[1];
}

function favorite_style_interface(context) {
    //Antes de tudo: seleciono o elemento pai do contexto e todas as tags span do elemento pai
    let parent = context.parentNode;
    //Pegando os elementos filhos
    let cards = parent.children;

    for (let elem of cards) {
        elem.style.border = 'none';
    }

    context.style.border = 'solid 3px var(--black)';

    return estilo = context.className.split(' ')[1];
}

// FAZ A REQUISIÇÃO PARA ARMAZENAR NO BANCO O INSTRUMENTO ESCOLHIDO
function save_data_instrument() {
    if (instrumento == undefined) {
        alert('Selecione um instrumento');
    } else {
        active_load_gif();
        disableButton(document.getElementById('btn_save_instrument'));
        fetch(`/users/saveInstrument/${sessionStorage.id_usuario_meuapp}/${instrumento}`, {
            method: "POST",
        }).then(function (response) {

            if (response.ok) {
                console.log(response);
                window.location.replace('musical_genres.html');
            } else {

                console.log('Erro de cadastro!');
                response.text().then(function (error_desc) {
                    error_msg.innerHTML = error_desc;
                });

            }
        });

        return false;
    }
}

// FAZ A REQUISIÇÃO PARA ARMAZENAR NO BANCO O ESTILO ESCOLHIDO
function save_data_style() {
    if (estilo == null) {
        alert('Por favor selecione um estilo');
    }
    else {
        active_load_gif();
        disableButton(document.getElementById('btn_save_style'));
        fetch(`/users/saveStyle/${sessionStorage.id_usuario_meuapp}/${estilo}`, {
            method: "POST",
        }).then(function (response) {

            if (response.ok) {
                window.location.replace('posts.html');
            } else {
                console.log('Erro de cadastro!');
                response.text().then(function (error_desc) {
                    error_msg.innerHTML = error_desc;
                });

            }
        });

        return false;
    }
}

// FAZ A REQUISIÇÃO PARA ARMAZENAR NO BANCO OS DADOS DE LOGIN
function save_data_login() {
    active_load_gif();
    disableButton(document.getElementById('btn_sign'));
    let signData = new URLSearchParams(new FormData(form_sign));
    fetch("/users/sign", {
        method: "POST",
        body: signData
    }).then(function (response) {

        if (response.ok) {
            console.log(response);
            window.location.replace('login.html');

        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (error_desc) {
                error_msg.innerHTML = error_desc;
            });

        }
    });

    return false;

}