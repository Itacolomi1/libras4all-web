function ListaSalas() {

    var token = localStorage.getItem('user_token').replaceAll("\"", "");
    var id = localStorage.getItem('user_id').replaceAll("\"", "");
    var url = "https://libras4all.herokuapp.com/api/sala/listarSalasAluno/";

    $('#tabelaSalas').DataTable({
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

        },
        columns: [
            //{
            //    data: function (data, type, row) {
            //        return '<a href="DetalhesSala?Id=' + data._id + '&NomeSala=' + data.roomName + '&TipoJogo=' + data.tipoJogo + '&Codigo=' + data.cod_acesso + '&DataCriacao=' + data.dataCriacao + data.cod_acesso + '&Status=' + data.status + '">' +
            //            '<img class="btnEdit" src="img/caneta-tinteiro.png"></img>' +
            //            '</a>' +
            //            '<a href="RelatorioSala?Id=' + data._id + '">' +
            //            '<img class="btnRelatorio" src="img/caderno.png"></img>' +
            //            '</a>';
            //    }
            //},
            { data: "codigo" },
            { data: "descricao" },
            { data: "dataCriacao" },           
        ],
    });
}