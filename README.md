# 📖 Confraria Literária — Website Editorial

![Versão](https://img.shields.io/badge/versão-2.0.0-crimson)
![Status](https://img.shields.io/badge/status-produção-success)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS%20%7C%20Node.js-rose)

A **Confraria Literária** é uma plataforma editorial digital projetada para mulheres que buscam uma leitura profunda e reflexiva. O projeto une uma estética clássica de revista literária com funcionalidades modernas de interação e automação.

---

## 📸 Preview do Projeto

*(Espaço para capturas de tela do site)*

- **Homepage Editorial**: Grid dinâmico de resenhas com filtros inteligentes.
- **Leitura Atual**: Card interativo com progresso de leitura e notas pessoais.
- **Páginas de Resenha**: Layout focado em legibilidade (Typography-first) com sistema de comentários globais.

---

## ✨ Funcionalidades Principais

### 🚀 Automação de Conteúdo
- **Gerador Estático (SSG)**: Script Node.js que transforma dados de um banco JS em páginas HTML completas, otimizadas para SEO.
- **Atualização Automática**: Ao adicionar uma resenha, a homepage, o arquivo e a paginação são reconstruídos instantaneamente.

### 💬 Comunidade e Interação
- **Comentários Globais**: Integração com **Google Sheets API** funcionando como banco de dados em tempo real.
- **Sistema de Avaliação (Hearts)**: Feedback visual interativo por resenha.

### ✉️ Newsletter Automatizada
- **Inscrição Serverless**: Rota de API no Vercel que valida e armazena e-mails na nuvem.
- **Disparo Inteligente**: Ao publicar uma nova resenha, o sistema pode notificar automaticamente todos os inscritos com um e-mail personalizado.

---

## 🛠️ Stack Tecnológica

- **Frontend**: HTML5 Semântico, Vanilla CSS3 (Custom Properties, Grid, Flexbox).
- **Backend (Serverless)**: Node.js (Vercel Functions).
- **Banco de Dados**: Google Sheets API (v4).
- **Automação**: Scripting em Node.js para geração de páginas.
- **Design**: Focado em Micro-interações e Scroll Reveal.

---

## 🎨 Design System

O design foi inspirado em publicações de luxo e editoriais clássicos (como *The New Yorker* e *Vogue*).

- **Tipografia**: 
  - `Cormorant Garamond`: Elegância e tradição para títulos.
  - `DM Sans`: Modernidade e clareza para leitura fluida.
- **Paleta de Cores**: Tons de carmesim, rosa seco e off-white para transmitir sofisticação e suavidade.

---

## 📂 Estrutura do Projeto

```bash
├── api/                    # Funções Serverless (Vercel)
├── css/                    # Design System e Estilos
├── js/                     # Lógica de Interação e APIs
├── pages/                  # Páginas geradas dinamicamente
├── resenhas.js             # 💿 Banco de Dados de Conteúdo
├── gerar-paginas-resenhas.js # ⚙️ Motor de Geração do Site
└── index.html              # Homepage Principal
```

---

## ⚙️ Configuração para Desenvolvedores

Se você deseja clonar e rodar este projeto, precisará configurar as variáveis de ambiente no arquivo `.env`:

```env
GMAIL_USER=seu-email@gmail.com
GMAIL_PASS=sua-senha-de-app
GOOGLE_SHEET_ID=id-da-sua-planilha
GOOGLE_SERVICE_ACCOUNT_EMAIL=seu-email-da-conta-de-servico
GOOGLE_PRIVATE_KEY=sua-chave-privada
```

---

## 📝 Licença

Este projeto foi desenvolvido como uma peça de portfólio para a **Confraria Literária**. Sinta-se à vontade para explorar o código e se inspirar!

Desenvolvido por **Hélio Jr.** para **Ana Carolina Craveiro** 🩷
