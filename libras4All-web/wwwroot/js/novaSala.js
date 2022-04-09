var url = "https://libras4all.herokuapp.com/api/";

var token;
var id;
var jogoSelecionado = null;

var quantidadePerguntas = [];


$(document).ready(function () {
    if (localStorage.getItem('user_token') == null) {
        alert("ATENÇÃO!! Você precisa estar logado para acessar está página");
        window.location = "https://libras4all-web.herokuapp.com/Login";
    }

    id = localStorage.getItem('user_id').replaceAll("\"", "");
    token = localStorage.getItem('user_token').replaceAll("\"", "");

    obterQuantidadePerguntas('História')
    obterQuantidadePerguntas('Alfabeto');
    obterQuantidadePerguntas('Numerais');
    obterQuantidadePerguntas('Saudações');
    obterQuantidadePerguntasCustomizadas();
});

function obterQuantidadePerguntas(categoria) {
    $.ajax({
        type: "GET",
        url: url + "pergunta/obterQuantidade/" + categoria,
        headers: {
            Authorization: 'Bearer ' + token
        },
        cache: false,
        async: false
    })
        .done(function (data) {
            quantidadePerguntas.push(data.quantidade);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao carregar as perguntas!");
        });
}

function obterQuantidadePerguntasCustomizadas() {
    $.ajax({
        type: "GET",
        url: url + "pergunta/obterQuantidadeCustomizada/" + id,
        headers: {
            Authorization: 'Bearer ' + token
        },
        cache: false
    })
        .done(function (data) {
            quantidadePerguntas.push(data.quantidade);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao carregar as perguntas!");
        });
}

$(".quantidade .menos").click(function () {
    var valor = $(this).parent().find("label").text()
    if (valor > 0) {
        var valorfinal = parseInt(valor) - 1;
        $(this).parent().find("label").text(valorfinal);
    }
});

$(".quantidade .maisHistoria").click(function () {
    var valor = $(this).parent().find("label").text()
    if (valor < parseInt(quantidadePerguntas[0])) {
        var valorfinal = parseInt(valor) + 1;
        $(this).parent().find("label").text(valorfinal);
    }
});

$(".quantidade .maisAlfabeto").click(function () {
    var valor = $(this).parent().find("label").text()
    if (valor < parseInt(quantidadePerguntas[1])) {
        var valorfinal = parseInt(valor) + 1;
        $(this).parent().find("label").text(valorfinal);
    }
});

$(".quantidade .maisNumerais").click(function () {
    var valor = $(this).parent().find("label").text()
    if (valor < parseInt(quantidadePerguntas[2])) {
        var valorfinal = parseInt(valor) + 1;
        $(this).parent().find("label").text(valorfinal);
    }
});

$(".quantidade .maisSaudacoes").click(function () {
    var valor = $(this).parent().find("label").text()
    if (valor < parseInt(quantidadePerguntas[3])) {
        var valorfinal = parseInt(valor) + 1;
        $(this).parent().find("label").text(valorfinal);
    }
});

$(".quantidade .maisCustomizadas").click(function () {
    var valor = $(this).parent().find("label").text()
    if (valor < parseInt(quantidadePerguntas[4])) {
        var valorfinal = parseInt(valor) + 1;
        $(this).parent().find("label").text(valorfinal);
    }
});

function jogoEscolhido(jogo) {
    jogoSelecionado = jogo;
      document.getElementById("txtjogo").value = jogo;
}



function verificarPerguntasSelecionadas() {
    return document.getElementById('txtQtdHistoria').textContent == "0" &&
        document.getElementById('txtQtdAlfabeto').textContent == "0" &&
        document.getElementById('txtQtdNumerais').textContent == "0" &&
        document.getElementById('txtQtdSaudacoes').textContent == "0" &&
        document.getElementById('txtQtdCustomizadas').textContent == "0";
}

function cadastrarSala() {
    if ($('#txtDescricao').val().trim() == undefined || $('#txtDescricao').val().trim() == null || $('#txtDescricao').val().trim() == '' || jogoSelecionado == null || (jogoSelecionado == "Quiz" && verificarPerguntasSelecionadas())) {
        alert('Preencha todos os campos!')
    }
    else {
        var sala = {};
        sala.descricao = $('#txtDescricao').val();
        sala.tipoJogo = jogoSelecionado;
        sala.idProfessor = id;
        $.ajax({
            type: "POST",
            url: url + "sala",
            data: sala,
            headers: {
                Authorization: 'Bearer ' + token
            },
            cache: false
        })
            .done(function (data) {
                cadastrarItens(data[0]._id);
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Erro ao cadastrar a sala!");
            });
    }
}

