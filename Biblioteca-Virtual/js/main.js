const biblioteca = new Biblioteca();
const estante = new Estante();
const gerenciador = new Gerenciador(biblioteca, estante);

window.gerenciador = gerenciador;

document.addEventListener('DOMContentLoaded', () => {
    gerenciador.mostrarLivros();
    gerenciador.atualizarEstante();
});