class Estante {
    constructor() {
        this.livros = JSON.parse(localStorage.getItem('estante')) || [];
    }

    adicionarLivro(livro) {
        if (!this.contemLivro(livro.id)) {
            this.livros.push({...livro, lido: false});
            this.salvar();
        }
    }

    removerLivro(indice) {
        this.livros.splice(indice, 1);
        this.salvar();
    }

    
    alternarStatusLeitura(indice) {
    if (indice >= 0 && indice < this.livros.length) {
        this.livros[indice].lido = !this.livros[indice].lido;
        this.salvar();
        return true; 
    }
    return false; 
    }

    contemLivro(id) {
        return this.livros.some(l => l.id === id);
    }

    livrosNaoLidos() {
        return this.livros.filter(l => !l.lido);
    }

    livrosLidos() {
        return this.livros.filter(l => l.lido);
    }

    salvar() {
        localStorage.setItem('estante', JSON.stringify(this.livros));
    }
}