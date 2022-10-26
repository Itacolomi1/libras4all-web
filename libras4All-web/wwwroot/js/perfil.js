var url = "https://libras4all-api.herokuapp.com/api/professor";

var id;
var token;

$(document).ready(function () {


    if (localStorage.getItem('user_token') == null || localStorage.getItem('user_id') == null) {
        swal({
            title: "Atenção!",
            text: "Você precisa estar logado para acessar está página",
            icon: "warning",
            button: "OK!",
        }).then(() => {
            window.location = "https://libras4all-web.herokuapp.com/Login";
        });

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
            var dataFormatada = (data.dataNascimento).replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1');
            $('#ldData').text(dataFormatada);
        });
});


function Logout() {

    swal({
        title: "Deseja realmente sair?",
        icon: "warning",
        buttons: [
            'Cancelar',
            'Sim'
        ],
        dangerMode: true,
    }).then(function (isConfirm) {
        if (isConfirm) {
            window.localStorage.clear();
            window.location = "https://libras4all-web.herokuapp.com/Login";

        } else {
            window.location = "https://libras4all-web.herokuapp.com/Perfil";
        }
    });


}