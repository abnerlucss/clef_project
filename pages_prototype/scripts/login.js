function login() {
    active_load();

    let form = new URLSearchParams(new FormData(form_login));
    fetch("/users/authenticate", {
        method: "POST",
        body: form
    }).then(response => {

        if (response.ok) {

            response.json().then(json => {

                sessionStorage.login_usuario_meuapp = json.user_login;
                sessionStorage.nome_usuario_meuapp = json.nome;

                // window.location.href = 'tempo-real.html';
                alert('Funcionei');
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