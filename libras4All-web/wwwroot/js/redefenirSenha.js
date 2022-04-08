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