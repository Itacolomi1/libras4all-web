

$(document).ready(function () {

    // testando
    if (localStorage.getItem('user_token') == null || localStorage.getItem('user_id') == null) {
        swal({
            title: "Atenção!",
            text: "Você precisa estar logado para acessar esta página",
            icon: "warning",
            button: "OK!",
        }).then(() => {
            window.location = "https://libras4all-web.herokuapp.com/Login";
        });

    }

    var id = localStorage.getItem('user_id').replaceAll("\"", "");
    var token = localStorage.getItem('user_token').replaceAll("\"", "");

    var url = "https://libras4all-api.herokuapp.com/api/sala/listarSalasProfessor/"

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
            debugger;

            $('#tbSalas').DataTable({
                dom: "Bfrtip",
                "columnDefs": [
                    { "width": "50%", "targets": 1 },

                ],
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
                data: data,
                columns: [
                    { data: "codigo" },
                    { data: "descricao" },
                    {
                        data: function (data, type, row) {
                            var strStatus;
                            console.log(data.status)
                            if (data.status=='true')
                                strStatus = 'Ativa'
                            else
                                strStatus = 'Inativa'
                            return strStatus;
                        }
                    },
                    { data: "tipoJogo" },
                    {
                        data: function (data, type, row) {
                            return '<a href="Visualizar?Id=' + data._id + '">' +
                                '<img class="btnVisualizar" style="width: 30px;" src="./images/visualizar.png"></img>' +
                                '</a> ' +
                                '<a href="Editar?Id=' + data._id + '">' +
                                '<img style="width: 30px;" src="./images/editar.png"></img>' +
                                '</a> ';
                        }
                    },
                ],
            });
        });

 
});