var urlProfessor = "https://libras4all.herokuapp.com/api/professor";
//var urlWeb = "https://libras4all-web.herokuapp.com";
var urlWeb = "https://localhost:44319";

function logarUsuario() {
    var usuario = {};
    usuario.email = $('#email_user').val();
    usuario.senha = $('#password_user').val();
    $.ajax({
        type: "POST",
        url: urlProfessor + '/login',
        data: usuario,
        cache: false
    })
        .done(function (data) {
            localStorage.setItem('user_token', JSON.stringify(data.token));
            localStorage.setItem('user_id', JSON.stringify(data._id));
            window.location = urlWeb + "/Home"

        }).fail(function (XMLHttpRequest, textStatus, errorThrown) {
            alert("Usuário ou Senha inválido");
        });
}

function cadastrarUsuario() {
    var nome = $('#exampleDropdownFormNome1').val();
    var email = $('#exampleDropdownFormEmail1').val();
    var senha = $('#exampleDropdownFormPassword1').val();

    $.ajax({
        type: "POST",
        url: urlProfessor,
        data: { nome: nome, email: email, senha: senha },
        cache: false
    })
        .done(function (data) {
            alert("Usuário cadastrado com sucesso");
            window.location = urlWeb + "/Login";
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
            alert("Erro ao cadastrar usuário.");
        });
}