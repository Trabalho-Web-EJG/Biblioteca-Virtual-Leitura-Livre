const biblioteca = new Biblioteca();
const estante = new Estante();
const gerenciador = new Gerenciador(biblioteca, estante);

document.addEventListener('DOMContentLoaded', () => {
    gerenciador.mostrarLivros();
    gerenciador.atualizarEstante();
});

window.gerenciador = gerenciador;