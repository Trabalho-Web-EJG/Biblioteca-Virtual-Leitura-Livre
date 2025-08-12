class Livro {
    constructor(id, titulo, autor, genero, capa, lido = false) {
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.capa = capa;
        this.lido = lido;
    }

    toggleLido() {
        this.lido = !this.lido;
    }
}