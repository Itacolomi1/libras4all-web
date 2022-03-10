var url = "https://libras4all.herokuapp.com/api/professor";
var id = localStorage.getItem('user_id').replaceAll("\"", "");
var token = localStorage.getItem('user_token').replaceAll("\"", "");

$(document).ready(function () {
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

//function Logout() {
//    debugger;
    
//}

function Logout() {
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