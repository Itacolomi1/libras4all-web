
function alerta() {

    swal({
        title: "Atenção!",
        text: "Em caso de necessidade de recuperação de senha você precisa ter acesso ao email informado nesse campo",
        icon: "warning",
        button: "OK!",
    }).then(() => {
        $("#exampleDropdownFormEmail1").focus();
    });

}

$(document).ready(function () {
    $("#eye").mousedown(function () {
        $("#exampleDropdownFormPassword3").attr("type", "text");
        $("#exampleDropdownFormPassword4").attr("type", "text");
    });

    $("#eye").mouseup(function () {
        $("#exampleDropdownFormPassword3").attr("type", "password");
        $("#exampleDropdownFormPassword4").attr("type", "password");
    });
    $("#eye2").mousedown(function () {
        $("#exampleDropdownFormPassword3").attr("type", "text");
        $("#exampleDropdownFormPassword4").attr("type", "text");
    });

    $("#eye2").mouseup(function () {
        $("#exampleDropdownFormPassword3").attr("type", "password");
        $("#exampleDropdownFormPassword4").attr("type", "password");
    });
});

function validaSenhaIgual(txtSenha, txtConfirmarSenha) {
  
    if (txtSenha == txtConfirmarSenha) {
        return true;
    }
    else {
      
        return false;
    }
}
function validaCheck() {

    var resposta = document.getElementById('checkboxp');
    if (resposta.checked == false) {
        return false;
    }
    else {
        return true;
    }
}

function validarEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


function validaCampos(nome, email, senha, data) {
    if (nome == "" || email == "" || senha == "" || data == "") {

        return false;
    }

    else {

        return true;
    }
}

function cadastrarUsuario() {   
    
    var nome = $('#exampleDropdownFormNome1').val();
    var email = $('#exampleDropdownFormEmail1').val();
    var senha1 = $('#exampleDropdownFormPassword3').val();
    var senha2 = $('#exampleDropdownFormPassword4').val();
    var dataNascimento = document.getElementById('exampleDropdownFormDate1').value;

    if (validaCampos(nome, email, senha1, dataNascimento)) {

        if (validarEmail(email)) {
            if (validaSenhaIgual(senha1, senha2)) {
                if (validaCheck()) {
                    var url = "https://libras4all-api.herokuapp.com/api/professor";

                    $.ajax({
                        type: "POST",
                        url: url,
                        data: { nome: nome, email: email, senha: senha1, dataNascimento: dataNascimento },
                        cache: false
                    })
                        .done(function (data) {
                            swal({

                                text: "Usuário cadastrado com sucesso",
                                icon: "success",
                                confirmButtonText: "OK!",
                            })

                            window.location = "https://libras4all-web.herokuapp.com/Login";
                        })
                        .fail(function (XMLHttpRequest, textStatus, errorThrown) {

                            swal({

                                text: "Erro ao cadastrar usuário.",
                                icon: "error",
                                confirmButtonText: "OK!",
                            })
                        });
                }
                else {

                    swal({

                        text: "É necessário aceitar os termos para se cadastrar",
                        icon: "error",
                        confirmButtonText: "OK!",
                    })
                }
            }
            else {
                swal({

                    text: "As senhas precisam ser iguais.",
                    icon: "error",
                    confirmButtonText: "OK!",
                })
            }

        }
        else {
            swal({

                text: "Digite um email válido",
                icon: "error",
                confirmButtonText: "OK!",
            })
        }
    }
    else {
       
        swal({

            text: "É necessário preencher todos os campos",
            icon: "error",
            confirmButtonText: "OK!",
        })
    }
}


