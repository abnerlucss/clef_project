// Variável global
var favorite_instrument;

// Função acionada pelo onClick que recebe o contexto(objeto) do elemento como parâmetro
function favorite(context) {
    //Antes de tudo: pego o elemento pai do contexto e todas as tags span do elemento pai
    var parent = context.parentNode;

    //Pegando os elementos filhos
    var cards = parent.children;

    // Isso gera uma lista de elementos html
    // Portanto eu pego cada elemento da lista e configuro o texto para 'favorite_border'
    // Desse modo, reseto o ícone para o coração sem preenchimento, tal como a borda
    for (let elem of cards) {
        elem.style.border = 'none';
        elem.querySelector('.material-icons').innerHTML = 'favorite_border';
    }
    // Altera o texto do elemento selecionado(context)
    context.querySelector('.material-icons').innerHTML = 'favorite';
    context.style.border = 'solid 5px var(--white)';

    return favorite_instrument = context.className.split(' ')[1];
}

function set_as_favorite() {
    if (favorite_instrument == null) {
        alert('Selecione o instrumento');
    }
    else {
        fetch("/users/set_as_favorite", {
            method: "POST",
            body: null
        }).then(response => {

            if (response.ok) {

                response.json().then(json => {

                    console.log(json[0]);
                    
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
}