const botao = document.querySelector('#botao');
const input = document.querySelector('#inputTarefa');
const lista = document.querySelector('#lista');

let tarefas = [];

botao.onclick = function() {
    tarefas.push(input.value);
    input.value = '';
    lista.innerHTML = '';
    tarefas.forEach(function(tarefa) {
        let li = document.createElement('li');
        li.innerText = tarefa;
        lista.appendChild(li);
    });
    input.placeholder = 'Tarefa Adicionada!';

    setTimeout(function() {
        input.placeholder = 'Digite uma tarefa';
    }, 2000);
};