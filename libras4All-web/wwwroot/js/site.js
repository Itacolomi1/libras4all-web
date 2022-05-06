// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var c = 0;
window.onload = function () {
    var url = window.location.href;
    url = url.split('com/');
    url = url[1];
    $('#menu1 li').each(function () {
        if ($('a', this).attr('href') == url) {
            $(this).addClass('activo');
        }
    });
}
 

$(function () {
   
    $(".input-search").keyup(function () {
        //pega o css da tabela 
        var tabela = $(this).attr('alt');
        if ($(this).val() != "") {
            $("." + tabela + " tbody>tr").hide();
            $("." + tabela + " td:contains-ci('" + $(this).val() + "')").parent("tr").show();
        } else {
            $("." + tabela + " tbody>tr").show();
        }
    });
    $('.img-perfil').click(function () {
        $('#teste').click();
    });
  
    $("#teste").change(function () {
        if ($(this).val()) { // só se o input não estiver vazio
            var img = this.files[0]; // seleciona o arquivo do input
            var f = new FileReader(); // cria o objeto FileReader
            f.onload = function (e) { // ao carregar a imagem
                $("#id_sua_img").attr("src", e.target.result); // altera o src da imagem
            }
            f.readAsDataURL(img); // lê o arquivo
        }
    });
});
$.extend($.expr[":"], {
    "contains-ci": function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

$("#nova_sala .quiz").click(function () {
    $("#modal_quiz").css("display", "block");
    $(".fundo_modal").css("display", "block");
});

$("#modal_quiz #nova_pergunta").click(function () {
    
    if(c == 0) {
        $("#modal_quiz #cadastrar_pergunta").css("display", "block");
        c = c + 1;
    }
    else if(c == 1) {
        $("#modal_quiz #cadastrar_pergunta").css("display", "none");
        c = c - 1;
    }
});
$(".abrir_duvida_mestre").click(function () {
    $("#duvida_mestre").css("display", "block");
    $(".fundo_modal").css("display", "block");
});

$(".abrir_duvida_meteoro").click(function () {
    $("#duvida_meteoro").css("display", "block");
    $(".fundo_modal").css("display", "block");
});
$(".fechar").click(function () {
    $(this).parent().css("display", "none");
    $(".fundo_modal").css("display", "none");
});

$(".confirma").click(function () {
    $(this).parent().css("display", "none");
    $(".fundo_modal").css("display", "none");
});
 

