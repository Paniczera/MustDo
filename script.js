const botao = document.querySelector('#botao');
const input = document.querySelector('#inputTarefa');
const tarefa1 = document.querySelector('#tarefa1')

botao.onclick = function() {
    console.log(input.value);
    tarefa1.innerText = input.value;
    input.value = '';
    input.placeholder = 'Tarefa Adicionada!';

    setTimeout(function() {
        input.placeholder = 'Digite uma tarefa';
    }, 2000);  
}

