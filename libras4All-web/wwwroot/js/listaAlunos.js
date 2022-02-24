var array = [];

function AdicionaLista(alunos) {
    var url = "https://libras4all.herokuapp.com/api/usuario/";    

    for (i = 0; i < alunos.length; i++) {

        var _id = JSON.stringify(alunos[i]).replaceAll('"', "");
        var url2 = url + _id;
        $.ajax({
            type: "GET",
            url: url2,
            headers: {
                Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTY5NTUxMGJhNWFkMDAxNjRhNThkOCIsImlhdCI6MTY0NTY0NzQ1N30.wASaOYCe-ATNPiywaaWh1BtGMpSnab27wuyBG2Pqfzs'
            },
            success: function (retorno) {

                array.push(retorno);
            }
        });

    }
    console.log(array);
    return array;
}

$(document).ready(function () {

    var token = localStorage.getItem('user_token').replaceAll("\"", "");
    var id = localStorage.getItem('user_id').replaceAll("\"", "");

    var url = "https://libras4all.herokuapp.com/api/usuario/obterAlunosPorProfessor/" + id;

    $.ajax({
        type: "GET",
        url: url,
        headers: {
            Authorization: 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTY5NTUxMGJhNWFkMDAxNjRhNThkOCIsImlhdCI6MTY0NTY0NzQ1N30.wASaOYCe-ATNPiywaaWh1BtGMpSnab27wuyBG2Pqfzs'
        },
        success: function (retorno) {

            AdicionaLista(retorno);
            
            $('#tabelaAlunos').DataTable({
                dom: "Bfrtip",
                data: array,
                columns: [
                    { data: "nome" },
                    { data: "email" },
                ],
            });
        }
    });

  
});


