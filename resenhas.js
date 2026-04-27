/* ============================================================
   Confraria Literária — resenhas.js
   Banco de dados de resenhas.

   Como adicionar uma nova resenha:
   1. Copie um dos objetos abaixo e cole ao final do array.
   2. Preencha todos os campos.
   3. Execute no terminal: node gerar-paginas-resenhas.js
   4. O arquivo pages/<slug>.html será criado automaticamente.
   ============================================================ */

window.RESENHAS = [

{
    slug: 'o-que-resta-de-nos-resenha',
    titulo: 'O Que Resta de Nós',
    tituloResenha: 'A Delicadeza dos Recontros e a Arte de Recomeçar',
    autora: 'Virginie Grimaldi',
    genero: 'Ficção Contemporânea',
    generoFiltro: 'romance drama acolhedor superacao',
    paginas: '272',
    publicado: '2023',
    data: '2026-04-27',
    dataFormatada: '27 de abril, 2026',
    resumo: 'Uma viúva de 74 anos abre as portas de sua casa para dois desconhecidos, provando que o afeto e a esperança podem florescer em qualquer idade.',
    spineColor: '#5B7A8C',
    faceGradient: 'linear-gradient(145deg, #f0f7f9, #d9e6ed)',
    ornamento: '✿',
    tags: ['Luto', 'Amizade Intergeracional', 'Literatura Francesa'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph"><em>O que resta de nós</em>, de Virginie Grimaldi, é um romance sensível e emocionante que aborda temas como luto, solidão, perdas e recomeços. A narrativa nos apresenta Jeanne, uma viúva de 74 anos que, após a morte do marido, se vê diante do vazio da casa e da dificuldade de seguir em frente sozinha.</p>
      
      <h2>Um Apartamento, Três Destinos</h2>
      <p>Para lidar com a solidão e também com questões financeiras, Jeanne decide alugar dois quartos de seu apartamento. É assim que entram em sua vida Théo, um jovem de 18 anos que enfrenta dificuldades pessoais e financeiras, e Iris, uma mulher de 33 anos marcada por traumas e tentando reconstruir sua vida.</p>
      
      <blockquote class="review-blockquote">
        "Às vezes, a vida nos tira tudo para nos mostrar que ainda somos capazes de construir algo novo com os pedaços que sobraram."
        <cite>— Virginie Grimaldi, <em>O Que Resta de Nós</em></cite>
      </blockquote>

      <p>Apesar de serem completos desconhecidos e viverem momentos muito diferentes, os três acabam criando uma conexão profunda e inesperada, transformando o espaço físico em um verdadeiro refúgio emocional.</p>

      <div class="pull-quote-review">
        <p>"O afeto pode surgir nos lugares mais improváveis, provando que nunca é tarde para encontrar novas formas de amor."</p>
      </div>

      <p>Com uma escrita delicada, acolhedora e realista, Grimaldi mostra como, mesmo depois de grandes perdas, ainda é possível encontrar esperança e pertencimento. É uma leitura tocante, humana e cheia de sensibilidade.</p>
    `
  },
  
{
    slug: 'guerra-adoravel-guerra-resenha',
    titulo: 'Guerra Adorável Guerra',
    tituloResenha: 'O Amor sob o Olhar dos Deuses no Caos da Grande Guerra',
    autora: 'Julie Berry',
    genero: 'Ficção Histórica / Mitologia',
    generoFiltro: 'romance historia mitologia drama',
    paginas: '448',
    publicado: '2024',
    data: '2026-04-23',
    dataFormatada: '23 de abril, 2026',
    resumo: 'Uma narrativa sensível onde deuses gregos narram histórias de amor e resistência em meio aos campos de batalha da Primeira Guerra Mundial.',
    spineColor: '#A62D2D',
    faceGradient: 'linear-gradient(145deg, #f5e6d3, #d9c5b2)',
    ornamento: '✦',
    tags: ['Primeira Guerra', 'Mitologia Grega', 'Romance'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph">Narrado pelos deuses gregos do Olimpo, <em>Guerra Adorável Guerra</em> apresenta uma perspectiva única e envolvente sobre a Primeira Guerra Mundial. Sob o olhar de Afrodite, Ares, Apolo e Hefesto, acompanhamos histórias de amor que surgem e resistem em meio ao caos, à dor e às incertezas da guerra.</p>
      
      <h2>A Interseção entre o Divino e o Humano</h2>
      <p>Alternando entre o plano divino e a realidade dos soldados e civis, Julie Berry constrói uma narrativa sensível e profundamente humana, explorando não apenas o impacto do conflito, mas também as conexões que nascem mesmo nos cenários mais improváveis.</p>
      
      <blockquote class="review-blockquote">
        "O que são os deuses sem as pessoas que os amam e os odeiam? Somos apenas histórias contadas ao vento."
        <cite>— Julie Berry, <em>Guerra Adorável Guerra</em></cite>
      </blockquote>

      <p>Os personagens são atravessados por escolhas difíceis, perdas irreparáveis e sentimentos intensos, que evidenciam a fragilidade e, ao mesmo tempo, a força do amor.</p>

      <div class="pull-quote-review">
        <p>"Mesmo diante da destruição, o amor continua sendo uma das maiores forças capazes de dar sentido à experiência humana."</p>
      </div>

      <p>Com uma proposta original e uma escrita delicada, o livro mostra que a esperança e a conexão humana persistem, ainda que, muitas vezes, deixem cicatrizes profundas.</p>
    `
  },

  {
    slug: 'existir',                           // Nome do arquivo HTML (sem extensão)
    titulo: 'A Arte de Existir com Intenção',  // Título do livro
    tituloResenha: 'Existir com intenção é um ato de coragem silenciosa', // Título da resenha
    autora: 'Elena Marchetti',
    genero: 'Filosofia · Autoconhecimento',    // Exibido no card e na página
    generoFiltro: 'filosofia autoconhecimento favoritos', // Usado nos filtros da home (palavras separadas por espaço)
    paginas: '312',
    publicado: '2023',
    data: '2025-11-18',                        // Data de publicação da resenha (AAAA-MM-DD)
    dataFormatada: '18 de novembro, 2025',
    resumo: 'Marchetti escreve como quem entende que a filosofia não precisa de pedestais. Um livro que parece saber exatamente quando você está pronta para lê-lo.',
    spineColor: '#8C0327',
    faceGradient: 'linear-gradient(145deg,#fdf3f7,#f0d5e2)',
    ornamento: '★',
    tags: ['Filosofia', 'Autoconhecimento', 'Estoicismo', 'Favorita'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph">
        Elena Marchetti escreve como quem entende que a filosofia não precisa de pedestais.
        Em <em>A Arte de Existir com Intenção</em>, ela nos convida a examinar — com honestidade
        e sem pressa — a qualidade das escolhas que fazemos sobre nossa própria vida.
      </p>

      <h2>Um livro que chega quando você precisa</h2>
      <p>
        Existe uma categoria rara de livros que parecem ter sido escritos especialmente para você —
        não porque falem da sua história, mas porque falam da sua condição.
        <em>A Arte de Existir com Intenção</em> pertence a essa categoria.
      </p>

      <blockquote class="review-blockquote">
        "Viver com intenção não é ter clareza sobre o destino. É reconhecer que cada passo é uma decisão."
        <cite>— Elena Marchetti, <em>A Arte de Existir com Intenção</em>, p. 87</cite>
      </blockquote>

      <h2>O que permanece</h2>
      <p>
        Marchetti nos deixa com uma convicção: que existir bem é uma prática — não um estado que se atinge,
        mas um movimento constante de atenção e escolha.
      </p>

      <div class="pull-quote-review">
        <p>"Um livro que parece saber exatamente quando você está pronta para lê-lo."</p>
      </div>
    `
  },

  {
    slug: 'beloved',
    titulo: 'Beloved',
    tituloResenha: 'Um livro que habita você, não o contrário',
    autora: 'Toni Morrison',
    genero: 'Romance histórico',
    generoFiltro: 'romance favoritos',
    paginas: '324',
    publicado: '1987',
    data: '2025-12-01',
    dataFormatada: '1 de dezembro, 2025',
    resumo: 'Toni Morrison não escreve sobre trauma. Ela escreve a partir dele — e a diferença é tudo. Beloved é um livro que não se lê: se atravessa.',
    spineColor: '#A62454',
    faceGradient: 'linear-gradient(145deg,#fce8f0,#e0c0d0)',
    ornamento: '★',
    tags: ['Romance', 'Literatura Americana', 'Pulitzer', 'Favorita'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph">
        Toni Morrison não escreve sobre trauma. Ela escreve a partir dele — e a diferença é tudo.
        <em>Beloved</em> é um livro que não se lê: se atravessa.
      </p>

      <h2>A escrita que dói de propósito</h2>
      <p>
        Há páginas em Beloved que são fisicamente difíceis de ler — não porque sejam mal escritas,
        mas porque são escritas com uma honestidade radical sobre o que a escravidão fez com corpos,
        mentes e almas humanas.
      </p>

      <blockquote class="review-blockquote">
        <p>"Esta não é uma história para se passar adiante."</p>
        <cite>— Toni Morrison, <em>Beloved</em></cite>
      </blockquote>

      <h2>Por que ler agora</h2>
      <p>
        Beloved ganhou o Pulitzer em 1988 e contribuiu para que Morrison ganhasse o Nobel de
        Literatura em 1993. É um dos maiores romances já escritos — período.
      </p>

      <div class="pull-quote-review">
        <p>"Toni Morrison escreveu um livro que habita você, não o contrário."</p>
      </div>
    `
  },

  {
    slug: 'corpo',
    titulo: 'O Corpo Guarda as Marcas',
    tituloResenha: 'Uma leitura que muda a forma como você habita seu próprio corpo',
    autora: 'B. van der Kolk',
    genero: 'Ciência',
    generoFiltro: 'autoconhecimento ciencia',
    paginas: '448',
    publicado: '2014',
    data: '2025-09-10',
    dataFormatada: 'Set 2025',
    resumo: 'Uma leitura que muda a forma como você habita seu próprio corpo.',
    spineColor: '#E59888',
    faceGradient: 'linear-gradient(145deg,#fdf0eb,#f2cbc2)',
    ornamento: '★',
    tags: ['Ciência', 'Psicologia', 'Trauma'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <section class="review-hero" style="display:flex;align-items:center;justify-content:center;text-align:center;min-height:60vh;">
        <div style="position:relative;z-index:1;padding:2rem;">
          <div class="section-label" style="justify-content:center;margin-bottom:24px;"><span class="dot"></span> Resenha em breve</div>
          <h1 style="font-family:'Cormorant Garamond',serif;font-size:3rem;color:#18080e;margin-bottom:20px;">Esta resenha está sendo preparada</h1>
          <p style="font-size:1rem;color:#7a3850;margin-bottom:40px;font-weight:300;">Volte em breve para ler a resenha completa.</p>
          <a href="../index.html" style="display:inline-flex;align-items:center;gap:8px;color:#8C0327;font-size:.85rem;border-bottom:1px solid rgba(140,3,39,.2);padding-bottom:2px;">← Voltar ao início</a>
        </div>
      </section>
    `
  },

  {
    slug: 'clarice',
    titulo: 'A Paixão Segundo G.H.',
    tituloResenha: 'Clarice nos deixa sem chão para que possamos finalmente sentir o chão',
    autora: 'C. Lispector',
    genero: 'Literatura',
    generoFiltro: 'literatura',
    paginas: '224',
    publicado: '1964',
    data: '2025-08-05',
    dataFormatada: 'Ago 2025',
    resumo: 'Clarice nos deixa sem chão para que possamos finalmente sentir o chão.',
    spineColor: '#8C0327',
    faceGradient: 'linear-gradient(145deg,#fdf8f3,#f5e0d0)',
    ornamento: '★',
    tags: ['Literatura Brasileira', 'Existencialismo'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <section class="review-hero" style="display:flex;align-items:center;justify-content:center;text-align:center;min-height:60vh;">
        <div style="position:relative;z-index:1;padding:2rem;">
          <div class="section-label" style="justify-content:center;margin-bottom:24px;"><span class="dot"></span> Resenha em breve</div>
          <h1 style="font-family:'Cormorant Garamond',serif;font-size:3rem;color:#18080e;margin-bottom:20px;">Esta resenha está sendo preparada</h1>
          <p style="font-size:1rem;color:#7a3850;margin-bottom:40px;font-weight:300;">Volte em breve para ler a resenha completa.</p>
          <a href="../index.html" style="display:inline-flex;align-items:center;gap:8px;color:#8C0327;font-size:.85rem;border-bottom:1px solid rgba(140,3,39,.2);padding-bottom:2px;">← Voltar ao início</a>
        </div>
      </section>
    `
  },

  {
    slug: 'simone',
    titulo: 'O Segundo Sexo',
    tituloResenha: 'Beauvoir não envelheceu. Apenas ficou mais necessária',
    autora: 'S. de Beauvoir',
    genero: 'Filosofia',
    generoFiltro: 'filosofia',
    paginas: '900',
    publicado: '1949',
    data: '2025-07-20',
    dataFormatada: 'Jul 2025',
    resumo: 'Beauvoir não envelheceu. Apenas ficou mais necessária.',
    spineColor: '#D95995',
    faceGradient: 'linear-gradient(145deg,#fceef5,#ecc8dc)',
    ornamento: '★',
    tags: ['Filosofia', 'Feminismo'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <section class="review-hero" style="display:flex;align-items:center;justify-content:center;text-align:center;min-height:60vh;">
        <div style="position:relative;z-index:1;padding:2rem;">
          <div class="section-label" style="justify-content:center;margin-bottom:24px;"><span class="dot"></span> Resenha em breve</div>
          <h1 style="font-family:'Cormorant Garamond',serif;font-size:3rem;color:#18080e;margin-bottom:20px;">Esta resenha está sendo preparada</h1>
          <p style="font-size:1rem;color:#7a3850;margin-bottom:40px;font-weight:300;">Volte em breve para ler a resenha completa.</p>
          <a href="../index.html" style="display:inline-flex;align-items:center;gap:8px;color:#8C0327;font-size:.85rem;border-bottom:1px solid rgba(140,3,39,.2);padding-bottom:2px;">← Voltar ao início</a>
        </div>
      </section>
    `
  },

  {
    slug: 'mulher',
    titulo: 'Mulheres que Correm com os Lobos',
    tituloResenha: 'Um livro que desperta algo adormecido. Leitura essencial.',
    autora: 'C. Estés',
    genero: 'Autoconhecimento',
    generoFiltro: 'autoconhecimento favoritos',
    paginas: '576',
    publicado: '1992',
    data: '2025-06-15',
    dataFormatada: 'Jun 2025',
    resumo: 'Um livro que desperta algo adormecido. Leitura essencial.',
    spineColor: '#ECB1A5',
    faceGradient: 'linear-gradient(145deg,#fdf5f0,#f2cbc2)',
    ornamento: '★',
    tags: ['Psicologia', 'Autoconhecimento'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <section class="review-hero" style="display:flex;align-items:center;justify-content:center;text-align:center;min-height:60vh;">
        <div style="position:relative;z-index:1;padding:2rem;">
          <div class="section-label" style="justify-content:center;margin-bottom:24px;"><span class="dot"></span> Resenha em breve</div>
          <h1 style="font-family:'Cormorant Garamond',serif;font-size:3rem;color:#18080e;margin-bottom:20px;">Esta resenha está sendo preparada</h1>
          <p style="font-size:1rem;color:#7a3850;margin-bottom:40px;font-weight:300;">Volte em breve para ler a resenha completa.</p>
          <a href="../index.html" style="display:inline-flex;align-items:center;gap:8px;color:#8C0327;font-size:.85rem;border-bottom:1px solid rgba(140,3,39,.2);padding-bottom:2px;">← Voltar ao início</a>
        </div>
      </section>
    `
  }

  /* ── ADICIONE NOVAS RESENHAS AQUI ────────────────────────────

  REFERÊNCIAS DO LIVRO VC DEVE PEGAR AUTOMATICAMENTE DA INTERNET PARA PREENCHER, EXEMPLO: 
    *  Título
    *  Autora
    *  Gênero
    *  generoFiltro
    *  Páginas 
  {
    slug: 'minha-nova-resenha',
    titulo: 'Título do Livro',
    tituloResenha: 'Título editorial da resenha',
    autora: 'Nome da Autora',
    genero: 'Gênero exibido',
    generoFiltro: 'filosofia romance autoconhecimento',
    paginas: '280',
    publicado: '2024',
    data: '2026-05-01',
    dataFormatada: '1 de maio, 2026',
    resumo: 'Resumo curto para o card da home.',
    spineColor: '#8C0327',
    faceGradient: 'linear-gradient(145deg,#fdf3f7,#f0d5e2)',
    ornamento: '★',
    tags: ['Tag1', 'Tag2'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph">Parágrafo de abertura (lead).</p>
      <h2>Subtítulo da seção</h2>
      <p>Corpo do texto da resenha.</p>
      <blockquote class="review-blockquote">
        "Citação do livro."
        <cite>— Autora, <em>Título</em>, p. XX</cite>
      </blockquote>
      <div class="pull-quote-review">
        <p>"Sua frase de impacto sobre o livro."</p>
      </div>
    `
  }

  ─────────────────────────────────────────────────────────── */
];
