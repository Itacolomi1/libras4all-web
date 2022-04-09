function logarUsuario() {
    var url = "https://libras4all.herokuapp.com/api/professor/login";

    var usuario = {};
    usuario.email = $('#email_user').val();
    usuario.senha = $('#password_user').val();
    $.ajax({
        type: "POST",
        url: url,
        data: usuario,
        beforeSend: function () {
            
            $("#logar").html("<img id='loadingLogin' src='./images/load.gif'>");
            
        },
        cache: false
    })
        .done(function (data) {            
           
            localStorage.setItem('user_token', JSON.stringify(data.token));
            localStorage.setItem('user_id', JSON.stringify(data._id));          

            localStorage.setItem('user_id', JSON.stringify(data._id));
            window.location = "https://libras4all-web.herokuapp.com/Home";
            //window.location = "https://localhost:44319/Home";

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usuário ou Senha inválido");
            location.reload();
        });
}

function enviarEmail() {
    var url = "https://libras4all.herokuapp.com/api/email";
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
            alert("Caso exista uma conta com o email informado, iremos enviar as instruções para a troca de senha.");
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Erro ao pedir para redefinir a senha.");
        });
}