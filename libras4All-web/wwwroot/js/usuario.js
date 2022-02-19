function logarUsuario() {
    var url = "https://libras4all.herokuapp.com/api/professor/login";

    var usuario = {};
    usuario.email = $('#email_user').val();
    usuario.senha = $('#password_user').val();
    $.ajax({
        type: "POST",
        url: url,
        data: usuario,
        cache: false
    })
        .done(function (data) {
            localStorage.setItem('token', JSON.stringify(data.token));
            localStorage.setItem('id', JSON.stringify(data._id));
            window.location = "https://libras4all-web.herokuapp.com/Home";
        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usuário ou Senha inválido");
        });
}