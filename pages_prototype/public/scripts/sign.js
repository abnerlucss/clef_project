// Variáveis globais
var instrumento;
var estilo;

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
    // Portanto eu pego cada elemento da lista e configuro o texto para 'favorite_border'
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

function favorite_genre_interface(context) {
    //Antes de tudo: pego o elemento pai do contexto e todas as tags span do elemento pai
    let parent = context.parentNode;
    //Pegando os elementos filhos
    let cards = parent.children;

    for (let elem of cards) {
        elem.style.border = 'none';
    }

    context.style.border = 'solid 3px var(--black)';

    return estilo = context.className.split(' ')[1];
}

function save_data_instrument() {
    if (instrumento == undefined) {
        alert('Selecione um instrumento');
    } else {
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

function finalize_sign() {
    if (estilo == null) {
        alert('Por favor selecione um estilo');
    }
    else {
        dataUser = sessionStorage.getItem('data_user');
        dataUser = JSON.parse(dataUser);

        dataUser.estilo_favorito = estilo;

        let signData = new URLSearchParams(dataUser);
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
}

function save_data_login() {
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

    // var formData = {};

    // form.forEach((value, attribute) => {
    //     formData[attribute] = value;
    // });

    // formData = JSON.stringify(formData);

    // sessionStorage.setItem('data_user', formData);

    // // Replace impede que o usuário volte para a página anterior
    // 
}




// LOADS 
function active_load() {
    btn_sign.disabled = true;
    loadGif.style.visibility = 'visible';

}

function finalize_load() {
    btn_sign.disabled = false;
    loadGif.style.visibility = 'hidden';
    error_msg.style.display = 'block';

}