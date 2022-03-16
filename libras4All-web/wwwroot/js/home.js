var token;
var id;
var url = "https://libras4all.herokuapp.com/api/sala/listarSalasProfessor/";

$(document).ready(function () {
    if (localStorage.getItem('user_token') == null) {
        alert("ATENÇÃO!! Você precisa estar logado para acessar está página");
        window.location = "https://libras4all-web.herokuapp.com/Login";
    }

    id = localStorage.getItem('user_id').replaceAll("\"", "");
    token = localStorage.getItem('user_token').replaceAll("\"", "");

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
                    "emptyTable": "Sem dados",
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

