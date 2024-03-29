﻿var url = "https://libras4all-api.herokuapp.com/api/email";
var urlString = new URL(window.location.href);
var req = urlString.searchParams.get("req");


$(document).ready(function () {
    processarCampos();
    validarRequisicao();
});

function validarRequisicao() {
    $.ajax({
        type: "GET",
        url: url + "/validar/" + req,
        cache: false
    })
        .done(function (data) {
            processarRedefinicao();
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Link incorreto ou expirado!");
        });
}

function processarRedefinicao() {
    document.getElementById("redefinicao").style.display = 'block';
    document.getElementById("divSalvar").style.display = 'block';
}

function processarCampos() {
    $("#eye").mousedown(function () {
        $("#exampleDropdownFormPassword1").attr("type", "text");
        $("#exampleDropdownFormPassword2").attr("type", "text");
    });

    $("#eye").mouseup(function () {
        $("#exampleDropdownFormPassword1").attr("type", "password");
        $("#exampleDropdownFormPassword2").attr("type", "password");
    });
    $("#eye2").mousedown(function () {
        $("#exampleDropdownFormPassword1").attr("type", "text");
        $("#exampleDropdownFormPassword2").attr("type", "text");
    });

    $("#eye2").mouseup(function () {
        $("#exampleDropdownFormPassword1").attr("type", "password");
        $("#exampleDropdownFormPassword2").attr("type", "password");
    });
}

function redefinirSenha() {
    var txtSenha = $('#exampleDropdownFormPassword1').val();
    var txtConfirmarSenha = $('#exampleDropdownFormPassword2').val();

    if (txtSenha == txtConfirmarSenha) {
        atualizarSenha();
    }
    else {
        swal({

            text: "AS senhas precisam ser iguais.",
            icon: "error",
            confirmButtonText: "OK!",
        })
    }
}

function atualizarSenha() {
    var txtSenha = $('#exampleDropdownFormPassword1').val();

    console.log(req)
    console.log(txtSenha)

    $.ajax({
        type: "PUT",
        url: url + "/atualizar",
        data:
        {
            idHistorico: req,
            novaSenha: txtSenha
        },
        cache: false
    })
        .done(function (data) {
            swal({
                title: "Atenção!",
                text: "Senha alterada com sucesso",
                icon: "warning",
                button: "OK!",
            }).then(() => {
                window.location = "https://libras4all-portal.herokuapp.com/Login";

            });  
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
        
            swal({
                title: "Atenção!",
                text: "Erro ao alterar a senha",
                icon: "error",
                button: "OK!",
            });  
        });
}