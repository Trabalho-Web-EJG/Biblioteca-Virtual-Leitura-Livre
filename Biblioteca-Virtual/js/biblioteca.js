class Biblioteca {
    constructor() {
        this.livrosDisponiveis = [
            new Livro(1, "Dom Casmurro", "Machado de Assis", "Romance", "../img/domcasmurro.png"),
            new Livro(2, "A Moreninha", "Joaquim M. de Macedo", "Romance", "../img/moreninha.png"),
            new Livro(3, "Iracema", "José de Alencar", "Romance", "../img/iracema.png"),
            new Livro(4, "Os Sertões", "Euclides da Cunha", "Ficção", "../img/os sertoes.png"),
            new Livro(5, "O Guarani", "José de Alencar", "Aventura", "../img/guarani.png"),
            new Livro(6, "Memórias Póstumas", "Machado de Assis", "Ficção", "../img/memorias póstumas.png"),
            new Livro(7, "Marília de Dirceu", "T. A. Gonzaga", "Poesia", "../img/Marília de Dirceu.png"),
            new Livro(8, "O Ateneu", "Raul Pompeia", "Romance", "../img/o ateneu.png"),
            new Livro(9, "Policarpo Quaresma", "Lima Barreto", "Ficção", "../img/policarpo.png"),
            new Livro(10, "A Hora da Estrela", "Clarice Lispector", "Romance", "../img/estrela.png"),
            new Livro(11, "Senhora", "José de Alencar", "Romance", "../img/senhora.png"),
            new Livro(12, "Viagens na Minha Terra", "Garrett", "Aventura", "../img/viagens na minha terra.png")
        ];
    }

    buscarLivros(filtro = '', genero = '') {
        return this.livrosDisponiveis.filter(livro => {
            const correspondeBusca = livro.titulo.toLowerCase().includes(filtro.toLowerCase());
            const correspondeGenero = genero === '' || livro.genero === genero;
            return correspondeBusca && correspondeGenero;
        });
    }
}