//$(document).ready(function () {

//    var token = localStorage.getItem('user_token').replaceAll("\"", "");
    
//    $('#tabelaAlunos').DataTable({
//        dom: "Bfrtip",
//        ajax: {
            
//            url: "https://libras4all.herokuapp.com/api/usuario/obterAlunosPorProfessor/?id=${id}",
//            type: 'GET',
//            headers: {
//                Authorization: 'Bearer ' + token
//            },
//            "dataSrc": '',
//        },
//        columns: [
          
//            { data: "nome" },
//            { data: "email" },         
           
//        ],
//    });
//});