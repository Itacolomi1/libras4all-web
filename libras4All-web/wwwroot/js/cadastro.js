function cadastrarUsuario() {
    var url = "https://libras4all.herokuapp.com/api/professor";
    var nome = $('#exampleDropdownFormNome1').val();
    var email = $('#exampleDropdownFormEmail1').val();
    var senha = $('#exampleDropdownFormPassword1').val();
    $.ajax({
        type: "POST",
        url: url,
        data: { nome: nome, email: email, senha: senha },
        cache: false
    })
        .done(function (data) {
            alert("Usuário cadastrado com sucesso");
            window.location = "https://libras4all-web.herokuapp.com/Login";
        })
        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
            alert("Erro ao cadastrar usuário.");
        });
}