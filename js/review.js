/* ============================================================
   Confraria Literária — review.js
   
   Heart Rating System:
   - Ratings stored in localStorage (Individual/Local only)
   
   Comments System:
   - Global Comments via Google Sheets API (/api/comments)
   ============================================================ */

(function () {
  const heartWidget = document.getElementById('heartsInteractive');
  const commentForm = document.getElementById('commentForm');
  const REVIEW_ID = (heartWidget || commentForm)?.dataset.review || 'unknown';

  const RATING_KEY = `rating_${REVIEW_ID}`;
  const RATED_KEY = `rated_${REVIEW_ID}`;

  /* ============================================================
     HEART RATING SYSTEM (Mantido Local por enquanto)
     ============================================================ */
  (function initRating() {
    const widget = document.getElementById('heartsInteractive');
    const label = document.getElementById('heartsLabel');
    const rrBar = document.getElementById('rrBar');
    const rrAvg = document.getElementById('rrAvg');
    const rrCount = document.getElementById('rrCount');
    if (!widget) return;

    const hearts = widget.querySelectorAll('.hi-heart');
    const hasRated = localStorage.getItem(RATED_KEY);

    function getRatingData() {
      try { return JSON.parse(localStorage.getItem(RATING_KEY)) || { total: 170, count: 36 }; }
      catch { return { total: 170, count: 36 }; }
    }

    function renderResult() {
      const data = getRatingData();
      const avg = data.count > 0 ? (data.total / data.count) : 0;
      const pct = (avg / 5) * 100;
      if (rrBar) rrBar.style.width = pct + '%';
      if (rrAvg) rrAvg.textContent = avg.toFixed(1);
      if (rrCount) rrCount.textContent = `${data.count} avaliação${data.count !== 1 ? 'ões' : ''}`;
    }
    renderResult();

    if (hasRated) {
      const myRating = parseInt(hasRated);
      hearts.forEach((h, i) => {
        h.classList.toggle('rated', i < myRating);
        h.style.opacity = i < myRating ? '1' : '0.2';
      });
      if (label) label.textContent = `Você avaliou com ${myRating} coração${myRating !== 1 ? 'ões' : ''}`;
      return;
    }

    hearts.forEach((heart, idx) => {
      heart.addEventListener('mouseenter', () => {
        hearts.forEach((h, i) => {
          h.classList.toggle('hovered', i <= idx);
          h.style.opacity = i <= idx ? '1' : '0.2';
        });
        const labels = ['', 'Um coração 🩷', 'Dois corações 🩷', 'Três corações 🩷', 'Quatro corações 🩷', 'Cinco corações 🩷'];
        if (label) {
          label.textContent = labels[idx + 1];
          label.style.color = 'var(--crimson)';
        }
      });
    });

    widget.addEventListener('mouseleave', () => {
      hearts.forEach(h => { h.classList.remove('hovered'); h.style.opacity = '0.25'; });
      if (label) { label.textContent = 'Passe o mouse para avaliar'; label.style.color = ''; }
    });

    hearts.forEach((heart, idx) => {
      heart.addEventListener('click', () => {
        const value = idx + 1;
        const data = getRatingData();
        data.total += value;
        data.count += 1;
        localStorage.setItem(RATING_KEY, JSON.stringify(data));
        localStorage.setItem(RATED_KEY, String(value));

        hearts.forEach((h, i) => {
          h.classList.toggle('rated', i < value);
          h.style.opacity = i < value ? '1' : '0.2';
        });
        if (label) {
          label.textContent = `Obrigada! Você avaliou com ${value} coração${value !== 1 ? 'ões' : ''}`;
          label.style.color = 'var(--crimson)';
        }
        setTimeout(renderResult, 300);
      });
    });
  })();

  /* ============================================================
     COMMENTS SYSTEM (GLOBAL VIA API)
     ============================================================ */
  (function initComments() {
    const list = document.getElementById('commentsList');
    const form = document.getElementById('commentForm');
    const count = document.getElementById('commentsCount');
    if (!list || !form) return;

    async function fetchComments() {
      try {
        const response = await fetch(`/api/comments?reviewId=${REVIEW_ID}`);
        const data = await response.json();
        return data.comments || [];
      } catch (err) {
        console.error('Erro ao carregar comentários:', err);
        return [];
      }
    }

    function formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    function getInitials(name) {
      return name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    }

    async function renderComments() {
      if (count) count.textContent = '(...)';
      const comments = await fetchComments();

      if (count) count.textContent = `(${comments.length})`;

      if (!comments.length) {
        list.innerHTML = `<p class="no-comments">Seja a primeira a comentar esta resenha.</p>`;
        return;
      }

      list.innerHTML = comments.map(c => `
        <div class="comment-item">
          <div class="comment-item__header">
            <div class="comment-avatar">${getInitials(c.name)}</div>
            <div>
              <div class="comment-name">${escapeHtml(c.name)}</div>
              <div class="comment-date">${formatDate(c.date)}</div>
            </div>
          </div>
          <p class="comment-text">${escapeHtml(c.text)}</p>
        </div>
      `).join('');
    }
    renderComments();

    window.submitComment = async function (e) {
      e.preventDefault();
      const nameEl = document.getElementById('commentName');
      const textEl = document.getElementById('commentText');
      const btnEl = document.getElementById('cfBtnText');
      if (!nameEl || !textEl) return;

      const name = nameEl.value.trim();
      const text = textEl.value.trim();
      if (!name || !text) return;

      btnEl.textContent = 'Publicando...';

      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, text, reviewId: REVIEW_ID })
        });

        if (response.ok) {
          nameEl.value = '';
          textEl.value = '';
          await renderComments();
          list.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (err) {
        console.error('Erro ao publicar:', err);
      } finally {
        btnEl.textContent = 'Publicar comentário';
      }
    };
  })();

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
})();
