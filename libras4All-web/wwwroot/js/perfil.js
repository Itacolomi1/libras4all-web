var url = "https://libras4all.herokuapp.com/api/professor";

var id;
var token;

$(document).ready(function () {
    
   
    if (localStorage.getItem('user_token') == null) {
        alert("ATENÇÃO!! Você precisa estar logado para acessar está página");
        window.location = "https://libras4all-web.herokuapp.com/Login";
    }   
    
    id = localStorage.getItem('user_id').replaceAll("\"", "");
    token = localStorage.getItem('user_token').replaceAll("\"", "");

    $.ajax({
        type: "GET",
        url: url + "/" + id,
        cache: false,
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .done(function (data) {
            $('#lbNome').text(data.nome);
            $('#lbEmail').text(data.email);
        });
});


function Logout() {
    debugger;
    var x;
    var r = confirm("Deseja realmente sair?");
    if (r == true) {
        window.localStorage.clear();
        window.location = "https://libras4all-web.herokuapp.com/Login";
    }
    else {
        window.location = "https://libras4all-web.herokuapp.com/Perfil";
    }
   
}