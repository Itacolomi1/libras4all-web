function cadastrarUsuario() {
    var url = "https://libras4all.herokuapp.com/api/usuario/criar";
    //var url = "http://localhost:9090/api/usuario/criar";

    var nomeUsuario = $('#exampleDropdownFormNome1').val();
    var loginUsuario = $('#exampleDropdownFormEmail1').val();
    var senhaUsuario = $('#exampleDropdownFormPassword1').val();
   
    $.ajax({
        type: "POST",
        url: url,
        data: { nome: nomeUsuario, email: loginUsuario, password: senhaUsuario },
        cache: false
    })
        .done(function (data) {
            alert("Usuário cadastrado com sucesso");
            window.location.href = "https://libras4all-web.herokuapp.com/Login"; // não está redirecionando

        })

        .fail(function (XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
        });
}