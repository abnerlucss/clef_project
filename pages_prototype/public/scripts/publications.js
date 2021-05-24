// FAZ A REQUISIÇÃO PARA ADICIONAR UM POST
function addPost() {
    lightbox_activate();
}

function upload() {
    var postForm = new URLSearchParams(new FormData(post_form));
    var idUsuario = sessionStorage.id_usuario_meuapp;
    fetch(`/posts/addPost/${idUsuario}`, {
        method: "POST",
        body: postForm
    }).then(resposta => {
        if (resposta.ok) {
            loadContent();
            closeAddPost();
        } else {
            console.log('Erro ao postar!');
            resposta.text().then(texto => {
                console.error(texto);
            });
        }
    });

    // return false;
}


function lightbox_activate() {
    var close_icon = document.getElementById('modal_bg');
    close_icon.style.display = 'flex';
}

function closeAddPost() {
    var close_icon = document.getElementById('modal_bg');
    title_input.value = ''; 
    text_input.value = ''; 
    close_icon.style.display = 'none';
}

function loadContent() {
    fetch("/posts")
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    // console.log(resposta);
                    generatePostLayout(resposta);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção das publicações: ${error.message}`);
        });
}

function generatePostLayout(Response) {
    var main_content = document.getElementById("main_content");
    main_content.innerHTML = "";

    for (let i = 0; i < Response.length; i++) {
        var post = Response[i];

        var post_card = document.createElement("div");
        post_card.className = 'post-card';
        main_content.appendChild(post_card);

        var post_title = document.createElement("div");
        post_title.className = 'post-title';
        post_title.innerHTML = post.titulo;
        post_card.appendChild(post_title);

        var post_username = document.createElement("div");
        post_username.className = 'post-username';
        post_username.innerHTML = post.nome;
        post_card.appendChild(post_username);

        var post_date = document.createElement("div");
        post_date.className = 'post-username';
        post_date.innerHTML = parseDate(post.dataPost);
        post_card.appendChild(post_date);

        var post_text = document.createElement("div");
        post_text.className = 'post-text';
        post_text.innerHTML = post.texto;
        post_card.appendChild(post_text);

    }

}


function parseDate(isoDate) {
    let date = new Date(isoDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let hr = date.getHours();
    let min = date.getMinutes();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }

    return `${dt}/${month}/${year}  -  ${hr}:${min}`;
}