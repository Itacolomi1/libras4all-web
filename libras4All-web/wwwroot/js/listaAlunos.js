$(document).ready(function () {
    var token = localstorage.getitem('user_token').replaceall("\"", "");
    var id = localstorage.getitem('user_id');
    debugger;
    $('#tabelaAlunos').DataTable({
        dom: "Bfrtip",
        ajax: {

           url: "https://libras4all.herokuapp.com/api/usuario/obteralunosporprofessor/"+ id,
            type: 'GET',
            headers: {
                authorization: 'bearer ' + token
            },
            "datasrc": '',
        },
        columns: [

            { data: "nome" },
            { data: "email" },         

        ],
    });
});