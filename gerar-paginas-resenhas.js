/**
 * Confraria Literária — Gerador de Páginas de Resenhas
 * =====================================================
 * Como usar:
 *   1. Adicione a resenha no arquivo resenhas.js
 *   2. Execute: node gerar-paginas-resenhas.js
 *   3. O arquivo pages/<slug>.html será criado automaticamente
 *
 * Ou gere apenas uma resenha específica:
 *   node gerar-paginas-resenhas.js minha-resenha
 */

const fs = require('fs');
const path = require('path');
const { enviarNewsletter } = require('./js/mailer.js');

/* ── Carrega o arquivo de dados ── */
const resenhasFile = path.join(__dirname, 'resenhas.js');
if (!fs.existsSync(resenhasFile)) {
  console.error('❌  Arquivo resenhas.js não encontrado!');
  process.exit(1);
}

// Extrai o array window.RESENHAS do arquivo JS
const raw = fs.readFileSync(resenhasFile, 'utf8');
// Substitui window.RESENHAS = [...] por module.exports = [...]
const moduleCode = raw
  .replace(/window\.RESENHAS\s*=/, 'module.exports =')
  // Remove comentários de bloco dentro do array que podem causar syntax error
  .replace(/\/\* ── ADICIONE[\s\S]*?─── \*\//g, '');

// Escreve temporariamente e carrega como módulo
const tmpFile = path.join(__dirname, '_resenhas_tmp.js');
fs.writeFileSync(tmpFile, moduleCode, 'utf8');

let RESENHAS;
try {
  RESENHAS = require(tmpFile);
} catch (err) {
  fs.unlinkSync(tmpFile);
  console.error('❌  Erro ao carregar resenhas.js:', err.message);
  process.exit(1);
}
fs.unlinkSync(tmpFile);

/* ── Filtro por slug (argumento opcional) ── */
const slugAlvo = process.argv[2];
const lista = slugAlvo
  ? RESENHAS.filter(r => r.slug === slugAlvo)
  : RESENHAS;

if (!lista.length) {
  console.error(`❌  Nenhuma resenha encontrada${slugAlvo ? ` com slug "${slugAlvo}"` : ''}.`);
  process.exit(1);
}

/* ── Função que gera o HTML ── */
function gerarHTML(r) {

  // Resenhas relacionadas: as outras 3 (ou menos) do array, excluindo a atual
  const relacionadas = RESENHAS
    .filter(x => x.slug !== r.slug)
    .slice(0, 3)
    .map(x => `
        <a href="${x.slug}.html" class="related-card glass">
          <div class="related-cover" style="background:${x.faceGradient}">
            <div class="related-spine" style="background:${x.spineColor}"></div>
          </div>
          <div class="related-info">
            <span class="related-genre">${x.genero.split('·')[0].trim()}</span>
            <h4>${x.titulo}</h4>
            <p>${x.autora}</p>
          </div>
        </a>`).join('\n');

  // Tags
  const tagsHTML = (r.tags || [])
    .map(t => `<span class="tag">${t}</span>`)
    .join('\n        ');

  // Estrelas de avaliação no hero
  const notaNum = parseFloat(r.notaMedia);
  const estrelas = [1, 2, 3, 4, 5].map(n => {
    const opacity = isNaN(notaNum) ? '0.2' : (n <= Math.round(notaNum) ? '1' : '0.2');
    return `<span style="opacity:${opacity}">🩷</span>`;
  }).join('');

  const ratingHeroHTML = `
          <div class="rating-summary glass">
            <div class="rs-hearts" id="rsHeartsTop">${estrelas}</div>
            <div class="rs-numbers">
              <span class="rs-avg" id="rsAvgTop">${r.notaMedia || '—'}</span>
              <span class="rs-count" id="rsCountTop">${r.notaContagem || 'Sem avaliações'}</span>
            </div>
          </div>`;

  return `<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${r.titulo} · Resenha — Confraria Literária</title>
  <meta name="description" content="${r.resumo}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:ital,wght@1,400;1,600&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/review.css" />
  <link rel="icon" type="image/png" href="../assets/favicon.png" />
</head>

<body class="review-page">

  <div class="progress-bar" id="progressBar"></div>

  <!-- ── HEADER ── -->
  <header class="site-header" id="siteHeader">
    <div class="header__inner">
      <nav class="header__meta">
        <a href="../index.html">Início</a>
        <a href="../pages/sobre.html">Sobre mim</a>
        <a href="../index.html#newsletter">Newsletter</a>
      </nav>
      <a href="../index.html" class="site-logo">Confraria<em>Literária</em></a>
      <nav class="header__nav">
        <a href="../index.html#leitura-atual">Leitura Atual</a>
        <a href="../index.html#resenhas">Resenhas</a>
        <a href="../index.html#favoritos">Favoritos</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-nav" id="mobileNav">
      <a href="../index.html">Início</a>
      <a href="../pages/sobre.html">Sobre mim</a>
      <a href="../index.html#resenhas">Resenhas</a>
      <a href="../index.html#favoritos">Favoritos</a>
      <a href="../index.html#newsletter">Newsletter</a>
    </div>
  </header>

  <!-- ── REVIEW HERO ── -->
  <section class="review-hero">
    <div class="review-hero__inner">
      <!-- breadcrumb -->
      <nav class="breadcrumb reveal">
        <a href="../index.html">Início</a>
        <span>/</span>
        <a href="../index.html#resenhas">Resenhas</a>
        <span>/</span>
        <span>${r.titulo}</span>
      </nav>

      <div class="review-hero__grid">
        <!-- Book cover -->
        <div class="review-hero__cover reveal">
          <div class="book-cover book-cover--review"
            style="--spine:${r.spineColor};--face:${r.faceGradient}">
            <div class="book-cover__spine"></div>
            <div class="book-cover__face">
              <div class="book-cover__ornament">${r.ornamento || '✦'}</div>
              <div class="book-cover__title-book">"${r.titulo}"</div>
              <div class="book-cover__author-book">${r.autora}</div>
            </div>
          </div>
          <div class="cover-shadow"></div>

          <!-- Book info sidebar -->
          <div class="book-info-card glass">
            <div class="bic-row"><span class="bic-label">Autora</span><span class="bic-val">${r.autora}</span></div>
            <div class="bic-row"><span class="bic-label">Gênero</span><span class="bic-val">${r.genero}</span></div>
            <div class="bic-row"><span class="bic-label">Páginas</span><span class="bic-val">${r.paginas}</span></div>
            <div class="bic-row"><span class="bic-label">Publicado</span><span class="bic-val">${r.publicado}</span></div>
          </div>
        </div>

        <!-- Review meta -->
        <div class="review-hero__meta reveal reveal--delay">
          <div class="review-genre-tag">${r.genero}</div>
          <h1 class="review-hero__title">
            ${r.tituloResenha}
          </h1>
          <div class="review-hero__byline">
            <span>Por <strong>Confraria Literária</strong></span>
            <span class="byline-sep">·</span>
            <span>${r.dataFormatada}</span>
          </div>
          ${ratingHeroHTML}
        </div>
      </div>
    </div>

    <div class="blob blob--review-1"></div>
    <div class="blob blob--review-2"></div>
  </section>

  <!-- ── REVIEW BODY ── -->
  <article class="review-article">
    <div class="review-article__inner">

      <div class="review-article__lead reveal">
        ${r.conteudo}
      </div>

      <!-- Tags -->
      <div class="review-tags reveal">
        ${tagsHTML}
      </div>

    </div>
  </article>

  <!-- ── HEART RATING ── -->
  <section class="rating-section" id="ratingSection">
    <div class="rating-section__inner">
      <h3 class="rating-section__title">Avalie esta resenha</h3>
      <p class="rating-section__sub">Quantos corações você dá para esta leitura?</p>

      <div class="hearts-interactive" id="heartsInteractive" data-review="${r.slug}">
        <button class="hi-heart" data-value="1" aria-label="1 coração">🩷</button>
        <button class="hi-heart" data-value="2" aria-label="2 corações">🩷</button>
        <button class="hi-heart" data-value="3" aria-label="3 corações">🩷</button>
        <button class="hi-heart" data-value="4" aria-label="4 corações">🩷</button>
        <button class="hi-heart" data-value="5" aria-label="5 corações">🩷</button>
      </div>
      <div class="hearts-label" id="heartsLabel">Passe o mouse para avaliar</div>

      <div class="rating-result" id="ratingResult">
        <div class="rr-bar-wrap">
          <div class="rr-bar" id="rrBar"></div>
        </div>
        <div class="rr-numbers">
          <span class="rr-avg" id="rrAvg">—</span>
          <span class="rr-count" id="rrCount">Seja a primeira a avaliar</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── COMMENTS ── -->
  <section class="comments-section" id="commentsSection">
    <div class="comments-section__inner">
      <h3 class="comments-title">
        Comentários
        <span class="comments-count" id="commentsCount">(0)</span>
      </h3>

      <form class="comment-form glass" id="commentForm" data-review="${r.slug}" onsubmit="submitComment(event)">
        <h4 class="cf-title">Deixe seu comentário</h4>
        <input type="text" class="cf-input" id="commentName" placeholder="Seu nome" required maxlength="60" />
        <textarea class="cf-textarea" id="commentText" placeholder="O que você achou desta resenha?" required
          maxlength="1000" rows="4"></textarea>
        <button type="submit" class="cf-submit">
          <span id="cfBtnText">Publicar comentário</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </form>

      <div class="comments-list" id="commentsList">
        <!-- Populated by JS -->
      </div>
    </div>
  </section>

  <!-- ── RELATED REVIEWS ── -->
  <section class="related-reviews">
    <div class="related-reviews__inner">
      <div class="section-label"><span class="dot"></span> Continue lendo</div>
      <h3 class="related-title">Outras resenhas</h3>
      <div class="related-grid">
        ${relacionadas || '<p style="color:#7a3850;font-size:.9rem;">Mais resenhas em breve.</p>'}
      </div>
    </div>
  </section>

  <!-- ── FOOTER ── -->
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="sf-top">
        <div class="sf-brand">
          <div class="sf-logo">Confraria<em>Literária</em></div>
          <p>Um espaço editorial para mulheres que lêem com profundidade.</p>
        </div>
        <div class="sf-links">
          <div class="sf-col">
            <h4>Navegação</h4>
            <a href="../pages/sobre.html">Sobre mim</a>
            <a href="../index.html#resenhas">Resenhas</a>
            <a href="../index.html#favoritos">Favoritos</a>
          </div>
          <div class="sf-col">
            <h4>Contato</h4>
            <a href="https://www.linkedin.com/in/ana-carolina-craveiro-250502403/" target="_blank">LinkedIn</a>
            <a href="https://www.instagram.com/carolinacraveirodaily" target="_blank">Instagram</a>
            <a href="https://skoob.com.br/profile/695d5137d8551d03d7e8759c-carolinacraveiro" target="_blank">Skoob</a>
          </div>
        </div>
      </div>
      <div class="sf-bottom">
        <span>© ${new Date().getFullYear()} Ana Carolina Craveiro 🩷</span>
        <span>Site Desenvolvido por <a href="https://www.linkedin.com/in/heliojunior1218/">Hélio Jr</a></span>
      </div>
    </div>
  </footer>

  <!-- Floating Socials -->
  <div class="floating-socials visible">
    <a href="https://www.instagram.com/carolinacraveirodaily" target="_blank" class="float-btn" aria-label="Instagram" title="Instagram">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    </a>
    <a href="https://skoob.com.br/profile/695d5137d8551d03d7e8759c-carolinacraveiro" target="_blank" class="float-btn" aria-label="Skoob" title="Skoob">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    </a>
  </div>

  <script src="../js/main.js"></script>
  <script src="../js/review.js"></script>
</body>

</html>`;
}

/* ── Gera os arquivos ── */
const pagesDir = path.join(__dirname, 'pages');

lista.forEach(r => {
  const html = gerarHTML(r);
  const destino = path.join(pagesDir, `${r.slug}.html`);
  const existe = fs.existsSync(destino);

  fs.writeFileSync(destino, html, 'utf8');

  const status = existe ? '♻️  Atualizado' : '✅  Criado';
  console.log(`${status}: pages/${r.slug}.html`);
});

/* ── ATUALIZA O INDEX.HTML (HOMEPAGE) ── */
const indexPath = path.join(__dirname, 'index.html');
if (fs.existsSync(indexPath) && !slugAlvo) { // Só atualiza o index se estiver gerando tudo
  console.log('\n🔄  Atualizando cards na homepage (index.html)...');
  let indexHTML = fs.readFileSync(indexPath, 'utf8');

  // Limite de 6 na página inicial
  const cardsHTML = RESENHAS.slice(0, 6).map((r, index) => {
    // Calcula as estrelas do card
    const notaNum = parseFloat(r.notaMedia);
    const estrelas = [1, 2, 3, 4, 5].map(n => {
      const opacity = isNaN(notaNum) ? '0.3' : (n <= Math.round(notaNum) ? '1' : '0.3');
      return `<span style="opacity:${opacity}">🩷</span>`;
    }).join('');

    // Estrela de favorita
    const favHTML = r.generoFiltro.includes('favoritos') ? '\n                <span class="rc-fav" title="Favorita">⭑</span>' : '';

    // Classes de animação com delay (0, 1, 2, 0, 1, 2...)
    const delays = ['', ' reveal--delay', ' reveal--delay-2'];
    const delayClass = delays[index % 3];

    // Nome do gênero principal
    const generoPrincipal = r.genero.split('·')[0].trim();

    return `
        <!-- Review card ${index + 1} -->
        <article class="review-card glass reveal${delayClass}" data-genre="${r.generoFiltro}">
          <a href="pages/${r.slug}.html" class="review-card__link">
            <div class="review-card__cover" style="--g:${r.faceGradient};--s:${r.spineColor}">
              <div class="rc-spine"></div>
              <div class="rc-face">
                <div class="rc-ornament">${r.ornamento || '✦'}</div>
                <div class="rc-title">${r.titulo}</div>
                <div class="rc-author">${r.autora}</div>
              </div>
            </div>
            <div class="review-card__body">
              <div class="rc-meta">
                <span class="rc-genre-tag">${generoPrincipal}</span>${favHTML}
              </div>
              <h3 class="rc-title-text">${r.tituloResenha}</h3>
              <p class="rc-excerpt">${r.resumo}</p>
              <div class="rc-footer">
                <div class="rc-hearts">
                  ${estrelas}
                </div>
                <span class="rc-date">${r.dataFormatada}</span>
              </div>
            </div>
          </a>
        </article>`;
  }).join('\n');

  const regex = /(<div class="reviews-grid" id="reviewsGrid">\s*)([\s\S]*?)(\s*<\/div><!-- \/reviews-grid -->)/;

  if (regex.test(indexHTML)) {
    indexHTML = indexHTML.replace(regex, `$1${cardsHTML}$3`);
    fs.writeFileSync(indexPath, indexHTML, 'utf8');
    console.log('✅  Homepage atualizada com sucesso (últimas 6 resenhas)!');
  } else {
    console.warn('⚠️  Aviso: Não foi possível encontrar a div reviewsGrid no index.html para atualizar.');
  }

  // ── GERA AS PÁGINAS DE ARQUIVO (PAGINAÇÃO) ──
  console.log('\n🔄  Gerando páginas do arquivo (todas as resenhas)...');
  const ITENS_POR_PAGINA = 6;
  const totalPaginas = Math.ceil(RESENHAS.length / ITENS_POR_PAGINA);

  for (let i = 1; i <= totalPaginas; i++) {
    const inicio = (i - 1) * ITENS_POR_PAGINA;
    const fim = inicio + ITENS_POR_PAGINA;
    const resenhasPagina = RESENHAS.slice(inicio, fim);

    const paginaHTML = gerarListaHTML(i, resenhasPagina, totalPaginas);
    const nomeArquivo = i === 1 ? 'todas-resenhas.html' : `todas-resenhas-${i}.html`;
    fs.writeFileSync(path.join(pagesDir, nomeArquivo), paginaHTML, 'utf8');
    console.log(`✅  Criado: pages/${nomeArquivo}`);
  }
}

function gerarListaHTML(paginaNum, resenhasPagina, totalPaginas) {
  const cardsHTML = resenhasPagina.map((r, index) => {
    const notaNum = parseFloat(r.notaMedia);
    const estrelas = [1, 2, 3, 4, 5].map(n => {
      const opacity = isNaN(notaNum) ? '0.3' : (n <= Math.round(notaNum) ? '1' : '0.3');
      return `<span style="opacity:${opacity}">🩷</span>`;
    }).join('');
    const favHTML = r.generoFiltro.includes('favoritos') ? '<span class="rc-fav" title="Favorita">⭑</span>' : '';
    const generoPrincipal = r.genero.split('·')[0].trim();

    return `
        <article class="review-card glass" data-genre="${r.generoFiltro}">
          <a href="${r.slug}.html" class="review-card__link">
            <div class="review-card__cover" style="--g:${r.faceGradient};--s:${r.spineColor}">
              <div class="rc-spine"></div>
              <div class="rc-face">
                <div class="rc-ornament">${r.ornamento || '✦'}</div>
                <div class="rc-title">${r.titulo}</div>
                <div class="rc-author">${r.autora}</div>
              </div>
            </div>
            <div class="review-card__body">
              <div class="rc-meta">
                <span class="rc-genre-tag">${generoPrincipal}</span>${favHTML}
              </div>
              <h3 class="rc-title-text">${r.tituloResenha}</h3>
              <p class="rc-excerpt">${r.resumo}</p>
              <div class="rc-footer">
                <div class="rc-hearts">${estrelas}</div>
                <span class="rc-date">${r.dataFormatada}</span>
              </div>
            </div>
          </a>
        </article>`;
  }).join('\n');

  let paginacaoHTML = '';
  if (totalPaginas > 1) {
    paginacaoHTML = '<div class="pagination" style="text-align:center; margin-top: 50px; display:flex; justify-content:center; gap:8px;">';
    for (let i = 1; i <= totalPaginas; i++) {
      const activeStyle = i === paginaNum ? 'background:var(--crimson); color:white; border-color:var(--crimson);' : 'background:transparent; color:var(--ink-soft);';
      const link = i === 1 ? 'todas-resenhas.html' : `todas-resenhas-${i}.html`;
      paginacaoHTML += `<a href="${link}" class="btn-ghost-dark" style="padding: 10px 18px; min-width: 44px; justify-content:center; ${activeStyle}">${i}</a>`;
    }
    paginacaoHTML += '</div>';
  }

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Todas as Resenhas — Página ${paginaNum} — Confraria Literária</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=DM+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;1,300&family=Playfair+Display:ital,wght@1,400;1,600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="icon" type="image/png" href="../assets/favicon.png" />
</head>
<body style="background:var(--white);">
  <header class="site-header scrolled" style="background: rgba(255,253,253,.98);">
    <div class="header__inner">
      <nav class="header__meta">
        <a href="../index.html">Início</a>
        <a href="sobre.html">Sobre mim</a>
        <a href="../index.html#newsletter">Newsletter</a>
      </nav>
      <a href="../index.html" class="site-logo">Confraria<em>Literária</em></a>
      <nav class="header__nav">
        <a href="../index.html#leitura-atual">Leitura Atual</a>
        <a href="../index.html#resenhas">Resenhas</a>
        <a href="../index.html#favoritos">Favoritos</a>
      </nav>
    </div>
  </header>

  <section class="resenhas-section" style="padding-top: 140px; min-height: 70vh;">
    <div class="resenhas-section__inner">
      <div class="resenhas-header">
        <div class="section-label"><span class="dot"></span> Arquivo</div>
        <h2 class="resenhas-headline">Todas as resenhas</h2>
      </div>

      <div class="reviews-grid" style="margin-top: 40px;">
        ${cardsHTML}
      </div>
      
      ${paginacaoHTML}
    </div>
  </section>

  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="sf-bottom">
        <span>© ${new Date().getFullYear()} Ana Carolina Craveiro 🩷</span>
        <span>Site Desenvolvido por <a href="https://www.linkedin.com/in/heliojunior1218/">Hélio Jr</a></span>
      </div>
    </div>
  </footer>

  <!-- Floating Socials -->
  <div class="floating-socials visible">
    <a href="https://www.instagram.com/carolinacraveirodaily" target="_blank" class="float-btn" aria-label="Instagram" title="Instagram">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    </a>
    <a href="https://skoob.com.br/profile/695d5137d8551d03d7e8759c-carolinacraveiro" target="_blank" class="float-btn" aria-label="Skoob" title="Skoob">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
    </a>
  </div>
  <script src="../js/main.js"></script>
</body>
</html>`;
}

console.log('\n🩷  Páginas atualizadas com sucesso!');

// Se gerou apenas UMA resenha específica, dispara a newsletter
if (slugAlvo && lista.length === 1) {
  const resenha = lista[0];
  console.log(`\n📢  Deseja enviar a newsletter para "${resenha.titulo}"?`);
  console.log(`    (Certifique-se de que o .env está configurado com GMAIL_USER e GMAIL_PASS)`);
  
  // Como é um script CLI, vamos disparar automaticamente se o ENV estiver pronto
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS && process.env.GMAIL_PASS !== 'sua_senha_de_app_aqui') {
    enviarNewsletter(resenha).catch(err => {
      console.error('❌  Erro ao enviar newsletter:', err.message);
    });
  } else {
    console.log('⏭️  Newsletter ignorada (credenciais não configuradas no .env).');
  }
} else {
  console.log('\n💡 Dica: Para enviar a newsletter de uma resenha específica, use:');
  console.log('   node gerar-paginas-resenhas.js <slug-da-resenha>');
}

