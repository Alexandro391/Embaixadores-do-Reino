# 📖 Embaixadores do Reino — Portal Evangélico
## Guia Completo de Uso e Configuração

---

## 🗂️ Estrutura de Arquivos

```
embaixadores-do-reino/
├── index.html            ← Página inicial
├── materias.html         ← Lista de matérias
├── mensagens.html        ← Lista de mensagens
├── devocionais.html      ← Devocionais diários
├── estudos.html          ← Estudos bíblicos
├── biblia.html           ← Bíblia online
├── radio.html            ← Rádio evangélica
├── oracao.html           ← Pedido de oração
├── agenda.html           ← Agenda de eventos
├── sobre.html            ← Sobre o ministério
├── contato.html          ← Contato
├── artigo.html           ← Detalhe de conteúdo (dinâmico)
├── privacidade.html      ← Política de privacidade
├── sitemap.xml
├── robots.txt
├── feed.xml              ← Feed RSS
├── assets/
│   ├── css/style.css     ← CSS principal
│   ├── css/responsivo.css← CSS responsivo
│   └── js/
│       ├── app.js        ← Funcionalidades gerais
│       ├── componentes.js← Header e footer reutilizáveis
│       ├── conteudo.js   ← Carregamento de JSON
│       ├── relogio.js    ← Relógio em tempo real
│       ├── radio.js      ← Player de rádio
│       └── biblia.js     ← Bíblia online
└── conteudo/
    ├── materias.json
    ├── mensagens.json
    ├── devocionais.json
    ├── estudos.json
    ├── agenda.json
    ├── radio.json
    └── biblia/
        ├── livros.json
        ├── genesis.json
        ├── joao.json
        ├── salmos.json
        └── romanos.json
```

---

## ✏️ Como Adicionar Conteúdo

### Adicionar uma nova Matéria
Abra `conteudo/materias.json` e adicione um novo objeto no array:

```json
{
  "id": 7,
  "titulo": "Título da matéria",
  "slug": "titulo-da-materia",
  "categoria": "Fé",
  "data": "2026-06-01",
  "autor": "Nome do Autor",
  "imagem": "assets/img/materia-7.jpg",
  "resumo": "Resumo curto da matéria (1-2 frases).",
  "conteudo": "Texto completo da matéria aqui.\n\nNovo parágrafo separado por linha em branco.",
  "destaque": false,
  "tags": ["fé", "palavra"]
}
```

O mesmo padrão vale para `mensagens.json`, `devocionais.json` e `estudos.json`.

Para **devocionais**, adicione também o campo `"versiculo"`:
```json
"versiculo": "Salmo 23:1 — 'O Senhor é o meu pastor...'"
```

---

## 📻 Trocar a URL da Rádio

Abra `conteudo/radio.json` e altere o campo `streamUrl`:

```json
{
  "streamUrl": "https://SUA-URL-DE-STREAM-AQUI.com/stream.mp3"
}
```

Exemplos de formatos aceitos:
- `https://servidor.com/stream.mp3` (Icecast / SHOUTcast)
- `https://stream.zeno.fm/codigo` (Zeno.fm)
- Qualquer stream de áudio MP3 compatível com HTML5

---

## 📜 Adicionar Livros/Capítulos na Bíblia

### 1. Adicione o livro em `conteudo/biblia/livros.json`:
```json
{ "id": "efesios", "nome": "Efésios", "testamento": "Novo Testamento", "capitulos": 6, "abrev": "Ef" }
```

### 2. Crie o arquivo `conteudo/biblia/efesios.json`:
```json
{
  "livro": "Efésios",
  "abrev": "Ef",
  "testamento": "Novo Testamento",
  "capitulos": {
    "1": [
      { "versiculo": 1, "texto": "Paulo, apóstolo de Cristo Jesus pela vontade de Deus..." },
      { "versiculo": 2, "texto": "Graça e paz a vós da parte de Deus nosso Pai..." }
    ],
    "2": [
      { "versiculo": 8, "texto": "Porque pela graça sois salvos, por meio da fé..." }
    ]
  }
}
```

**Observação:** Use apenas textos bíblicos em domínio público ou com licença adequada.

---

## 📧 Configurar E-mail e WhatsApp de Contato

- Em `oracao.html`, linha `enviarPedidoEmail()`: troque `oracao@embaixadoresdoreino.com.br`
- Em `oracao.html`, linha `enviarPedidoWhatsApp()`: troque o número em `wa.me/55XXXXXXXX`
- Em `contato.html`, linha `enviarContato()`: troque `contato@embaixadoresdoreino.com.br`

---

## 🌐 Publicar o Site

Este site funciona com qualquer hospedagem de arquivos estáticos:

1. **GitHub Pages** — Gratuito, suba os arquivos no repositório
2. **Netlify** — Arraste a pasta no site netlify.com
3. **Vercel** — Conecte ao GitHub e faça deploy
4. **Hospedagem tradicional** — Suba por FTP na pasta pública (public_html)

> ⚠️ Para a Bíblia Online e carregamento de JSON funcionar localmente (sem hospedagem), você precisa de um servidor local como Live Server (VSCode) ou `python -m http.server`.

---

## 🎨 Personalizar Cores

Abra `assets/css/style.css` e edite as variáveis no topo:

```css
:root {
  --azul-profundo: #1a3557;   /* Cor principal */
  --dourado: #c8a951;         /* Cor secundária */
  --areia: #f8f5ef;           /* Fundo claro */
}
```

---

## 📊 SEO — Atualizar Domínio

Em `sitemap.xml` e `feed.xml`, substitua `embaixadoresdoreino.com.br` pelo seu domínio real.
Em `robots.txt`, atualize a linha `Sitemap:` com o URL completo do seu sitemap.

---

*Desenvolvido com HTML5, CSS3 e JavaScript puro — Embaixadores do Reino © 2026*
