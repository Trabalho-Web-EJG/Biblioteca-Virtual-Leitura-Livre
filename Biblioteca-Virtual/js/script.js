const livrosDisponiveis = [
  { 
    id: 1, 
    titulo: "Dom Casmurro", 
    autor: "Machado de Assis", 
    genero: "Romance",
    capa: "../img/domcasmurro.png" 
  },
  { 
    id: 2, 
    titulo: "A Moreninha", 
    autor: "Joaquim M. de Macedo", 
    genero: "Romance",
    capa: "../img/moreninha.png" 
  },
  { 
    id: 3, 
    titulo: "Iracema", 
    autor: "José de Alencar", 
    genero: "Romance",
    capa: "../img/iracema.png" 
  },
  { 
    id: 4, 
    titulo: "Os Sertões", 
    autor: "Euclides da Cunha", 
    genero: "Ficção",
    capa: "../img/os sertoes.png" 
  },
  { 
    id: 5, 
    titulo: "O Guarani", 
    autor: "José de Alencar", 
    genero: "Aventura",
    capa: "../img/guarani.png" 
  },
  { 
    id: 6, 
    titulo: "Memórias Póstumas", 
    autor: "Machado de Assis", 
    genero: "Ficção",
    capa: "../img/memorias póstumas.png" 
  },
  { 
    id: 7, 
    titulo: "Marília de Dirceu", 
    autor: "T. A. Gonzaga", 
    genero: "Poesia",
    capa: "../img/Marília de Dirceu.png" 
  },
  { 
    id: 8, 
    titulo: "O Ateneu", 
    autor: "Raul Pompeia", 
    genero: "Romance",
    capa: "../img/o ateneu.png" 
  },
  { 
    id: 9, 
    titulo: "Policarpo Quaresma", 
    autor: "Lima Barreto", 
    genero: "Ficção",
    capa: "../img/policarpo.png" 
  },
  { 
    id: 10, 
    titulo: "A Hora da Estrela", 
    autor: "Clarice Lispector", 
    genero: "Romance",
    capa: "../img/estrela.png" 
  },
  { 
    id: 11, 
    titulo: "Senhora", 
    autor: "José de Alencar", 
    genero: "Romance",
    capa: "../img/senhora.png" 
  },
  { 
    id: 12, 
    titulo: "Viagens na Minha Terra", 
    autor: "Garrett", 
    genero: "Aventura",
    capa: "../img/viagens na minha terra.png" 
  }
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
      <div class="d-flex align-items-center">
        <img src="${livro.capa}" class="miniatura-capa" alt="Capa ${livro.titulo}">
        <div>
          <strong>${livro.titulo}</strong><br>
          <small class="text-muted">${livro.autor}</small>
          <label class="ms-2 d-block mt-1">
            <input type="checkbox" ${livro.lido ? 'checked' : ''} onchange="alternarLido(${indice})">
            <small class="ms-1">Lido</small>
          </label>
        </div>
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
      coluna.className = 'col-md-6 col-lg-4 col-xl-3 mb-4';
      coluna.innerHTML = `
        <div class="card shadow-sm h-100">
          <img src="${livro.capa}" class="card-img-top" alt="Capa do livro ${livro.titulo}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${livro.titulo}</h5>
            <p class="card-text mb-2">
              <small class="text-muted">${livro.autor}</small>
            </p>
            <span class="badge bg-secondary mb-3">${livro.genero}</span>
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