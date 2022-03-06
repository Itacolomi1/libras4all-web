var token = localStorage.getItem('user_token').replaceAll("\"", "");
var id = localStorage.getItem('user_id').replaceAll("\"", "");
const urlParams = new URLSearchParams(window.location.search);
const idSala = urlParams.get('Id');
var url = "https://libras4all.herokuapp.com/api/"
var dadosCompletos = [];
var itens = [];
var itensCompletos = [];
var sala = {};
var tabelaItem;


$(document).ready(function () {
    
    buscarSala();
    buscarRanking();
    buscarItens();
});

async function buscarSala() {
   await $.ajax({
        type: "GET",
        url: url + "sala/" + idSala,
        cache: false,
        async: false,
        headers: {
            Authorization: 'Bearer ' + token
        },
     
    })
        .done(function (data) {
            sala = data;
            $('#txtSala').text(data.descricao);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao buscar a sala!");
        });
}

async function buscarItens() {
 await   $.ajax({
        type: "GET",
        url: url + "historico/obterItens/" + idSala,
        cache: false,
        async: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
     .done(function (data) {
         
            itens = data;
            buscarDescricaoItens();

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao buscar os itens!");
        });
}

function buscarDescricaoItens() {
    var urlItem = null;

    if (sala.tipoJogo == "Quiz") {
        urlItem = "pergunta/";

        for (var i = 0; i < itens.length; i++) {
            buscarItemPerguntas(urlItem, i);
        }
    }
    else {
        if (sala.tipoJogo == "Meteoro") {
            urlItem = "meteoro/obterSinal/";
        }
        else if (sala.tipoJogo == "Mestre Mandou") {
            urlItem = "mestreMandou/obterSinal/"
        }

        for (var i = 0; i < itens.length; i++) {
            buscarItem(urlItem, i);
        }
    }

    preencherTabelaItens();
}

function preencherTabelaItens() {

    $('#itens').show();

    tabelaItem = $('#tabelaItens').DataTable({
        dom: "Bfrtip",
        bFilter: false,
        bInfo: false,
        "ordering": false,
        "pageLength": 3,
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo"
            },
            "emptyTable": "Sem dados",
            "search": "Pesquisar: ",
            "info": "_PAGE_ de _PAGES_"
        },
        data: itensCompletos,
        columns: [
            { data: "descricao" },
        ],
    });
}

$('#tabelaItens tbody').on('click', 'tr', function () {
    var idItem = tabelaItem.row(this).data()._id;
    buscarDadosGrafico(idItem);
});

function buscarDadosGrafico(idItem) {
    $.ajax({
        type: "GET",
        url: url + "historico/porcentagem/" + idSala + "/" + idItem,
        cache: false,
        async: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            montarGrafico(data);
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao buscar os dados do gráfico!");
        });
}

function montarGrafico(dados) {
    var x = ["Acertos", "Erros"];
    var y = [dados.quantidadeAcertos, dados.quantidadeErros];
    var barColors = [
        "#00FF00",
        "#FF0000"
    ];

    new Chart("graficoItens", {
        type: "pie",
        data: {
            labels: x,
            datasets: [{
                backgroundColor: barColors,
                data: y
            }]
        },
        options: {
            title: {
                display: true,
                text: "Porcentagem de Acerto"
            }
        }
    });
}

function buscarItemPerguntas(urlItem, indice) {
    $.ajax({
        type: "GET",
        url: url + urlItem + itens[indice],
        cache: false,
        async: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            var item = {};
            item._id = data._id;

            var alternativas = data.alternativas.filter(i => i.perguntaCorreta == "true");
            item.descricao = data.descricao + ' - ' + alternativas[0].descricao;
            itensCompletos.push(item);

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao buscar o item!");
        });
}

function buscarItem(urlItem, indice) {
    $.ajax({
        type: "GET",
        url: url + urlItem + itens[indice],
        cache: false,
        async: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            var item = {};
            item._id = data._id;
            item.descricao = data.descricao;

            itensCompletos.push(item);

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao buscar o item!");
        });
}

async function buscarRanking() {
  await  $.ajax({
        type: "GET",
        url: url + "historico/obterMelhoresAlunos/" + idSala,
        cache: false,
        async: false,
        headers: {
            Authorization: 'Bearer ' + token
        }      
    })
        .done(function (data) {
          
            dadosCompletos = data;
            buscarAlunos();

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao buscar o ranking!");
        });
}

function buscarAlunos() {
    for (var i = 0; i < dadosCompletos.length; i++) {
        buscarNome(url + "usuario/" + dadosCompletos[i]._id, i);
    }

    popularRanking();
}

function popularRanking() {


    $('#ranking').show();
    
    $('#tabelaRanking').DataTable({
        dom: "Bfrtip",
        bFilter: false,
        bInfo: false,
        "ordering": false,
        "paging": false,
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo"
            },
            "emptyTable": "Sem dados",
            "search": "Pesquisar: ",
            "info": "_PAGE_ de _PAGES_"
        },
        data: dadosCompletos,
        columns: [
            { data: "nome" },
            { data: "quantidadeAcertos" },
        ],
    });
}


function buscarNome(urlUsuario, indice) {
    $.ajax({
        type: "GET",
        url: urlUsuario,
        cache: false,
        async: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            dadosCompletos[indice].nome = data.nome;

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao buscar o nome!");
        });
}