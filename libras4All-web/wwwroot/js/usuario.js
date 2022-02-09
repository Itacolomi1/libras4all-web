function logarUsuario() {

    var url = "https://libras4all.herokuapp.com/api/usuario/authenticate";


    var usuario = {};
    usuario.email = $('#email_user').val();
    usuario.senha = $('#password_user').val();
    debugger;
    $.ajax({
        type: "POST",
        url: url,
        data: usuario,
        cache: false
    })
        .done(function (data) {
            localStorage.setItem('user_token', JSON.stringify(data.token));
            console.log('a token � ' + JSON.parse(localStorage.getItem('user_token')));
            //window.location = "https://libras4all-web.herokuapp.com/Home"
            console.log(data);

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usuário ou Senha inválido");
            console.log(errorThrown);
        });


}