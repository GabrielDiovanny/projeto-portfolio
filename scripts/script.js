// =============================
// BOTÃO TEMA CLARO / ESCURO
// =============================

const botao = document.getElementById('botao-tema');
const iconeTema = document.getElementById('icone-tema');
const body = document.body;

const temaSalvo = localStorage.getItem('tema');
aplicarTema(temaSalvo === 'escuro');

function aplicarTema(escuro) {
  body.classList.toggle('escuro', escuro);
  if (iconeTema) iconeTema.textContent = escuro ? 'light_mode' : 'dark_mode';
}

if (botao) {
  botao.addEventListener('click', (e) => {
    e.preventDefault();
    const escuro = !body.classList.contains('escuro');
    aplicarTema(escuro);
    localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
  });
}

// =============================
// SCROLL SUAVE (MANUAL, MAIS LISO)
// =============================

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration = 900) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);

    window.scrollTo(0, startY + diff * eased);

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const navLinks = document.querySelectorAll('#menu ul a.link');

navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const destino = document.querySelector(this.getAttribute('href'));
    if (!destino) return;

    const header = document.querySelector('header');
    const alturaHeader = header ? header.offsetHeight : 0;

    const posicao = destino.getBoundingClientRect().top + window.scrollY - alturaHeader - 20;

    smoothScrollTo(posicao, 900); // aumenta pra 1100 se quiser MAIS devagar
  });
});