$(document).ready(function () {

    $("#eye").mousedown(function () {
        $("#exampleDropdownFormPassword1").attr("type", "text");
    });

    $("#eye").mouseup(function () {
        $("#exampleDropdownFormPassword1").attr("type", "password");
    });
    $("#eye2").mousedown(function () {
        $("#exampleDropdownFormPassword2").attr("type", "text");
    });

    $("#eye2").mouseup(function () {
        $("#exampleDropdownFormPassword2").attr("type", "password");
    });

});


function validaSenhas() {

    var senha1 = $('exampleDropdownFormPassword1').text;
    var senha2 = $('exampleDropdownFormPassword2').text;

    if (senha1 == senha2)
        SalvaNovaSenha();
}

function SalvaNovaSenha() {

}