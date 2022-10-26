var token;
var id;
var url = "https://libras4all-api.herokuapp.com/api/sala/listarSalasProfessor/";

$(document).ready(function () {
   
    if (localStorage.getItem('user_token') == null || localStorage.getItem('user_id') == null) {
        swal({
            title: "Atenção!",
            text: "Você precisa estar logado para acessar está página",
            icon: "warning",
            button: "OK!",
        }).then(() => {
            window.location = "https://libras4all-portal.herokuapp.com/Login";
        });

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
            console.log(data);
            
            $('#tbSalasAtivas').DataTable({
                dom: "Bfrtip",
                "columnDefs": [
                    {
                        "width": "50%", "targets": 1, "defaultContent": "-",
                        "targets": "_all" }
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
                    {
                        data: function (data, type, row) {
                            return '<a href="Editar?Id=' + data._id + '">' +
                                '<img style="width: 30px;" src="./images/editar.png"></img>' +
                                '</a> ';
                        }
                    },
                ],
            });
        });
});

