function login() {
    active_load();

    let form = new URLSearchParams(new FormData(form_login));
    fetch("/users/authenticate", {
        method: "POST",
        body: form
    }).then(response => {

        if (response.ok) {

            response.json().then(json => {

                sessionStorage.login_usuario_meuapp = json.login;
                sessionStorage.id_usuario_meuapp = json.idUsuario;
                sessionStorage.nome_usuario_meuapp = json.nome;

                checkInstrumento(sessionStorage.id_usuario_meuapp);
        });

} else {

    console.log('Erro de login!');

    response.text().then(error_desc => {
        console.error(error_desc);
        finalize_load(error_desc);
    });
}
    });

return false;
}

// Função que quando chamada faz a requisição para saber se o usuário já selecionou o instrumento
function checkInstrumento(userId) {

    fetch(`/users/checkInstrument/${userId}`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    var recoveryData = JSON.parse(JSON.stringify(resposta));

                    if (recoveryData[0].fkInstrumentoFavorito == null) {
                        window.location.replace('instrument_select.html');
                    }
                    else {
                        checkStyle(userId);
                    }
                });
            } else {
                console.log(resposta);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos instrumentos do usuário: ${error.message}`);
        });

    // window.location.replace('posts.html');
}

// Função que quando chamada faz a requisição para saber se o usuário já selecionou o estilo
function checkStyle(userId) {

    fetch(`/users/checkStyle/${userId}`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    var recoveryData = JSON.parse(JSON.stringify(resposta));

                    if (recoveryData[0].fkEstiloFavorito == null) {
                        window.location.replace('musical_genres.html');
                    }
                    else {
                        window.location.replace('posts.html')
                    }
                });
            } else {
                console.log(resposta);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos instrumentos do usuário: ${error.message}`);
        });

}



// LOADS 
function active_load() {
    btn_login.disabled = true;
    loadGif.style.visibility = 'visible';

}

function finalize_load(response) {
    btn_login.disabled = false;
    loadGif.style.visibility = 'hidden';
    error_msg.style.display = 'block';
    error_msg.innerHTML = response;
}