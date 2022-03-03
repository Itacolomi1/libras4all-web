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
            localStorage.setItem('user_token', JSON.stringify(data.token));
            localStorage.setItem('user_id', JSON.stringify(data._id));
            
           
            window.location = "https://localhost:44319/Home"


        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usuário ou Senha inválido");
            console.log(errorThrown);
        });


}

