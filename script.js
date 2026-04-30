const botao = document.getElementById('botao');
const input = document.getElementById('inputTarefa');
const lista = document.getElementById('lista');
//Definição das variáveis que vão pegar elementos diretamente do DOM.

let listaDeTarefas = [];
//variável que cria a lista de tarefas para armazenar mais de uma tarefa por vez

botao.addEventListener('click', adicionaTarefa);
//o método addEventListener está linkando a variável botao ao DOM

function adicionaTarefa() {

    if(input.value.trim() === '') return;
    //validação de entrada, caso o usuário tente adicioanr um valor vazio, nada acontece.

    let tarefa = input.value;
    listaDeTarefas.push(input.value);
    //guarda o texto digitado na variavel tarefa, em seguida envia o conteúdo da variavel
    //tarefa para o array ListaDeTarefas.
    
    input.value = '';
    input.placeholder = 'Tarefa Adicionada!';
    //limpa o campo para o próximo uso, retornando um texto de feedback ao usuário.

    setTimeout(function() {
        input.placeholder = 'Digite uma tarefa';
    }, 2000);
    //após dois segundos, o texto de feedback é removido, voltando ao estado inicial do programa.
    renderizarTarefas();
}

function renderizarTarefas() {
//essa função é responsável por renderizar a lista de tarefas na tela.
    
    lista.innerHTML = '';
    //limpa a lista para evitar que as tarefas sejam duplicadas toda vez que uma nova tarefa for adicionada.

    listaDeTarefas.forEach(function(tarefa,index){
        let listaHtml = document.createElement('li');
        listaHtml.innerText = tarefa;
        //para cada tarefa no array ListaDeTarefas, a função cria um elemento de lista (li) e define seu texto como a tarefa atual.

        let botaoDelete = document.createElement('button')
        botaoDelete.innerText= ' Excluir'
        //cria um botão de exclusão para cada tarefa, definindo seu texto como "Excluir".
       
        botaoDelete.addEventListener('click', function() {
            listaDeTarefas.splice(index, 1);
            renderizarTarefas();
            //adiciona um evento de clique ao botão de exclusão, que remove a tarefa correspondente do array ListaDeTarefas usando o método splice e, em seguida, chama a função renderizarTarefas para atualizar a lista exibida na tela.
        });

        listaHtml.appendChild(botaoDelete);
        lista.appendChild(listaHtml);
        //adiciona o botão de exclusão como um filho do elemento de lista (li) e, em seguida, adiciona o elemento de lista à lista principal (ul) para exibir a tarefa na tela.
        
    });

    
}

