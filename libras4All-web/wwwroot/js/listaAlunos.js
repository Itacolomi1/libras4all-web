var array = [];

var idAluno;

var token = localStorage.getItem('user_token').replaceAll("\"", "");
var id = localStorage.getItem('user_id').replaceAll("\"", "");

//var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWJlOWI4MmQ1M2EzMDAxNmEwYjU2ZSIsImlhdCI6MTY0NjMzNTYwNH0.zo-YM5pZn7WugFNNeSsm28TsW1Df1jmWO9Rs7LCQT7Y';
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

    var token = localStorage.getItem('user_token').replaceAll("\"", "");

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
function montaTabelaSalas(dado) {


    $('#tabelaSalas').DataTable({
        dom: "Bfrtip",
        data: dado,
        destroy: true,
        columns: [
            { data: "descricao" },
        ],
    });
}

$(document).ready(function () {

    CarregaDados();
});
