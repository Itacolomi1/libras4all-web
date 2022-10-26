function logarUsuario() {
    var url = "https://libras4all-api.herokuapp.com/api/professor/login";

    var usuario = {};
    usuario.email = $('#email_user').val();
    usuario.senha = $('#password_user').val();
    $.ajax({
        type: "POST",
        url: url,
        data: usuario,
        beforeSend: function () {
            
            $("#logar").html("<img id='loadingLogin' src='./images/loadingg.gif'>");
            
        },
        cache: false
    })
        .done(function (data) {            
           
            localStorage.setItem('user_token', JSON.stringify(data.token));
            localStorage.setItem('user_id', JSON.stringify(data._id));          

            localStorage.setItem('user_id', JSON.stringify(data._id));
            window.location = "https://libras4all-web.herokuapp.com/Home";
           

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            swal({
                title: "Ops!",
                text: "Usuário ou Senha inválido",
                icon: "error",
                button: "OK!",
            }).then(() => {
                location.reload();
            }); 
           
        });
}

function enviarEmail() {
    var url = "https://libras4all-api.herokuapp.com/api/email";
    var txtEmail = $('#txtEmail').val();
    var flag = false;

    $.ajax({
        type: "POST",
        url: url,
        data:
        {
            email: txtEmail,
            isMobile: flag
        },
        cache: false
    })
        .done(function (data) {

            swal({
                title: "Atenção!",
                text: "Caso exista uma conta com o email informado, iremos enviar as instruções para a troca de senha.",
                icon: "warning",
                button: "OK!",
            }).then(() => {
                window.location = "https://libras4all-web.herokuapp.com/Login";
            }); 
           
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("Erro ao pedir para redefinir a senha.");
            swal({
                title: "Atenção!",
                text: "Erro ao pedir para redefinir a senha.",
                icon: "error",
                button: "OK!",
            }).then(() => {
                window.location = "https://libras4all-web.herokuapp.com/Login";
            });
        });
}