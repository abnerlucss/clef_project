// FUNÇÃO QUE FAZ A REQUISIÇÃO DOS INSTRUMENTOS FAVORITOS NO BANCO E JÁ COLOCA A RESPOSTA NO GRÁFICO DE MANEIRA DINÂMICA
function loadChartInstrument() {
    fetch("/instruments/rankingInstruments")
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {

                    let instrumentos = [];
                    let escolhas = [];

                    for (let i = 0; i < resposta.length; i++) {
                        instrumentos.push(resposta[i].nomeInstrumento);
                        escolhas.push(resposta[i].escolhas);
                    }

                    let context = document.getElementById('instrumentChart').getContext('2d');
                    let instrumentChart = new Chart(context, {
                        type: 'bar',
                        data: {
                            labels: instrumentos,
                            datasets: [{
                                label: 'Instrumentos',
                                data: escolhas,
                                backgroundColor: generateRandomColors(instrumentos)
                            }]
                        }
                        ,
                        options: {
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Instrumentos favoritos dos usuários',
                                    padding: 20,
                                    font: {
                                        size: 24
                                    }
                                },
                                legend: {
                                    display: false,
                                    position: 'bottom'
                                },
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }
                    })
                    Chart.defaults.font.size = 15;
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

// FUNÇÃO QUE FAZ A REQUISIÇÃO DOS ESTILOS FAVORITOS NO BANCO E JÁ COLOCA A RESPOSTA NO GRÁFICO DE MANEIRA DINÂMICA
function loadChartStyle() {
    fetch("/musicStyles/rankingStyles")
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(function (resposta) {

                    let estilos = [];
                    let escolhas = [];

                    for (let i = 0; i < resposta.length; i++) {
                        estilos.push(resposta[i].nomeEstilo);
                        escolhas.push(resposta[i].escolhas);
                    }

                    let context = document.getElementById('styleChart').getContext('2d');
                    let styleChart = new Chart(context, {
                        type: 'bar',
                        data: {
                            labels: estilos,
                            datasets: [{
                                label: 'Estilos',
                                data: escolhas,
                                backgroundColor: generateRandomColors(estilos)
                            }]
                        }
                        ,
                        options: {
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Estilos favoritos dos usuários',
                                    padding: 20,
                                    font: {
                                        size: 24
                                    }
                                },
                                legend: {
                                    display: false,
                                    position: 'bottom'
                                },
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        stepSize: 1
                                    }
                                }
                            }
                        }
                    })
                    Chart.defaults.font.size = 15;
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados: ${error.message}`);
        });
}

function generateRandomColors(array) {
    let colors = ['#f9ca24', '#f0932b', '#686de0', '#40739e', '#fff200', '#535c68', '#22a6b3', '#be2edd', '#6ab04c', '#eb4d4b', '#badc58', '#e056fd', '#ffbe76', '#44bd32', '#ffb8b8'];

    let randomColors = [];
    for (let i = 0; i < array.length; i++) {
        let numRandom = parseInt(Math.random() * colors.length);
        randomColors.push(colors[numRandom]);
        colors.splice(numRandom, 1);
    }
    return randomColors;
}