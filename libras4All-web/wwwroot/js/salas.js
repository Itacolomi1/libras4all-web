﻿$(document).ready(function () {
    var token = localStorage.getItem('user_token').replaceAll("\"", "");
    var id = localStorage.getItem('user_id').replaceAll("\"", "");

    var url = "https://libras4all.herokuapp.com/api/sala/listarSalasProfessor/"

    $('#tbSalas').DataTable({
        dom: "Bfrtip",
        "columnDefs": [
            { "width": "50%", "targets": 1 }
        ],
        "pageLength": 3,
        "language": {
            "paginate": {
                "previous": "Anterior",
                "next": "Próximo"
            },
            "search": "Pesquisar: ",
            "info": "_PAGE_ de _PAGES_"
        },
        ajax: {
            url: url + id,
            type: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            },
            "dataSrc": '',
        },
        columns: [
            { data: "codigo" },
            { data: "descricao" },
            {
                data: function (data, type, row) {
                    var strStatus;
                    if (data.status == "false")
                        strStatus = 'Inativa'
                    else
                        strStatus = 'Ativa'
                    return strStatus;
                }
            },
            { data: "tipoJogo" },
            {
                data: function (data, type, row) {
                    return '<a href="Editar?Id=' + data._id + '">' +
                        '<img class="btnVisualizar" style="width: 30px;" src="./images/visualizar.png"></img>' +
                        '</a> ' +
                        '<a href="Editar?Id=' + data._id + '">' +
                        '<img style="width: 30px;" src="./images/editar.png"></img>' +
                        '</a> ' +
                        '<a href="Excluir?Id=' + data._id + '">' +
                        '<img class="btnVisualizar" style="width: 30px;" src="./images/excluir.png"></img>' +
                        '</a> ';
                }
            },
        ],
    });
});