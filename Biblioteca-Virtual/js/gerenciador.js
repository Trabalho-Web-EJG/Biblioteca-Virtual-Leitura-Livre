class Gerenciador {
  constructor(biblioteca, estante) {
    this.biblioteca = biblioteca;
    this.estante = estante;
    this.initEventos();
  }

  initEventos() {
    document.getElementById("busca").addEventListener("input", () => this.mostrarLivros());
    document.getElementById("filtro-genero").addEventListener("change", () => this.mostrarLivros());
  }

  mostrarLivros() {
    const busca = document.getElementById("busca").value;
    const genero = document.getElementById("filtro-genero").value;
    const livrosFiltrados = this.biblioteca
      .buscarLivros(busca, genero)
      .filter((livro) => !this.estante.contemLivro(livro.id));

    this.renderizarLivros(livrosFiltrados);
  }

  renderizarLivros(livros) {
    const container = document.getElementById("lista-livros");
    container.innerHTML = "";

    livros.forEach((livro) => {
      const coluna = document.createElement("div");
      coluna.className = "col-md-6 col-lg-4 col-xl-3 mb-4";
      coluna.innerHTML = this.criarCardLivro(livro);
      container.appendChild(coluna);
    });
  }

  criarCardLivro(livro) {
    return `
      <div class="card shadow-sm h-100">
    <img src="${livro.capa}" class="card-img-top" alt="Capa do livro ${livro.titulo}">
    <div class="card-body d-flex flex-column">
        <h5 class="card-title">${livro.titulo}</h5>
        <p class="card-text mb-2">
            <small class="text-muted">${livro.autor}</small>
        </p>
        
        <div class="mt-auto"> 
            <span class="badge bg-secondary d-block mb-2">${livro.genero}</span>
            <button class="btn btn-success w-100" onclick="gerenciador.adicionarLivro(${livro.id})">
                <i class="fa fa-plus me-1"></i>Adicionar à Estante
            </button>
        </div>
    </div>
</div>
    `;
  }

  atualizarEstante() {
    this.renderizarListaEstante();
    this.renderizarListaLidos();
    this.atualizarContador();
  }

  renderizarListaEstante() {
    const lista = document.getElementById('lista-estante');
    lista.innerHTML = '';
    
    this.estante.livros.forEach((livro, indice) => {
      if (!livro.lido) {
        lista.appendChild(this.criarItemLista(livro, indice));
      }
    });
  }

  renderizarListaLidos() {
    const lista = document.getElementById('lista-lidos');
    lista.innerHTML = '';
    
    this.estante.livros.forEach((livro, indice) => {
      if (livro.lido) {
        lista.appendChild(this.criarItemLista(livro, indice));
      }
    });
  }

  criarItemLista(livro, indice) {
    const li = document.createElement('li');
    li.className = `list-group-item d-flex justify-content-between align-items-center ${livro.lido ? 'list-group-item-success' : ''}`;
    
    li.innerHTML = `
      <div class="d-flex align-items-center">
        <img src="${livro.capa}" class="miniatura-capa" alt="Capa ${livro.titulo}">
        <div>
          <strong>${livro.titulo}</strong><br>
          <small class="text-muted">${livro.autor}</small>
          <div class="form-check form-switch mt-1">
            <input class="form-check-input" type="checkbox" role="switch" 
                   id="lido-${indice}" ${livro.lido ? 'checked' : ''}
                   onchange="gerenciador.alternarStatusLeitura(${indice})">
            <label class="form-check-label" for="lido-${indice}">
              <small>${livro.lido ? 'Lido' : 'Não lido'}</small>
            </label>
          </div>
        </div>
      </div>
      <button class="btn btn-sm btn-danger" onclick="gerenciador.removerLivro(${indice})">
        <i class="fa fa-trash"></i>
      </button>
    `;
    
    return li;
  }

  atualizarContador() {
    document.getElementById("contador-estante").textContent =
      this.estante.livrosNaoLidos().length;
  }

  adicionarLivro(id) {
    const livro = this.biblioteca.livrosDisponiveis.find((l) => l.id === id);
    if (livro) {
      this.estante.adicionarLivro(livro);
      this.mostrarLivros();
      this.atualizarEstante();
    }
  }

  removerLivro(indice) {
    this.estante.removerLivro(indice);
    this.mostrarLivros();
    this.atualizarEstante();
  }

  alternarStatusLeitura(indice) {
    const sucesso = this.estante.alternarStatusLeitura(indice);
    if (sucesso) {
      this.atualizarEstante();
    } else {
      console.error("Falha ao alternar status de leitura para o índice:", indice);
    }
  }
}