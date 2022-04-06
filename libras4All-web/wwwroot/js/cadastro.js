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
        
        return validarEmail(email);
    }
}
       

function cadastrarUsuario() {


    var nome = $('#exampleDropdownFormNome1').val();
    var email = $('#exampleDropdownFormEmail1').val();
    var senha = $('#exampleDropdownFormPassword1').val();
    var dataNascimento = document.getElementById('exampleDropdownFormDate1').value;

    if (validaCampos(nome, email, senha, dataNascimento)) {
        if (validaCheck()) {
            var url = "https://libras4all.herokuapp.com/api/professor";    

            $.ajax({
                type: "POST",
                url: url,
                data: { nome: nome, email: email, senha: senha, dataNascimento: dataNascimento },
                cache: false
            })
                .done(function (data) {
                    alert("Usuário cadastrado com sucesso");
                    window.location = "https://libras4all-web.herokuapp.com/Login";
                })
                .fail(function (XMLHttpRequest, textStatus, errorThrown) {

                    alert("Erro ao cadastrar usuário.");
                });
        }
        else {

            alert("É necessário aceitar os termos para se cadastrar");
        }
    }
    else {
        alert("Preencha todos os campos corretamente");
    }
}