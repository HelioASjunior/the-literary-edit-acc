/* ============================================================
   Confraria Literária — review.js
   
   Heart Rating System:
   - Each review page has a unique data-review ID on #heartsInteractive
   - Ratings stored in localStorage as JSON: { total: number, count: number }
   - Key format: "rating_<reviewId>"
   - Users can only rate once per review (stored as "rated_<reviewId>")
   
   Comments System:
   - Each review page has a unique data-review ID on #commentForm
   - Comments stored in localStorage as JSON array: [{name, text, date}]
   - Key format: "comments_<reviewId>"
   - Each review is fully independent — adding a review here will not
     affect any other review page's data
   ============================================================ */

(function () {
  /* ── Determine review ID from the form element ── */
  const heartWidget = document.getElementById('heartsInteractive');
  const commentForm = document.getElementById('commentForm');
  const REVIEW_ID = (heartWidget || commentForm)?.dataset.review || 'unknown';

  const RATING_KEY = `rating_${REVIEW_ID}`;
  const RATED_KEY = `rated_${REVIEW_ID}`;
  const COMMENT_KEY = `comments_${REVIEW_ID}`;

  /* ============================================================
     HEART RATING SYSTEM
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

    /* Load existing aggregate data */
    function getRatingData() {
      try { return JSON.parse(localStorage.getItem(RATING_KEY)) || { total: 170, count: 36 }; }
      catch { return { total: 170, count: 36 }; }
    }

    /* Render the aggregate result display */
    function renderResult() {
      const data = getRatingData();
      const avg = data.count > 0 ? (data.total / data.count) : 0;
      const pct = (avg / 5) * 100;

      if (rrBar) rrBar.style.width = pct + '%';
      if (rrAvg) rrAvg.textContent = avg.toFixed(1);
      if (rrCount) rrCount.textContent = `${data.count} avaliação${data.count !== 1 ? 'ões' : ''}`;
    }
    renderResult();

    /* If user already rated, show rated state */
    if (hasRated) {
      const myRating = parseInt(hasRated);
      hearts.forEach((h, i) => {
        h.classList.toggle('rated', i < myRating);
        h.style.opacity = i < myRating ? '1' : '0.2';
      });
      if (label) label.textContent = `Você avaliou com ${myRating} coração${myRating !== 1 ? 'ões' : ''}`;
      return; // No more interaction after rating
    }

    /* Hover: highlight hearts up to hovered index */
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

    /* Click: submit rating */
    hearts.forEach((heart, idx) => {
      heart.addEventListener('click', () => {
        const value = idx + 1;

        // Save to localStorage
        const data = getRatingData();
        data.total += value;
        data.count += 1;
        localStorage.setItem(RATING_KEY, JSON.stringify(data));
        localStorage.setItem(RATED_KEY, String(value));

        // Freeze UI
        hearts.forEach((h, i) => {
          h.classList.toggle('rated', i < value);
          h.style.opacity = i < value ? '1' : '0.2';
        });
        if (label) {
          label.textContent = `Obrigada! Você avaliou com ${value} coração${value !== 1 ? 'ões' : ''}`;
          label.style.color = 'var(--crimson)';
        }

        // Animate result update
        setTimeout(renderResult, 300);
      });
    });
  })();

  /* ============================================================
     COMMENTS SYSTEM
     ============================================================ */
  (function initComments() {
    const list = document.getElementById('commentsList');
    const form = document.getElementById('commentForm');
    const count = document.getElementById('commentsCount');
    if (!list || !form) return;

    /* Load comments from localStorage */
    function getComments() {
      try { return JSON.parse(localStorage.getItem(COMMENT_KEY)) || []; }
      catch { return []; }
    }

    /* Save comments array */
    function saveComments(comments) {
      localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));
    }

    /* Format date in pt-BR */
    function formatDate(iso) {
      const d = new Date(iso);
      return d.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    /* Get initials for avatar */
    function getInitials(name) {
      return name.trim().split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
    }

    /* Render all comments */
    function renderComments() {
      const comments = getComments();

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

    /* Handle form submit */
    window.submitComment = function (e) {
      e.preventDefault();
      const nameEl = document.getElementById('commentName');
      const textEl = document.getElementById('commentText');
      const btnEl = document.getElementById('cfBtnText');
      if (!nameEl || !textEl) return;

      const name = nameEl.value.trim();
      const text = textEl.value.trim();
      if (!name || !text) return;

      btnEl.textContent = 'Publicando...';

      setTimeout(() => {
        const comments = getComments();
        comments.unshift({ name, text, date: new Date().toISOString() });
        saveComments(comments);
        renderComments();

        nameEl.value = '';
        textEl.value = '';
        btnEl.textContent = 'Publicar comentário';

        // Scroll to new comment
        list.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    };
  })();

  /* ── Escape HTML to prevent XSS ── */
  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
})();
