// Botão responsável por adicionar uma nova tarefa.
const botaoAdicionar = document.getElementById('botao');

// Campo onde o usuário digita a tarefa.
const inputTarefa = document.getElementById('inputTarefa');

// Lista (<ul>) exibida na página.
const listaDOM = document.getElementById('lista');

// Array principal da aplicação.
// Armazena todas as tarefas cadastradas.
let arrayTarefas = [];
let filtroAtual = "todas";

// Quando o botão for clicado, executa a função adicionaTarefa.
botaoAdicionar.addEventListener('click', adicionaTarefa);

function adicionaTarefa() {

    // Impede que tarefas vazias sejam adicionadas.
    if (inputTarefa.value.trim() === '') return;

    // Objeto que representa uma tarefa.
    const tarefa = {
        texto: inputTarefa.value,
        concluida: false,
    };

    // Adiciona a nova tarefa ao array.
    arrayTarefas.push(tarefa);

    // Limpa o campo de texto.
    inputTarefa.value = '';

    // Feedback visual para o usuário.
    inputTarefa.placeholder = 'Tarefa Adicionada!';

    // Após 2 segundos retorna o placeholder original.
    setTimeout(function() {
        inputTarefa.placeholder = 'Digite uma tarefa';
    }, 2000);

    localStorage.setItem('tarefaSalva', JSON.stringify(arrayTarefas));

    // Atualiza a lista exibida na tela.
    renderizarTarefas();
}

function renderizarTarefas() {

    // Limpa a lista antes de renderizar novamente.
    listaDOM.innerHTML = '';

    //cria um novo array filtrado, contendo apenas as tarefas que correspondem ao filtro selecionado.
    let tarefasFiltradas = arrayTarefas; // Por padrão, mostra todas as tarefas.

    if (filtroAtual === 'pendentes') {
        tarefasFiltradas = arrayTarefas.filter(tarefa => !tarefa.concluida);
    } else if (filtroAtual === 'concluidas') {
        tarefasFiltradas = arrayTarefas.filter(tarefa => tarefa.concluida === true);
    }    
    // Percorre cada tarefa armazenada no array.
    tarefasFiltradas.forEach(function(tarefa, indice) {

        // Cria o elemento visual (<li>) da tarefa.
        let tarefaDOM = document.createElement('li');
        tarefaDOM.classList.add('card-tarefa');

        // Define o símbolo de status.
        // ✓ = concluída
        // ☐ = pendente
        let statusTexto = tarefa.concluida ? '✓' : '☐';

        // Cria o span que exibirá o status.
        let statusSpan = document.createElement('span');
        statusSpan.innerText = statusTexto;

        // Cria o span que exibirá o texto da tarefa.
        let tarefaSpan = document.createElement('span');
        tarefaSpan.innerText = tarefa.texto;

        // Caso a tarefa esteja concluída,
        // aplica o efeito de texto riscado.
        if (tarefa.concluida) {
            tarefaSpan.style.textDecoration = 'line-through';
        }

        // Adiciona os spans ao <li>.
        tarefaDOM.appendChild(statusSpan);
        tarefaDOM.appendChild(tarefaSpan);

        // Cria o botão de conclusão.
        let botaoConcluir = document.createElement('button');
        botaoConcluir.classList.add('botaoConcluir');
        botaoConcluir.innerText = ' Concluída';

        // Cria o botão de exclusão.
        let botaoExcluir = document.createElement('button');
        botaoExcluir.classList.add('botaoExcluir');
        botaoExcluir.innerText = ' Excluir';

        // Ao clicar, alterna o status de conclusão da tarefa.
        botaoConcluir.addEventListener('click', function() {
            tarefa.concluida = !tarefa.concluida; 
            renderizarTarefas();
            //o "!" inverte o valor booleano, 
            //ou seja, se for true passa a ser false e vice-versa.
        });


        // Remove a tarefa do array.
        botaoExcluir.addEventListener('click', function() {
            let indiceReal = arrayTarefas.indexOf(tarefa);
            arrayTarefas.splice(indiceReal, 1);
            renderizarTarefas();
        });

        // Adiciona os botões ao <li>.
        tarefaDOM.appendChild(botaoConcluir);
        tarefaDOM.appendChild(botaoExcluir);

        // Adiciona o <li> à lista principal.
        listaDOM.appendChild(tarefaDOM);
    });
    
    
    salvarTarefas();
    estatisticas();
    porcentagem();
}

function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem('tarefaSalva');
    JSON.parse(tarefasSalvas) ? arrayTarefas = JSON.parse(tarefasSalvas) : arrayTarefas = [];
    renderizarTarefas();
}

function salvarTarefas() {
    localStorage.setItem('tarefaSalva', JSON.stringify(arrayTarefas));
}

function estatisticas() {
    let totalTarefas = arrayTarefas.length;
    // 2. Descobrir as Concluídas usando o .filter()
    // O filter cria uma lista temporária só com as tarefas que têm "concluida: true"
    let concluidas = arrayTarefas.filter(tarefa => tarefa.concluida === true).length;

    // 3. Descobrir as Pendentes
    let pendentes = totalTarefas - concluidas;
    //4. injetar os valores na página
    document.getElementById('totalTarefas').innerText = totalTarefas;
    document.getElementById('concluidaTarefas').innerText = concluidas;
    document.getElementById('pendenteTarefas').innerText = pendentes;
}

function porcentagem() {
    let totalTarefas = arrayTarefas.length;
    let concluidas = arrayTarefas.filter(tarefa => tarefa.concluida === true).length;
    let porcentagem = totalTarefas > 0 ? (concluidas / totalTarefas) * 100 : 0;
    document.getElementById('textoProgresso').innerText = `${porcentagem.toFixed(2)}%`;
    document.getElementById('barraProgresso').style.width = `${porcentagem}%`;
}

function modoDark() {
    const botaoDark = document.getElementById('botaoDark');
    botaoDark.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
}

function configurarFiltros() {
    // Busca todos os botões que têm a classe .btn-filtro (certifique-se de que no HTML eles têm essa classe!)
    const botoesFiltro = document.querySelectorAll('.btn-filtro'); 
    
    // O forEach é obrigatório aqui para passar de botão em botão
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remove a classe ativo de todos
            botoesFiltro.forEach(b => b.classList.remove('ativo'));
            
            // Adiciona só no que foi clicado
            this.classList.add('ativo');
            
            // Atualiza a variável global que criamos lá no topo
            filtroAtual = this.getAttribute('data-filtro');
            
            // Renderiza a lista novamente com a nova "lente"
            renderizarTarefas();
        });
    });
}

carregarTarefas();
modoDark();
configurarFiltros();