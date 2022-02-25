var token = localStorage.getItem('user_token').replaceAll("\"", "");
var id = localStorage.getItem('user_id').replaceAll("\"", "");
var url = "https://libras4all.herokuapp.com/api/sala/listarSalasProfessor/";

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: url + id,
        cache: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            $('#tbSalasAtivas').DataTable({
                dom: "Bfrtip",
                "columnDefs": [
                    { "width": "50%", "targets": 1 }
                ],
                bFilter: false,
                bInfo: false,
                "pageLength": 3,
                "language": {
                    "paginate": {
                        "previous": "Anterior",
                        "next": "Próximo"
                    },
                    "search": "Pesquisar: ",
                    "info": "_PAGE_ de _PAGES_"
                },
                data: data.filter(i => i.status == "true"),
                columns: [
                    { data: "codigo" },
                    { data: "descricao" },
                    { data: "tipoJogo" },
                ],
            });
        });
});