function cadastrarItens(idSala) {
    if (jogoSelecionado === "Quiz") {
        cadastrarQuiz(idSala);
    }
    else if (jogoSelecionado === "Meteoro") {
        cadastrarMeteoro(idSala);
    }
    else if (jogoSelecionado === "Mestre Mandou") {
        cadastrarMestreMandou(idSala);
    }
}

function cadastrarQuiz(idSala) {
    var quiz = {};
    quiz.idSala = idSala;
    quiz.perguntas = preencherPerguntas();

    $.ajax({
        type: "POST",
        url: url + "quiz",
        data: quiz,
        headers: {
            Authorization: 'Bearer ' + token
        },
        cache: false
    })
        .done(function (data) {
            alert("Sala cadastrada com sucesso!");
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao cadastrar o quiz!");
        });
}

function preencherPerguntas() {
    var jsonPerguntas = [];

    jsonPerguntas.push(preencherQuantidadePerguntas('História', document.getElementById('txtQtdHistoria').textContent));
    jsonPerguntas.push(preencherQuantidadePerguntas('Alfabeto', document.getElementById('txtQtdAlfabeto').textContent));
    jsonPerguntas.push(preencherQuantidadePerguntas('Numerais', document.getElementById('txtQtdNumerais').textContent));
    jsonPerguntas.push(preencherQuantidadePerguntas('Saudações', document.getElementById('txtQtdSaudacoes').textContent));
    jsonPerguntas.push(preencherQuantidadePerguntas('Customizada', document.getElementById('txtQtdCustomizadas').textContent));

    return jsonPerguntas;
}

function preencherQuantidadePerguntas(classe, quantidade) {
    var perguntas = {};
    perguntas.classe = classe;
    perguntas.quantidade = quantidade;
    return perguntas;
}

function cadastrarMeteoro(idSala) {
    var meteoro = {};
    meteoro.idSala = idSala;

    $.ajax({
        type: "POST",
        url: url + "meteoro",
        data: meteoro,
        headers: {
            Authorization: 'Bearer ' + token
        },
        cache: false
    })
        .done(function (data) {
            alert("Sala cadastrada com sucesso!");
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao cadastrar o meteoro!");
        });
}

function cadastrarMestreMandou(idSala) {
    var mestreMandou = {};
    mestreMandou.idSala = idSala;

    $.ajax({
        type: "POST",
        url: url + "mestreMandou",
        data: mestreMandou,
        headers: {
            Authorization: 'Bearer ' + token
        },
        cache: false
    })
        .done(function (data) {
            alert("Sala cadastrada com sucesso!");
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao cadastrar o Mestre Mandou!");
        });
}

function preencherAlternativas() {
    var alternativas = [];
    alternativas.push(carregarAlternativa($('#txtPrimeiraAlternativa').val(), document.getElementById('primeira').checked));
    alternativas.push(carregarAlternativa($('#txtSegundaAlternativa').val(), document.getElementById('segunda').checked));
    alternativas.push(carregarAlternativa($('#txtTerceiraAlternativa').val(), document.getElementById('terceira').checked));
    return alternativas;
}

function carregarAlternativa(texto, alternativaCorreta) {
    var alternativa = {};
    alternativa.texto = texto;
    alternativa.perguntaCorreta = alternativaCorreta;
    return alternativa;
}

function cadastrarPergunta() {
    if ($('#txtDescricaoPergunta').val().trim() == '' || $('#txtPrimeiraAlternativa').val().trim() == '' || $('#txtSegundaAlternativa').val().trim() == '' || $('#txtTerceiraAlternativa').val().trim() == '') {
        alert('Preencha todos os campos!')
    }
    else if ((!document.getElementById('primeira').checked && !document.getElementById('segunda').checked && !document.getElementById('terceira').checked))
            document.getElementById('span').style.display = 'block';
    else {
        document.getElementById('span').style.display = 'none';
        var pergunta = {};
        pergunta.descricao = $('#txtDescricaoPergunta').val();
        pergunta.classe = "Customizada";
        pergunta.idProfessor = id;
        pergunta.caminhoImagem = null;
        pergunta.alternativas = preencherAlternativas();

        $.ajax({
            type: "POST",
            url: url + "pergunta",
            data: pergunta,
            headers: {
                Authorization: 'Bearer ' + token
            },
            cache: false
        })
            .done(function (data) {
                quantidadePerguntas[4] = quantidadePerguntas[4] + 1;              
  
                document.getElementById('txtDescricaoPergunta').value = '';
                document.getElementById('txtPrimeiraAlternativa').value = '';
                document.getElementById('txtSegundaAlternativa').value = '';
                document.getElementById('txtTerceiraAlternativa').value = '';

                document.getElementById('primeira').checked = false;
                document.getElementById('segunda').checked = false;
                document.getElementById('terceira').checked = false;

                alert("Pergunta cadastrada com sucesso!");
            }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Erro ao cadastrar a pergunta!");
            });
    }
}

