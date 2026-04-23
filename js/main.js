/* ============================================================
   Confraria Literária — main.js
   Shared JS: nav, scroll reveal, progress bar, filters,
   newsletter, hamburger menu, hero date auto-update
   ============================================================ */

/* ── SCROLL PROGRESS BAR ── */
(function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrolled / max : 0})`;
  }, { passive: true });
})();

/* ── NAV: glass on scroll ── */
(function initNav() {
  const header = document.getElementById('siteHeader');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
})();

/* ── HAMBURGER MENU ── */
(function initHamburger() {
  const btn = document.getElementById('hamburger');
  const menu = document.getElementById('mobileNav');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    const spans = btn.querySelectorAll('span');
    if (open) {
      spans[0].style.transform = 'rotate(45deg) translateY(6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
})();

/* ── SCROLL REVEAL (Intersection Observer) ── */
(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

/* ── REVIEW FILTER PILLS ── */
(function initFilters() {
  const pills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.review-card');
  if (!pills.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      // Update active pill
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.dataset.filter;

      cards.forEach(card => {
        if (filter === 'todos') {
          card.classList.remove('hidden');
          return;
        }
        const genres = (card.dataset.genre || '').split(' ');
        card.classList.toggle('hidden', !genres.includes(filter));
      });
    });
  });
})();

/* ── NEWSLETTER FORM ── */
function handleNewsletter(e) {
  e.preventDefault();
  const btn = document.getElementById('nlBtnText');
  const success = document.getElementById('nlSuccess');
  const emailInput = e.target.querySelector('input[type="email"]');

  if (!btn || !emailInput) return;

  const originalText = btn.textContent;
  btn.textContent = 'Enviando...';

  fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: emailInput.value })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        success.style.display = 'block';
        success.textContent = data.message;
        e.target.reset();
      } else {
        alert('Erro: ' + data.message);
      }
    })
    .catch(err => {
      console.error('Erro na newsletter:', err);
      alert('Não foi possível conectar ao servidor da newsletter. Verifique se o server.js está rodando.');
    })
    .finally(() => {
      btn.textContent = originalText;
    });
}

/* ── GLASS CARD CURSOR HIGHLIGHT ── */
(function initGlassHighlight() {
  const cards = document.querySelectorAll('.glass');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,253,253,.72) 0%, rgba(255,253,253,.55) 60%)`;
      card.style.backdropFilter = 'blur(20px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });
})();

/* ── BOOK COVER 3D TILT ── */
(function initTilt() {
  const books = document.querySelectorAll('.book-cover, .big-book');
  books.forEach(book => {
    book.addEventListener('mousemove', (e) => {
      const r = book.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const tx = ((e.clientX - cx) / (r.width / 2)) * 5;
      const ty = ((e.clientY - cy) / (r.height / 2)) * -5;
      book.style.transform = `perspective(800px) rotateX(${ty}deg) rotateY(${tx}deg) translateY(-4px)`;
    });
    book.addEventListener('mouseleave', () => {
      book.style.transform = '';
      book.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    });
    book.addEventListener('mouseenter', () => { book.style.transition = 'transform 0.1s ease'; });
  });
})();

/* ── PAGE LOAD FADE IN ── */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity .5s ease';
  requestAnimationFrame(() => requestAnimationFrame(() => { document.body.style.opacity = '1'; }));
});

/* ── HERO DATE AUTO-UPDATE ── */
(function initHeroDate() {
  const el = document.querySelector('.hero-editorial__date');
  if (!el) return;

  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const hoje = new Date();
  const mes = meses[hoje.getMonth()];
  const ano = hoje.getFullYear();

  el.textContent = `${mes} · ${ano}`;
})();
