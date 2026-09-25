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
    slug: 'herdeiras-do-mar-resenha',
    titulo: 'Herdeiras do Mar',
    tituloResenha: 'Memória, Trauma e a Força Feminina na Segunda Guerra Mundial',
    autora: 'Mary Lynn Bracht',
    genero: 'Ficção Histórica',
    generoFiltro: 'romance historia drama guerra',
    paginas: '366',
    publicado: '2018',
    data: '2026-09-24',
    dataFormatada: '24 de setembro, 2026',
    resumo: 'Um romance histórico forte e doloroso sobre a ocupação japonesa da Coreia, abordando a violência sofrida pelas mulheres de conforto através da história de duas irmãs.',
    spineColor: '#1E3D59',
    faceGradient: 'linear-gradient(145deg, #e8f1f5, #b3cdd1)',
    ornamento: '🌊',
    tags: ['Segunda Guerra', 'Ásia', 'Ficção Histórica', 'Drama'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph"><em>Herdeiras do Mar</em>, de Mary Lynn Bracht, é um romance histórico forte e doloroso que aborda a ocupação japonesa da Coreia e, principalmente, a violência sofrida pelas chamadas “mulheres de conforto” durante esse período.</p>
      
      <p>A narrativa acompanha Hana, uma jovem mergulhadora da ilha de Jeju, que vive com sua família e aprendeu desde cedo a mergulhar no mar para ajudar no sustento de casa. Sua vida muda completamente quando ela percebe que um soldado japonês se aproxima de sua irmã mais nova, Emi. Para protegê-la, Hana se entrega no lugar dela e acaba sendo levada para longe de casa.</p>
      
      <p>A partir daí, o livro mostra a luta de Hana para sobreviver às atrocidades que enfrenta. Paralelamente, acompanhamos Emi anos depois, já adulta, carregando as consequências da separação e tentando reconstruir a própria vida. Essa alternância entre as duas irmãs mostra como uma experiência traumática pode atravessar décadas e afetar não apenas quem a viveu, mas também toda uma família.</p>

      <p>Um dos pontos mais marcantes da obra é a relação entre as irmãs. O amor, a culpa, a saudade e o desejo de proteger uma à outra estão presentes durante toda a história. O mar também possui um significado importante: representa tanto a liberdade e a identidade de Hana quanto a distância que separa as duas irmãs.</p>

      <blockquote class="review-blockquote">
        A escrita de Mary Lynn Bracht é bastante envolvente, mas o livro não é uma leitura leve. Existem cenas de violência sexual, abuso, guerra e sofrimento psicológico que podem ser difíceis de ler. Ao mesmo tempo, a obra dá espaço para temas como resistência, memória, sobrevivência e força feminina.
      </blockquote>

      <div class="pull-quote-review">
        <p>"No geral, Herdeiras do Mar é uma história sobre duas irmãs separadas pela guerra, mas também sobre a capacidade humana de continuar vivendo depois de experiências extremamente dolorosas."</p>
      </div>

      <p>É um livro que provoca reflexão sobre como a história pode ser apagada ou silenciada e sobre a importância de preservar a memória das vítimas.</p>
    `
  },

  {
    slug: 'olhai-os-lirios-do-campo-resenha',
    titulo: 'Olhai os Lírios do Campo',
    tituloResenha: 'Ambição, Redenção e a Busca pelo Sentido Existencial',
    autora: 'Erico Verissimo',
    genero: 'Literatura Brasileira',
    generoFiltro: 'classico drama reflexao existencialismo',
    paginas: '288',
    publicado: '1938',
    data: '2026-05-06',
    dataFormatada: '06 de maio, 2026',
    resumo: 'Um médico dividido entre a obsessão pelo status social e a humanidade esquecida, em um dos maiores clássicos da nossa literatura.',
    spineColor: '#4A5D23',
    faceGradient: 'linear-gradient(145deg, #fdfcf0, #e6e2c3)',
    ornamento: '🌿',
    tags: ['Clássico', 'Literatura Nacional', 'Ética'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph">Publicado em 1938, Olhai os Lírios do Campo é um dos romances mais conhecidos de Erico Verissimo e se destaca por sua abordagem direta sobre escolhas de vida, ambição e sentido existencial. A narrativa acompanha Eugênio Fontes, um médico de origem humilde que, marcado pela pobreza na infância, desenvolve uma obsessão por ascensão social e reconhecimento.</p>
      
      <p>Ao longo da obra, Eugênio abandona valores afetivos e éticos em troca de status, envolvendo-se com pessoas e ambientes que representam o sucesso material que sempre desejou. Nesse percurso, ele se afasta de Olívia, personagem que simboliza justamente o contraponto: sensibilidade, humanidade e uma visão mais simples porém mais profunda da vida.</p>
      
      <p>A estrutura do romance alterna passado e presente, revelando gradualmente as motivações internas do protagonista e construindo um retrato psicológico consistente. Após perdas significativas, Eugênio é levado a confrontar suas escolhas, entrando em um processo de reflexão que constitui o núcleo moral da obra.</p>

      <blockquote class="review-blockquote">
        O título faz referência a uma passagem bíblica do Sermão da Montanha, “olhai os lírios do campo”, que sugere uma crítica à excessiva preocupação com bens materiais e ao abandono daquilo que realmente importa: as relações humanas, a empatia e o sentido da existência.
        <cite>— Erico Verissimo, <em>Olhai os Lírios do Campo</em></cite>
      </blockquote>

      <p>Do ponto de vista literário, Verissimo utiliza uma linguagem acessível, sem perder densidade temática. O romance dialoga com questões universais como ambição, arrependimento, amor e redenção, o que explica sua permanência como leitura relevante.</p>

      <div class="pull-quote-review">
        <p>"Em síntese, Olhai os Lírios do Campo não é apenas a história de um homem que erra, mas de alguém que, ao reconhecer suas falhas, busca reconstruir seu caminho."</p>
      </div>

      <p>É uma obra que convida à autocrítica e à revisão de prioridades, especialmente em uma sociedade ainda marcada pela valorização excessiva do sucesso material.</p>
    `
  },

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
  },

  {
    slug: 'pachinko-resenha',
    titulo: 'Pachinko',
    tituloResenha: 'Pertencimento, Família e Sobrevivência Através das Gerações',
    autora: 'Min Jin Lee',
    genero: 'Ficção Histórica',
    generoFiltro: 'romance historia drama familia asiática',
    paginas: '528',
    publicado: '2017',
    data: '2026-09-24',
    dataFormatada: '24 de setembro, 2026',
    resumo: 'Uma épica saga familiar que atravessa gerações de uma família coreana no Japão, explorando identidade, preconceito e as escolhas para sobreviver.',
    spineColor: '#8C1D24',
    faceGradient: 'linear-gradient(145deg, #fce4e4, #f3b6b6)',
    ornamento: '💮',
    tags: ['Saga Familiar', 'Ásia', 'Ficção Histórica', 'Literatura Contemporânea'],
    notaMedia: '',
    notaContagem: 'Seja a primeira a avaliar',
    conteudo: `
      <p class="lead-paragraph">Em <em>Pachinko</em>, Min Jin Lee constrói uma grande saga familiar que atravessa gerações e acompanha a trajetória de uma família coreana no Japão ao longo do século XX. Mais do que um romance histórico, o livro é uma reflexão profunda sobre identidade, pertencimento, preconceito, amor e as escolhas que fazemos para sobreviver.</p>

      <p>A história começa com Sunja, uma jovem coreana que vive com a mãe em uma pequena vila de pescadores. Sua vida muda completamente quando ela se envolve com Hansu, um homem mais velho que esconde estar casado. Ao descobrir a verdade e perceber que não deseja ocupar o lugar de amante, Sunja escolhe outro caminho: aceita se casar com Isak, um pastor cristão, e parte com ele para o Japão.</p>

      <p>A partir dessa mudança, a narrativa se amplia. Acompanhamos não apenas Sunja, mas também seus filhos, netos e as gerações que vêm depois dela. É justamente nessa passagem do tempo que Pachinko ganha uma de suas maiores forças: as decisões tomadas por uma geração continuam ecoando na vida das seguintes.</p>

      <p>No Japão, a família enfrenta dificuldades econômicas, preconceito e a constante sensação de não pertencer completamente a lugar algum. São coreanos em território japonês, carregando uma identidade que muitas vezes é motivo de discriminação, enquanto permanecem ligados a uma Coreia que também vai se transformando ao longo dos anos.</p>

      <p>Sunja é o coração da história. Sua trajetória é marcada por perdas, renúncias e responsabilidades, mas também por uma enorme capacidade de resistência. Ela não é uma personagem idealizada. É uma mulher que precisa tomar decisões difíceis em um mundo no qual suas possibilidades são limitadas. Sua força está justamente na maneira como continua seguindo em frente, principalmente por aqueles que ama.</p>

      <blockquote class="review-blockquote">
        O título do livro também carrega um significado simbólico. O pachinko, um jogo de máquinas muito popular no Japão, representa de certa forma a própria existência dos personagens: há regras estabelecidas, circunstâncias que não podem ser controladas e uma grande dose de acaso. Ainda assim, eles continuam jogando, tentando encontrar alguma possibilidade de futuro.
      </blockquote>

      <p>Um dos aspectos mais interessantes do romance é que Min Jin Lee não transforma o sofrimento em algo romantizado. A pobreza, o preconceito e as dificuldades familiares são apresentados de maneira direta, mostrando como questões históricas e sociais podem determinar profundamente a vida de pessoas comuns.</p>

      <p>Ao mesmo tempo, Pachinko é uma história sobre amor. Não apenas o amor romântico, mas o amor entre mães e filhos, irmãos, maridos e esposas e entre diferentes gerações. É esse sentimento que muitas vezes sustenta os personagens quando tudo ao redor parece desmoronar.</p>

      <div class="pull-quote-review">
        <p>"Ao terminar o livro, fica a sensação de ter acompanhado não apenas uma família, mas uma parte da história de um povo. Pachinko mostra como nossas origens, nossas escolhas e até mesmo as circunstâncias que não escolhemos podem atravessar gerações."</p>
      </div>

      <p>É uma leitura densa, emocionante e profundamente humana. Uma daquelas histórias que permanecem na memória mesmo depois da última página, principalmente porque, por trás de todos os acontecimentos históricos, existe algo muito simples e universal: o desejo de encontrar um lugar no mundo e deixar um caminho um pouco melhor para aqueles que vêm depois de nós.</p>
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
