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
     HEART RATING SYSTEM (GLOBAL VIA API)
     ============================================================ */
  (function initRating() {
    const widget = document.getElementById('heartsInteractive');
    const label = document.getElementById('heartsLabel');
    
    // Bottom summary elements
    const rrBar = document.getElementById('rrBar');
    const rrAvg = document.getElementById('rrAvg');
    const rrCount = document.getElementById('rrCount');

    // Top summary elements (if they exist)
    const rsHeartsTop = document.getElementById('rsHeartsTop');
    const rsAvgTop = document.getElementById('rsAvgTop');
    const rsCountTop = document.getElementById('rsCountTop');

    if (!widget) return;

    const hearts = widget.querySelectorAll('.hi-heart');
    const hasRated = localStorage.getItem(RATED_KEY);

    async function fetchRatingData() {
      try {
        const response = await fetch(`/api/ratings?reviewId=${REVIEW_ID}`);
        const data = await response.json();
        return { average: data.average || 0, count: data.count || 0 };
      } catch (err) {
        console.error('Erro ao carregar avaliações:', err);
        return { average: 0, count: 0 };
      }
    }

    function updateSummaryUI(avg, count) {
      const pct = (avg / 5) * 100;
      const countText = `${count} avaliação${count !== 1 ? 'ões' : ''}`;
      
      // Update Bottom
      if (rrBar) rrBar.style.width = pct + '%';
      if (rrAvg) rrAvg.textContent = avg > 0 ? avg.toFixed(1) : '—';
      if (rrCount) rrCount.textContent = count > 0 ? countText : 'Seja a primeira a avaliar';

      // Update Top (if exists)
      if (rsAvgTop) rsAvgTop.textContent = avg > 0 ? avg.toFixed(1) : '—';
      if (rsCountTop) rsCountTop.textContent = count > 0 ? countText : 'Sem avaliações';
      if (rsHeartsTop) {
        const estrelas = [1, 2, 3, 4, 5].map(n => {
          const opacity = avg === 0 ? '0.3' : (n <= Math.round(avg) ? '1' : '0.3');
          return `<span style="opacity:${opacity}">🩷</span>`;
        }).join('');
        rsHeartsTop.innerHTML = estrelas;
      }
    }

    async function renderResult() {
      const data = await fetchRatingData();
      updateSummaryUI(data.average, data.count);
    }
    renderResult();

    if (hasRated) {
      const myRating = parseInt(hasRated);
      applyRatedStyle(myRating);
      if (label) label.textContent = `Você avaliou com ${myRating} coração${myRating !== 1 ? 'ões' : ''}`;
      return;
    }

    function applyRatedStyle(value) {
      hearts.forEach((h, i) => {
        h.classList.toggle('rated', i < value);
        h.style.opacity = i < value ? '1' : '0.2';
      });
    }

    hearts.forEach((heart, idx) => {
      heart.addEventListener('mouseenter', () => {
        if (localStorage.getItem(RATED_KEY)) {
          if (label) label.textContent = 'Você já avaliou esta resenha';
          return;
        }
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
      if (localStorage.getItem(RATED_KEY)) return;
      hearts.forEach(h => { h.classList.remove('hovered'); h.style.opacity = '0.25'; });
      if (label) { label.textContent = 'Passe o mouse para avaliar'; label.style.color = ''; }
    });

    hearts.forEach((heart, idx) => {
      heart.addEventListener('click', async () => {
        if (localStorage.getItem(RATED_KEY)) {
          if (window.showToast) {
            window.showToast('Você já avaliou esta resenha. Obrigada pelo carinho!', 'info');
          }
          return;
        }
        
        const value = idx + 1;
        localStorage.setItem(RATED_KEY, String(value));
        applyRatedStyle(value);

        if (label) {
          label.textContent = `Obrigada! Registrando sua nota...`;
          label.style.color = 'var(--crimson)';
        }

        // Optimistic UI Update: Calculate new local state for immediate sync
        const currentData = await fetchRatingData();
        const newCount = currentData.count + 1;
        const newTotal = (currentData.average * currentData.count) + value;
        const newAvg = newTotal / newCount;
        
        // Update both boxes immediately
        updateSummaryUI(newAvg, newCount);

        try {
          const response = await fetch('/api/ratings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nota: value, reviewId: REVIEW_ID })
          });

          if (response.ok) {
            if (label) label.textContent = `Obrigada! Você avaliou com ${value} coração${value !== 1 ? 'ões' : ''}`;
            // Optional: refresh again to get official server state if needed, 
            // but we already updated optimistically.
            await renderResult();
          }
        } catch (err) {
          console.error('Erro ao salvar avaliação:', err);
        }
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
