const livrosDisponiveis = [
  { id: 1, titulo: "Dom Casmurro", autor: "Machado de Assis", genero: "Romance" },
  { id: 2, titulo: "A Moreninha", autor: "Joaquim M. de Macedo", genero: "Romance" },
  { id: 3, titulo: "Iracema", autor: "José de Alencar", genero: "Romance" },
  { id: 4, titulo: "Os Sertões", autor: "Euclides da Cunha", genero: "Ficção" },
  { id: 5, titulo: "O Guarani", autor: "José de Alencar", genero: "Aventura" },
  { id: 6, titulo: "Memórias Póstumas", autor: "Machado de Assis", genero: "Ficção" },
  { id: 7, titulo: "Marília de Dirceu", autor: "T. A. Gonzaga", genero: "Poesia" },
  { id: 8, titulo: "O Ateneu", autor: "Raul Pompeia", genero: "Romance" },
  { id: 9, titulo: "Policarpo Quaresma", autor: "Lima Barreto", genero: "Ficção" },
  { id: 10, titulo: "Canções", autor: "Castro Alves", genero: "Poesia" },
  { id: 11, titulo: "Senhora", autor: "José de Alencar", genero: "Romance" },
  { id: 12, titulo: "Viagens na Minha Terra", autor: "Garrett", genero: "Aventura" }
];

let estante = JSON.parse(localStorage.getItem('estante')) || [];

function salvarEstante() {
  localStorage.setItem('estante', JSON.stringify(estante));
}

function atualizarEstante() {
  const listaEstante = document.getElementById('lista-estante');
  const listaLidos = document.getElementById('lista-lidos');
  const contador = document.getElementById('contador-estante');

  listaEstante.innerHTML = '';
  listaLidos.innerHTML = '';

  estante.forEach((livro, indice) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
      <div>
        <strong>${livro.titulo}</strong> - ${livro.autor}
        <label class="ms-2">
          <input type="checkbox" ${livro.lido ? 'checked' : ''} onchange="alternarLido(${indice})">
          <small class="ms-1">Lido</small>
        </label>
      </div>
      <button class="btn btn-sm btn-danger" onclick="removerLivro(${indice})">
        <i class="fa fa-trash"></i>
      </button>
    `;

    if (livro.lido) {
      listaLidos.appendChild(li);
    } else {
      listaEstante.appendChild(li);
    }
  });

  contador.textContent = estante.filter(l => !l.lido).length;
  salvarEstante();
}

function adicionarLivro(id) {
  const livro = livrosDisponiveis.find(l => l.id === id);
  if (!estante.find(l => l.id === id)) {
    estante.push({ ...livro, lido: false });
    salvarEstante();
    atualizarEstante();
    mostrarLivros(); 
  }
}


function removerLivro(indice) {
  const livroRemovido = estante.splice(indice, 1)[0];
  salvarEstante();
  atualizarEstante();
  mostrarLivros(); 
}


function alternarLido(indice) {
  estante[indice].lido = !estante[indice].lido;
  atualizarEstante();
  mostrarLivros();
}

function mostrarLivros() {
  const container = document.getElementById('lista-livros');
  const busca = document.getElementById('busca').value.toLowerCase();
  const genero = document.getElementById('filtro-genero').value;
  container.innerHTML = '';

  livrosDisponiveis
    .filter(livro =>
      livro.titulo.toLowerCase().includes(busca) &&
      (genero === "" || livro.genero === genero) &&
      !estante.find(e => e.id === livro.id) 
    )
    .forEach(livro => {
      const coluna = document.createElement('div');
      coluna.className = 'col-md-6 col-lg-4 col-xl-3';
      coluna.innerHTML = `
        <div class="card shadow-sm rounded-4 mb-4 h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${livro.titulo}</h5>
            <p class="card-text mb-3">
              <small><strong>${livro.autor}</strong><br>${livro.genero}</small>
            </p>
            <button class="btn btn-success mt-auto" onclick="adicionarLivro(${livro.id})">
              <i class="fa fa-plus me-1"></i>Adicionar à Estante
            </button>
          </div>
        </div>
      `;
      container.appendChild(coluna);
    });
}


document.getElementById('busca').addEventListener('input', mostrarLivros);
document.getElementById('filtro-genero').addEventListener('change', mostrarLivros);

document.getElementById('alternar-tema').addEventListener('click', () => {
  document.body.classList.toggle('modo-escuro');
  const botao = document.getElementById('alternar-tema');
  if (document.body.classList.contains('modo-escuro')) {
    botao.innerHTML = '<i class="fa-regular fa-sun me-1"></i>Modo Claro';
  } else {
    botao.innerHTML = '<i class="fa-regular fa-moon me-1"></i>Modo Noturno';
  }
});

mostrarLivros();
atualizarEstante();
