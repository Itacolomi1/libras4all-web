

var array = [];

var idAluno;
var idSala;

var token;
var id;


$(document).ready(function () {

    if (localStorage.getItem('user_token') == null) {
        alert("ATENÇÃO!! Você precisa estar logado para acessar está página");
        window.location = "https://libras4all-web.herokuapp.com/Login";
    }

    id = localStorage.getItem('user_id').replaceAll("\"", "");
    token = localStorage.getItem('user_token').replaceAll("\"", "");

    CarregaDados();
    
});

async function AdicionaLista(alunos, token) {

    var url = "https://libras4all.herokuapp.com/api/usuario/";
    for (i = 0; i < alunos.length; i++) {

        var _id = JSON.stringify(alunos[i]).replaceAll('"', "");

        var url2 = url + _id;
        await $.ajax({
            type: "GET",
            url: url2,
            dataType: "json",
            headers: {
                authorization: 'bearer ' + token
            },
            beforeSend: function () {
                
                $("#tabelaAlunos").html("<img id='loading' src='./images/load.gif'>");

            },
            success: function (retorno) {

                array.push(retorno);
                $('#tabelaAlunos').html("");

            },
            error: function () {
                console.log("Ocorreu um erro");
            }

        });
    }

    montaTabela();
}

async function CarregaDadosAlunoSelecionado(id) {


    var url = "https://libras4all.herokuapp.com/api/sala/listarSalasAluno/" + id;

    await $.ajax({
        type: "GET",
        url: url,
        headers: {
            authorization: 'bearer ' + token
        },
        beforeSend: function () {
            //Aqui adicionas o loader
            $("#tabelaSalas").html("<img id='loading' src='./images/load.gif'>");

        },
        success: function (retorno) {

            $("#tabelaSalas").html("");
            montaTabelaSalas(retorno);

        }
    });

}


async function CarregaDados() {

    var url = "https://libras4all.herokuapp.com/api/usuario/obterAlunosPorProfessor/" + id;

    await $.ajax({
        type: "GET",
        url: url,
        headers: {
            authorization: 'bearer ' + token
        },
        success: function (retorno) {

            AdicionaLista(retorno, token);
        }
    });

}

async function montaTabela() {

    $('#tabelaAlunos').show();

    await $('#tabelaAlunos').DataTable({
        dom: "Bfrtip",
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            },
            { "width": "50%", "targets": 1 }
        ],
        "pageLength": 3,
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo"
            },
            "search": "Pesquisar: ",
            "info": "_PAGE_ de _PAGES_"
        },
        data: array,
        columns: [
            { data: "_id" },
            { data: "nome" },
            { data: "email" },
        ],
    });

    var table = $('#tabelaAlunos').DataTable();

    $('#tabelaAlunos tbody').on('click', 'tr', function () {

        $('#divDesempenho').hide();
        $("#divDesempenho").html("<canvas id='primeiroGrafico'></canvas>");      
        idAluno = table.row(this).data()._id;
        $('#tabelaSalas').DataTable().clear();
        CarregaDadosAlunoSelecionado(idAluno);
    });

}


async function montaTabelaSalas(dado) {

    document.getElementById("divSala").style.display = 'block';

    await $('#tabelaSalas').DataTable({
        dom: "Bfrtip",
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            },
            { "width": "50%", "targets": 1 }
        ],
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo"
            },
            "search": "Pesquisar: ",
            "info": "_PAGE_ de _PAGES_"
        },
        data: dado,
        destroy: true,
        columns: [
            { data: "_id" },
            { data: "descricao" },
            { data: "tipoJogo" },
        ],
    });

    var tab = $('#tabelaSalas').DataTable();


    tab.$('tr').click(function () {
              
        var data = tab.row(this).cache();
        idSala = data[0];
        BuscaAcertosErros(idAluno, idSala);
    });
}


async function BuscaAcertosErros(id_aluno, id_sala) {

    var url = "https://libras4all.herokuapp.com/api/historico/quantidadePorAluno/" + id_sala + "/" + id_aluno;

    await $.ajax({
        type: "GET",
        url: url,
        headers: {
            authorization: 'bearer ' + token
        },
        success: function (retorno) {

            Grafico(retorno);
        }
    });
}

function Grafico(dados) {

    document.getElementById("divDesempenho").style.display = 'block';

    const propertyValues = Object.values(dados);

    let ctx = document.getElementById('primeiroGrafico');
    let myBarChart = new Chart(ctx, {
        type: 'bar',
        data: {

            labels: ['Acertos', 'Erros'],
            datasets: [{
                // Legenda geral
                label: '',
                data: propertyValues,

                backgroundColor: [
                    'rgba(0,255,127)',
                    'rgba(255,0,0)',

                ],

                borderColor: [
                    'rgba(0,100,0)',
                    'rgba(139,0,0)',
                ],

                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: "Desempenho"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    categoryPercentage: 0.9,
                    barPercentage: 0.5
                }],
            },
            legend: {
                display: false
            },
            maintainAspectRatio: false,
            responsive: true
        }

    });


}
