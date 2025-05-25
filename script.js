// Variáveis globais
let currentAction = null;
let currentElement = null;

// Função principal para alternar entre seções
function showSection(sectionId) {
    console.log('Mostrando seção:', sectionId);

    // Esconder todas as seções
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Mostrar seção selecionada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Atualizar navegação
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));

    // Adicionar classe active ao botão clicado
    const clickedBtn = event ? event.target : document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
}

// Funções do Acervo
function adicionarLivro() {
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const isbn = document.getElementById('isbn').value;
    const categoria = document.getElementById('categoria').value;

    if (!titulo || !autor || !isbn) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
    }

    const table = document.getElementById('acervoTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.innerHTML = `
                <td>${titulo}</td>
                <td>${autor}</td>
                <td>${isbn}</td>
                <td>${categoria}</td>
                <td><span class="status status-disponivel">Disponível</span></td>
                <td>
                    <button class="btn" onclick="editarLivroForm(this)">Editar</button>
                    <button class="btn btn-danger" onclick="removerLivro(this)">Remover</button>
                </td>
            `;

    // Limpar formulário
    limparFormularioLivro();
    alert('Livro adicionado com sucesso!');
    atualizarEstatisticas();
}

function limparFormularioLivro() {
    document.getElementById('titulo').value = '';
    document.getElementById('autor').value = '';
    document.getElementById('isbn').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('ano').value = '';
    document.getElementById('editora').value = '';
}

function editarLivroForm(btn) {
    const row = btn.closest('tr');
    const cells = row.cells;

    document.getElementById('titulo').value = cells[0].textContent;
    document.getElementById('autor').value = cells[1].textContent;
    document.getElementById('isbn').value = cells[2].textContent;
    document.getElementById('categoria').value = cells[3].textContent.toLowerCase();
}

function editarLivro() {
    alert('Alterações salvas com sucesso!');
}

function removerLivro(btn) {
    currentAction = 'removerLivro';
    currentElement = btn;
    showModal('Remover Livro', 'Tem certeza que deseja remover este livro do acervo?');
}

function filtrarAcervo() {
    const filter = document.getElementById('searchAcervo').value.toLowerCase();
    const table = document.getElementById('acervoTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    }
}

// Funções de Empréstimos
function realizarEmprestimo() {
    const usuario = document.getElementById('usuarioEmprestimo').value;
    const livro = document.getElementById('livroEmprestimo').value;
    const dataEmprestimo = document.getElementById('dataEmprestimo').value;
    const dataDevolucao = document.getElementById('dataDevolucao').value;

    if (!usuario || !livro || !dataEmprestimo || !dataDevolucao) {
        alert('Por favor, preencha todos os campos!');
        return;
    }

    const table = document.getElementById('emprestimosTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const novoId = String(table.rows.length + 1).padStart(3, '0');

    newRow.innerHTML = `
                <td>${novoId}</td>
                <td>${document.getElementById('usuarioEmprestimo').selectedOptions[0].text}</td>
                <td>${document.getElementById('livroEmprestimo').selectedOptions[0].text}</td>
                <td>${new Date(dataEmprestimo).toLocaleDateString('pt-BR')}</td>
                <td>${new Date(dataDevolucao).toLocaleDateString('pt-BR')}</td>
                <td><span class="status status-emprestado">Emprestado</span></td>
                <td>
                    <button class="btn btn-success" onclick="devolverLivro(this)">Devolver</button>
                    <button class="btn" onclick="renovarEmprestimo(this)">Renovar</button>
                </td>
            `;

    // Limpar formulário
    limparFormularioEmprestimo();
    alert('Empréstimo realizado com sucesso!');
    atualizarEstatisticas();
}

function limparFormularioEmprestimo() {
    document.getElementById('usuarioEmprestimo').value = '';
    document.getElementById('livroEmprestimo').value = '';
    document.getElementById('dataEmprestimo').value = '';
    document.getElementById('dataDevolucao').value = '';
}

function devolverLivro(btn) {
    currentAction = 'devolverLivro';
    currentElement = btn;
    showModal('Devolver Livro', 'Confirmar devolução do livro?');
}

function renovarEmprestimo(btn) {
    const row = btn.closest('tr');
    const cells = row.cells;
    const dataAtual = new Date();
    const novaData = new Date(dataAtual.getTime() + (14 * 24 * 60 * 60 * 1000));

    cells[4].textContent = novaData.toLocaleDateString('pt-BR');
    alert('Empréstimo renovado por mais 14 dias!');
}

function filtrarEmprestimos() {
    const filter = document.getElementById('searchEmprestimos').value.toLowerCase();
    const table = document.getElementById('emprestimosTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    }
}

// Funções de Usuários
function adicionarUsuario() {
    const nome = document.getElementById('nomeUsuario').value;
    const email = document.getElementById('emailUsuario').value;
    const telefone = document.getElementById('telefoneUsuario').value;
    const tipo = document.getElementById('tipoUsuario').value;

    if (!nome || !email) {
        alert('Por favor, preencha os campos obrigatórios!');
        return;
    }

    const table = document.getElementById('usuariosTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    const novoId = String(table.rows.length + 1).padStart(3, '0');

    newRow.innerHTML = `
                <td>${novoId}</td>
                <td>${nome}</td>
                <td>${email}</td>
                <td>${telefone}</td>
                <td>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</td>
                <td>0</td>
                <td>
                    <button class="btn" onclick="editarUsuario(this)">Editar</button>
                    <button class="btn btn-danger" onclick="removerUsuario(this)">Remover</button>
                </td>
            `;

    // Limpar formulário
    limparFormularioUsuario();
    alert('Usuário adicionado com sucesso!');
    atualizarEstatisticas();
}

function limparFormularioUsuario() {
    document.getElementById('nomeUsuario').value = '';
    document.getElementById('emailUsuario').value = '';
    document.getElementById('telefoneUsuario').value = '';
    document.getElementById('tipoUsuario').value = 'estudante';
}

function editarUsuario(btn) {
    const row = btn.closest('tr');
    const cells = row.cells;

    document.getElementById('nomeUsuario').value = cells[1].textContent;
    document.getElementById('emailUsuario').value = cells[2].textContent;
    document.getElementById('telefoneUsuario').value = cells[3].textContent;
    document.getElementById('tipoUsuario').value = cells[4].textContent.toLowerCase();
}

function removerUsuario(btn) {
    currentAction = 'removerUsuario';
    currentElement = btn;
    showModal('Remover Usuário', 'Tem certeza que deseja remover este usuário?');
}

function filtrarUsuarios() {
    const filter = document.getElementById('searchUsuarios').value.toLowerCase();
    const table = document.getElementById('usuariosTable');
    const rows = table.getElementsByTagName('tr');

    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? '' : 'none';
    }
}

// Funções do Modal
function showModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('confirmModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('confirmModal').style.display = 'none';
    currentAction = null;
    currentElement = null;
}

function confirmAction() {
    if (currentAction === 'removerLivro' && currentElement) {
        const row = currentElement.closest('tr');
        row.remove();
        alert('Livro removido com sucesso!');
        atualizarEstatisticas();
    } else if (currentAction === 'removerUsuario' && currentElement) {
        const row = currentElement.closest('tr');
        row.remove();
        alert('Usuário removido com sucesso!');
        atualizarEstatisticas();
    } else if (currentAction === 'devolverLivro' && currentElement) {
        const row = currentElement.closest('tr');
        const statusCell = row.cells[5];
        statusCell.innerHTML = '<span class="status status-disponivel">Devolvido</span>';

        // Remover botões de ação
        const actionCell = row.cells[6];
        actionCell.innerHTML = '<span style="color: #28a745;">✓ Devolvido</span>';

        alert('Livro devolvido com sucesso!');
        atualizarEstatisticas();
    }

    closeModal();
}

// Função para atualizar estatísticas do dashboard
function atualizarEstatisticas() {
    // Contar livros no acervo
    const acervoRows = document.getElementById('acervoTable').getElementsByTagName('tbody')[0].rows;
    document.getElementById('totalLivros').textContent = acervoRows.length;

    // Contar empréstimos ativos
    const emprestimosRows = document.getElementById('emprestimosTable').getElementsByTagName('tbody')[0].rows;
    let emprestados = 0;
    let atrasados = 0;

    for (let row of emprestimosRows) {
        const status = row.cells[5].textContent;
        if (status.includes('Emprestado')) {
            emprestados++;
        } else if (status.includes('Atrasado')) {
            atrasados++;
        }
    }

    document.getElementById('livrosEmprestados').textContent = emprestados;
    document.getElementById('livrosAtrasados').textContent = atrasados;

    // Contar usuários
    const usuariosRows = document.getElementById('usuariosTable').getElementsByTagName('tbody')[0].rows;
    document.getElementById('usuariosAtivos').textContent = usuariosRows.length;
}

// Configurações iniciais quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
    console.log('Página carregada, configurando datas...');

    // Definir data atual nos campos de data
    const hoje = new Date().toISOString().split('T')[0];
    const campoDataEmprestimo = document.getElementById('dataEmprestimo');
    const campoDataDevolucao = document.getElementById('dataDevolucao');

    if (campoDataEmprestimo) {
        campoDataEmprestimo.value = hoje;
    }

    if (campoDataDevolucao) {
        // Data de devolução 14 dias após hoje
        const devolucao = new Date();
        devolucao.setDate(devolucao.getDate() + 14);
        campoDataDevolucao.value = devolucao.toISOString().split('T')[0];
    }
});

// Fechar modal clicando fora dele
window.onclick = function (event) {
    const modal = document.getElementById('confirmModal');
    if (event.target === modal) {
        closeModal();
    }
}

document.getElementById('current-year').textContent = new Date().getFullYear();

// Log para debug
console.log('Script carregado com sucesso!');