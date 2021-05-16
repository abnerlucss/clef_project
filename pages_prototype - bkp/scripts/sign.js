// CADASTRAR
function sign() {
    active_load();
    let form = new URLSearchParams(new FormData(form_sign));

    fetch("/users/sign", {
        method: "POST",
        body: form
    }).then(function (response) {

        if (response.ok) {

            window.location.href = '../login.html';

        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (error_desc) {
                error_msg.innerHTML = error_desc;
            });

            finalize_load();
        }
    });

    return false;
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