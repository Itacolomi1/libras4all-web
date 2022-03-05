var array = [];

var idAluno;
var idSala;

var token = localStorage.getItem('user_token').replaceAll("\"", "");
var id = localStorage.getItem('user_id').replaceAll("\"", "");

//var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWJlOWI4MmQ1M2EzMDAxNmEwYjU2ZSIsImlhdCI6MTY0NjQyMzE4OH0.jlc0iaSFUx39GxJnhiYLKTQe9oO1o6tra50xICr-iDQ';
//var id = '621be9b82d53a30016a0b56e';

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
            success: function (retorno) {

                array.push(retorno);

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
        success: function (retorno) {

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
    await $('#tabelaAlunos').DataTable({
        dom: "Bfrtip",
        "columnDefs": [
            {
                "targets": [0],
                "visible": false,
                "searchable": false
            },
        ],
        data: array,
        columns: [
            { data: "_id" },
            { data: "nome" },
            { data: "email" },
        ],
    });

    var table = $('#tabelaAlunos').DataTable();

    $('#tabelaAlunos tbody').on('click', 'tr', function () {

        idAluno = table.row(this).data()._id;

        $('#tabelaSalas').DataTable().clear();
        CarregaDadosAlunoSelecionado(idAluno);
    });

}
async function montaTabelaSalas(dado) {
    debugger;

    await $('#tabelaSalas').DataTable({
        dom: "Bfrtip",
        data: dado,
        destroy: true,
        columns: [
            { data: "descricao" },
            {data: "tipoJogo"},
        ],
    });

    var tab = $('#tabelaSalas').DataTable();

    $('#tabelaSalas tbody').on('click', 'tr', function () {

        idSala = tab.row(this).data()._id;
        BuscaAcertosErros(idAluno, idSala);

    });
}

$(document).ready(function () {

    CarregaDados();
    
});

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

    const propertyValues = Object.values(dados);

     console.log(propertyValues);
     debugger;
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
                    'rgba(0,191,255)',
                    'rgba(255,0,0)',
                    
                ],
                
                borderColor: [
                    'rgba(0,0,139)',
                    'rgba(139,0,0)',                   
                ],
                // Define a espessura da borda dos retângulos
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                display: false
            }
        }
    });
    
}
