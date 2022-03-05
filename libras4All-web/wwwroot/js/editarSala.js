var urlSala = "https://libras4all.herokuapp.com/api/sala";
var token = localStorage.getItem('user_token').replaceAll("\"", "");
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('Id');

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: urlSala + "/" + id,
        cache: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            $('#txtNomeSala').text(data.descricao);
            $('#txtNomeJogo').text(data.tipoJogo);
            $('#txtCodigo').text(data.codigo);
            $("#ckAtivo").prop("checked", data.status == "true");

        });

    $.ajax({
        type: "GET",
        url: urlSala + "/listarAlunos/" + id,
        cache: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            $('#txtQtdAlunos').text(data.length);

        });
});

function editarSala() {
    var sala = {};
    sala._id = id;
    sala.ativa = $('#ckAtivo').is(":checked");

    $.ajax({
        type: "PUT",
        url: urlSala,
        cache: false,
        data: sala,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            alert("Sala editada com sucesso!");

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao editar a sala!");
        });
}