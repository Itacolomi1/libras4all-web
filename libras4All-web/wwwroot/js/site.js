// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var c = 0;

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

 
const data = {
    
    datasets: [{
        label: 'Weekly Sales',
        data: [18, 12, 6, 9, 12, 3, 9],
        backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)'
        ],
        borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)'
        ],
        borderWidth: 1
    }]
};

// config 
const config = {
    type: 'pie',
    data,
    options: {
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value * 100 / sum).toFixed() + "%";
                    return percentage;
                }
            }
        }
    },

};

// render init block
const myChart = new Chart(
    document.getElementById('primeiroGrafico'),
    config
);

