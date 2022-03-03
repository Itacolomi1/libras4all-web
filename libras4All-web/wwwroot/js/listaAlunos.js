var array = [];

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


async function CarregaDados() {

    var token = localStorage.getItem('user_token').replaceAll("\"", "");
    var id = localStorage.getItem('user_id').replaceAll("\"", "");
    //var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMWJlOWI4MmQ1M2EzMDAxNmEwYjU2ZSIsImlhdCI6MTY0NjMzNTYwNH0.zo-YM5pZn7WugFNNeSsm28TsW1Df1jmWO9Rs7LCQT7Y';
    //var id = '621be9b82d53a30016a0b56e';

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
        data: array,
        columns: [
            { data: "nome" },
            { data: "email" },
        ],
    });
}

$(document).ready(function () {

    CarregaDados();
   
});
