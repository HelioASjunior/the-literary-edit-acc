# Confraria Literária — Website Editorial

## Estrutura do Projeto

```
bookclub2/
├── index.html              ← Página principal (homepage)
├── css/
│   ├── style.css           ← Design system completo (tokens, componentes, layout)
│   └── review.css          ← Estilos específicos para páginas de resenha
├── js/
│   ├── main.js             ← JS compartilhado (nav, reveal, filtros, newsletter)
│   └── review.js           ← Sistema de corações e comentários (por resenha)
└── pages/
    ├── sobre.html                  ← Página "Sobre mim"
    ├── resenha-existir.html        ← Resenha completa (modelo principal)
    ├── resenha-beloved.html        ← Resenha completa
    ├── resenha-corpo.html          ← Stub (aguardando conteúdo)
    ├── resenha-clarice.html        ← Stub (aguardando conteúdo)
    ├── resenha-simone.html         ← Stub (aguardando conteúdo)
    └── resenha-mulher.html         ← Stub (aguardando conteúdo)
```

---

## Como Adicionar uma Nova Resenha

### 1. Crie a página da resenha

Duplique `pages/resenha-existir.html` e renomeie para `pages/resenha-meulivro.html`.

### 2. Defina o ID único da resenha

No HTML da nova página, mude o atributo `data-review` em dois lugares:

```html
<!-- Sistema de corações -->
<div class="hearts-interactive" id="heartsInteractive" data-review="meulivro">

<!-- Sistema de comentários -->
<form class="comment-form glass" id="commentForm" data-review="meulivro" ...>
```

O ID `data-review` precisa ser único para cada resenha. Ele é usado como chave no localStorage:
- Avaliações: `rating_meulivro`
- Comentários: `comments_meulivro`
- Registro de quem já avaliou: `rated_meulivro`

### 3. Adicione o card na homepage

Em `index.html`, dentro de `.reviews-grid`, adicione:

```html
<article class="review-card glass reveal" data-genre="filosofia favoritos">
  <a href="pages/resenha-meulivro.html" class="review-card__link">
    <!-- ... cover e conteúdo ... -->
  </a>
</article>
```

O atributo `data-genre` define em quais filtros o card aparece. Valores possíveis:
- `todos` (sempre aparece)
- `favoritos` (estrela ⭑)
- `filosofia`
- `romance`
- `autoconhecimento`
- `literatura`
- `ciencia`

---

## Sistema de Corações (Heart Rating)

- Cada resenha gerencia sua própria avaliação independentemente
- Os dados ficam no `localStorage` do navegador
- Um usuário só pode avaliar uma vez por resenha/dispositivo
- A média e contagem são calculadas em tempo real

**Para resetar avaliações em desenvolvimento:**
```javascript
// No console do navegador:
localStorage.removeItem('rating_existir')
localStorage.removeItem('rated_existir')
```

---

## Sistema de Comentários

- Cada resenha tem sua própria lista de comentários
- Os comentários ficam no `localStorage` do navegador
- Para um sistema real, substitua o `localStorage` por chamadas a uma API/backend

**Para resetar comentários em desenvolvimento:**
```javascript
localStorage.removeItem('comments_existir')
```

---

## Paleta de Cores

| Token         | Hex       | Uso                          |
|---------------|-----------|------------------------------|
| `--crimson`   | `#8C0327` | Acentos principais, links    |
| `--burgundy`  | `#A62454` | Gradientes, CTAs             |
| `--rose`      | `#D95995` | Tags, ícones, corações       |
| `--blush`     | `#F2A7D0` | Hover states, bordas suaves  |
| `--petal`     | `#F2C9E4` | Fundos claros, highlights    |
| `--terracotta`| `#E59888` | Capas de livros terracota    |
| `--salmon`    | `#ECB1A5` | Variações quentes            |
| `--cream`     | `#F9E5E0` | Backgrounds suaves           |
| `--white`     | `#FFFFFD` | Fundo principal              |

---

## Tipografia

- **Cormorant Garamond** — Display serif editorial (títulos, citações, capas)
- **DM Sans** — UI/body sans-serif (substituto premium de Glossier Sans/Aperçu)

---

## Foto de Perfil

Em `pages/sobre.html` e `index.html`, substitua o placeholder `<div class="profile-image-placeholder">` por:

```html
<img src="../imagens/foto-perfil.jpg" alt="Foto de perfil" 
     style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" />
```

---

## Capas de Livros Reais

As capas são geradas em CSS como livros estilizados. Para usar imagens reais, substitua o elemento `.book-cover` por:

```html
<div class="book-cover book-cover--featured">
  <img src="../imagens/capa-livro.jpg" alt="Capa: Título do Livro" 
       style="width:100%;height:100%;object-fit:cover;" />
</div>
```

---

Projeto desenvolvido com HTML, CSS e JavaScript puro — sem dependências externas.
