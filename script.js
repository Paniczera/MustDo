const botao = document.querySelector('#botao');
const input = document.querySelector('#inputTarefa');

botao.onclick = function() {
    console.log(input.value);
    input.value = '';
    input.placeholder = 'Tarefa Adicionada!';

    setTimeout(function() {
        input.placeholder = 'Digite uma tarefa';
    }, 2000);
    

}