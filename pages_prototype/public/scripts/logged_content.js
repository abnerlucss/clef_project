var username = sessionStorage.nome_usuario_meuapp;
var user_login = sessionStorage.login_usuario_meuapp;

function redirect_login() {
    window.location.href = 'login.html';
}

function check_authenticate() {
    if (user_login == undefined) {
        redirect_login();
    } else {
        validate_session();
    }

}

function loadRankings() {
    check_authenticate();
    loadChartInstrument();
    loadChartStyle();
}

function loadPosts() {
    check_authenticate();
    span_username.innerHTML = username;
    loadContent();
}

function log_out() {
    finalize_session();
    sessionStorage.clear();
    redirect_login();
}

function validate_session() {
    fetch(`/users/session/${user_login}`, { cache: 'no-store' })
        .then(resposta => {
            if (resposta.ok) {
                resposta.text().then(texto => {
                    console.log('Sessão :) ', texto);
                });
            } else {
                console.error('Sessão :.( ');
                log_out();
            }
        });
}

function finalize_session() {
    fetch(`/users/exit/${user_login}`, { cache: 'no-store' });
}

