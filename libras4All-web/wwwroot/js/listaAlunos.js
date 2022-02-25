var array = [];

async function AdicionaLista(alunos, token) {
    
    
    var url = "https://libras4all.herokuapp.com/api/usuario/";    
    for (i = 0; i < alunos.length; i++) {

        var _id = JSON.stringify(alunos[i]).replaceAll('"', "");
        var url2 = url + _id;
       await $.ajax({
            type: "GET",
            url: url2,
            dataType: "json",
            headers: {
            authorization: 'bearer ' + token
        },
            success: function (retorno) {
                
                array.push(retorno);
                
            },
            error: function () {
                console.log("Ocorreu um erro");               
            }

        });       
        
    }
    console.log(array);
    debugger;
    return array;
}



function CarregaDados() {

   //var token = localStorage.getItem('user_token').replaceAll("\"", "");
   //var id = localStorage.getItem('user_id').replaceAll("\"", 
    var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTY5NTUxMGJhNWFkMDAxNjRhNThkOCIsImlhdCI6MTY0NTc0NjIwOH0.ewZRHrQ1iq8B2MtPJ7m7ukRfFNEHJBSdViUc7jbBVlI';
    var id = '621695510ba5ad00164a58d8';
    
    var url = "https://libras4all.herokuapp.com/api/usuario/obterAlunosPorProfessor/" + id;

    $.ajax({
        type: "GET",
        url: url,
        headers: {
            authorization: 'bearer ' + token
        },
        success: function (retorno) {

           
            AdicionaLista(retorno,token);
           

            // PEGAR ID DA MALU E TESTAR CRIAR A TABELA FORA PORQUE AQUI TA DANDO PROBLEMA DE SINCRONISMO
           
        }
    });

    $('#tabelaAlunos').DataTable({
        dom: "Bfrtip",
        data: array,
        columns: [
            { data: "nome" },
            { data: "email" },
        ],
    });
}
