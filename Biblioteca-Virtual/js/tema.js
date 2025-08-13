document.getElementById('alternar-tema').addEventListener('click', function() {
  const html = document.documentElement;
  const atual = html.getAttribute('data-bs-theme');
  
  if (atual === 'light') {
    html.setAttribute('data-bs-theme', 'dark');
    this.innerHTML = '<i class="fa-regular fa-sun me-1"></i>Modo Claro';
    localStorage.setItem('tema', 'dark');
  } else {
    html.setAttribute('data-bs-theme', 'light');
    this.innerHTML = '<i class="fa-regular fa-moon me-1"></i>Modo Noturno';
    localStorage.setItem('tema', 'light');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const temaSalvo = localStorage.getItem('tema') || 'light';
  const botaoTema = document.getElementById('alternar-tema');
  
  document.documentElement.setAttribute('data-bs-theme', temaSalvo);
  
  if (temaSalvo === 'dark') {
    botaoTema.innerHTML = '<i class="fa-regular fa-sun me-1"></i>Modo Claro';
  } else {
    botaoTema.innerHTML = '<i class="fa-regular fa-moon me-1"></i>Modo Noturno';
  }
});