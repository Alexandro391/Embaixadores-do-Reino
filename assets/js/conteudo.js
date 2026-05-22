/* =========================================
   EMBAIXADORES DO REINO — conteudo.js
   Carregamento e renderização de conteúdo
   ========================================= */

// ---- HOME: Carrega seções da página inicial ----
async function carregarHome() {
  // Matérias recentes
  const materias = await carregarJSON('conteudo/materias.json');
  const containerMaterias = document.getElementById('materias-recentes');
  if (containerMaterias && materias) {
    const recentes = materias.slice(0, 3);
    containerMaterias.innerHTML = recentes.map(m => criarCard(m, 'materias')).join('');
  }

  // Mensagens destaque
  const mensagens = await carregarJSON('conteudo/mensagens.json');
  const containerMensagens = document.getElementById('mensagens-destaque');
  if (containerMensagens && mensagens) {
    const destaques = mensagens.filter(m => m.destaque).slice(0, 3);
    containerMensagens.innerHTML = destaques.map(m => criarCard(m, 'mensagens')).join('');
  }

  // Estudos recentes
  const estudos = await carregarJSON('conteudo/estudos.json');
  const containerEstudos = document.getElementById('estudos-recentes');
  if (containerEstudos && estudos) {
    containerEstudos.innerHTML = estudos.slice(0, 3).map(e => criarCard(e, 'estudos')).join('');
  }

  // Devocional do dia
  const devocionais = await carregarJSON('conteudo/devocionais.json');
  if (devocionais && devocionais.length > 0) {
    const hoje = devocionais[0];
    renderizarDevocionalDestaque(hoje);
    preencherModalDevocional(hoje);
  }

  // Agenda
  const agenda = await carregarJSON('conteudo/agenda.json');
  const containerAgenda = document.getElementById('agenda-home');
  if (containerAgenda && agenda) {
    containerAgenda.innerHTML = agenda.slice(0, 4).map(ev => criarCardEvento(ev)).join('');
  }
}

// ---- DEVOCIONAL DESTAQUE (home) ----
function renderizarDevocionalDestaque(dev) {
  const el = document.getElementById('devocional-home');
  if (!el) return;
  el.innerHTML = `
    <div class="devocional-versiculo">${dev.versiculo}</div>
    <h3>${dev.titulo}</h3>
    <p>${dev.resumo}</p>
    <div style="margin-top:1.5rem; display:flex; gap:1rem; flex-wrap:wrap;">
      <button class="btn btn-dourado btn-pequeno" onclick="Modal.abrir('modal-devocional')">📖 Ler devocional completo</button>
      <a href="devocionais.html" class="btn btn-contorno-branco btn-pequeno">Ver todos</a>
    </div>`;
}

function preencherModalDevocional(dev) {
  const titulo = document.getElementById('modal-dev-titulo');
  const corpo = document.getElementById('modal-dev-corpo');
  if (titulo) titulo.textContent = dev.titulo;
  if (corpo) corpo.innerHTML = `
    <div class="modal-versiculo">${dev.versiculo}</div>
    <p style="color:#7a7a8a;font-size:0.82rem;margin-bottom:1rem;">📅 ${formatarDataCompleta(dev.data)} • ✍️ ${dev.autor}</p>
    ${dev.conteudo.split('\n\n').map(p => `<p>${p}</p>`).join('')}
    <div style="margin-top:1.5rem;padding-top:1rem;border-top:1px solid #e0e0e6;">
      <a href="devocionais.html" class="btn btn-principal btn-pequeno">Ver todos os devocionais →</a>
    </div>`;
}

// ---- CARD EVENTO ----
function criarCardEvento(ev) {
  const dia = extrairDia(ev.data);
  const mes = formatarMesAbrev(ev.data);
  return `
    <div class="evento-card">
      <div class="evento-data-bloco">
        <div class="evento-dia">${dia}</div>
        <div class="evento-mes">${mes}</div>
      </div>
      <div class="evento-info">
        <h4>${ev.titulo}</h4>
        <div class="evento-meta">
          <span>⏰ ${ev.horario}</span>
          <span>📍 ${ev.local}</span>
        </div>
        <p style="font-size:0.88rem;margin-top:0.5rem;color:#4a4a5a;">${ev.descricao}</p>
      </div>
    </div>`;
}

// ---- PÁGINA DE MATÉRIAS ----
let todasMaterias = [];
let categoriaAtivaMaterias = 'Todos';
let buscaMaterias = '';
const ITEMS_POR_PAGINA = 6;
let paginaAtualMaterias = 1;

async function carregarPaginaMaterias() {
  todasMaterias = await carregarJSON('conteudo/materias.json') || [];
  renderizarFiltros(todasMaterias, 'filtros-materias', (cat) => {
    categoriaAtivaMaterias = cat;
    paginaAtualMaterias = 1;
    renderizarMaterias();
  });
  renderizarMaterias();
}

function renderizarMaterias() {
  const filtradas = filtrarItens(todasMaterias, categoriaAtivaMaterias, buscaMaterias);
  const container = document.getElementById('lista-materias');
  const paginacao = document.getElementById('paginacao-materias');
  if (!container) return;
  renderizarListaPaginada(filtradas, container, paginacao, paginaAtualMaterias, ITEMS_POR_PAGINA, 'materias', (pag) => {
    paginaAtualMaterias = pag;
    renderizarMaterias();
  });
}

// ---- PÁGINA DE MENSAGENS ----
let todasMensagens = [];
let categoriaAtivaMensagens = 'Todos';
let buscaMensagens = '';
let paginaAtualMensagens = 1;

async function carregarPaginaMensagens() {
  todasMensagens = await carregarJSON('conteudo/mensagens.json') || [];
  renderizarFiltros(todasMensagens, 'filtros-mensagens', (cat) => {
    categoriaAtivaMensagens = cat;
    paginaAtualMensagens = 1;
    renderizarMensagens();
  });
  renderizarMensagens();
}

function renderizarMensagens() {
  const filtradas = filtrarItens(todasMensagens, categoriaAtivaMensagens, buscaMensagens);
  const container = document.getElementById('lista-mensagens');
  const paginacao = document.getElementById('paginacao-mensagens');
  if (!container) return;
  renderizarListaPaginada(filtradas, container, paginacao, paginaAtualMensagens, ITEMS_POR_PAGINA, 'mensagens', (pag) => {
    paginaAtualMensagens = pag;
    renderizarMensagens();
  });
}

// ---- PÁGINA DE DEVOCIONAIS ----
let todosDevocionais = [];
let paginaAtualDev = 1;
let buscaDev = '';

async function carregarPaginaDevocionais() {
  todosDevocionais = await carregarJSON('conteudo/devocionais.json') || [];
  if (todosDevocionais.length > 0) {
    renderizarDevocionalDestaquePublico(todosDevocionais[0]);
  }
  renderizarDevocionaisLista();
}

function renderizarDevocionalDestaquePublico(dev) {
  const el = document.getElementById('devocional-destaque-pagina');
  if (!el) return;
  el.innerHTML = `
    <div class="devocional-versiculo">${dev.versiculo}</div>
    <h3>${dev.titulo}</h3>
    <p>${dev.resumo}</p>
    <p style="color:rgba(255,255,255,0.6);font-size:0.82rem;margin-top:0.5rem;">📅 ${formatarDataCompleta(dev.data)}</p>
    <div style="margin-top:1.5rem;">
      <button class="btn btn-dourado btn-pequeno" onclick="abrirDevocionalModal(${dev.id})">📖 Ler completo</button>
    </div>`;
}

function renderizarDevocionaisLista() {
  const anteriores = todosDevocionais.slice(1);
  const filtrados = buscaDev ? anteriores.filter(d => d.titulo.toLowerCase().includes(buscaDev) || d.resumo.toLowerCase().includes(buscaDev)) : anteriores;
  const container = document.getElementById('lista-devocionais');
  const paginacao = document.getElementById('paginacao-devocionais');
  if (!container) return;
  renderizarListaPaginada(filtrados, container, paginacao, paginaAtualDev, ITEMS_POR_PAGINA, 'devocionais', (pag) => {
    paginaAtualDev = pag;
    renderizarDevocionaisLista();
  });
}

function abrirDevocionalModal(id) {
  const dev = todosDevocionais.find(d => d.id === id);
  if (!dev) return;
  preencherModalDevocional(dev);
  Modal.abrir('modal-devocional');
}
window.abrirDevocionalModal = abrirDevocionalModal;

// ---- PÁGINA DE ESTUDOS ----
let todosEstudos = [];
let categoriaAtivaEstudos = 'Todos';
let buscaEstudos = '';
let paginaAtualEstudos = 1;

async function carregarPaginaEstudos() {
  todosEstudos = await carregarJSON('conteudo/estudos.json') || [];
  renderizarFiltros(todosEstudos, 'filtros-estudos', (cat) => {
    categoriaAtivaEstudos = cat;
    paginaAtualEstudos = 1;
    renderizarEstudos();
  });
  renderizarEstudos();
}

function renderizarEstudos() {
  const filtrados = filtrarItens(todosEstudos, categoriaAtivaEstudos, buscaEstudos);
  const container = document.getElementById('lista-estudos');
  const paginacao = document.getElementById('paginacao-estudos');
  if (!container) return;
  renderizarListaPaginada(filtrados, container, paginacao, paginaAtualEstudos, ITEMS_POR_PAGINA, 'estudos', (pag) => {
    paginaAtualEstudos = pag;
    renderizarEstudos();
  });
}

// ---- PÁGINA DE AGENDA ----
async function carregarPaginaAgenda() {
  const agenda = await carregarJSON('conteudo/agenda.json') || [];
  const container = document.getElementById('lista-agenda');
  if (!container) return;
  if (agenda.length === 0) {
    container.innerHTML = '<div class="estado-vazio"><div class="icone">📅</div><p>Nenhum evento cadastrado.</p></div>';
    return;
  }
  container.innerHTML = agenda.map(ev => criarCardEvento(ev)).join('');
}

// ---- PÁGINA DE ARTIGO (detalhe) ----
async function carregarArtigo() {
  const params = new URLSearchParams(window.location.search);
  const tipo = params.get('tipo');
  const id = parseInt(params.get('id'));
  if (!tipo || !id) { window.location.href = 'index.html'; return; }

  const arquivos = { materias: 'conteudo/materias.json', mensagens: 'conteudo/mensagens.json', estudos: 'conteudo/estudos.json', devocionais: 'conteudo/devocionais.json' };
  const dados = await carregarJSON(arquivos[tipo]);
  if (!dados) return;

  const item = dados.find(i => i.id === id);
  if (!item) { window.location.href = 'index.html'; return; }

  // Preenche título da aba
  document.title = `${item.titulo} — Embaixadores do Reino`;

  // Preenche header
  const elCat = document.getElementById('artigo-categoria');
  const elTitulo = document.getElementById('artigo-titulo');
  const elMeta = document.getElementById('artigo-meta');
  if (elCat) elCat.textContent = item.categoria;
  if (elTitulo) elTitulo.textContent = item.titulo;
  if (elMeta) elMeta.innerHTML = `
    <span>📅 ${formatarDataCompleta(item.data)}</span>
    <span>✍️ ${item.autor}</span>
    ${item.duracao ? `<span>⏱ ${item.duracao}</span>` : ''}
    ${item.nivel ? `<span>📊 ${item.nivel}</span>` : ''}`;

  // Preenche conteúdo
  const elConteudo = document.getElementById('artigo-conteudo-texto');
  if (elConteudo) {
    let html = '';
    if (item.versiculo) {
      html += `<div class="modal-versiculo" style="margin-bottom:2rem;">${item.versiculo}</div>`;
    }
    html += item.conteudo.split('\n\n').map(p => {
      if (p.match(/^[A-Z0-9\.\s]{3,}$/m) || p.startsWith('INTRODUÇÃO') || p.startsWith('CONCLUSÃO') || /^\d+\./.test(p)) {
        return `<h2>${p}</h2>`;
      }
      return `<p>${p}</p>`;
    }).join('');

    if (item.tags && item.tags.length) {
      html += `<div style="margin-top:2rem;padding-top:1.5rem;border-top:1px solid #e0e0e6;display:flex;gap:0.5rem;flex-wrap:wrap;">
        <strong style="color:#1a3557;">Tags:</strong>
        ${item.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>`;
    }
    elConteudo.innerHTML = html;
  }

  // Artigos relacionados
  const relacionadosContainer = document.getElementById('artigos-relacionados');
  if (relacionadosContainer) {
    const relacionados = dados.filter(i => i.id !== id && i.categoria === item.categoria).slice(0, 3);
    if (relacionados.length > 0) {
      relacionadosContainer.innerHTML = relacionados.map(r => criarCard(r, tipo)).join('');
    } else {
      document.getElementById('secao-relacionados')?.remove();
    }
  }
}

// ---- UTILITÁRIOS ----
function filtrarItens(items, categoria, busca) {
  return items.filter(item => {
    const matchCat = categoria === 'Todos' || item.categoria === categoria;
    const matchBusca = !busca || item.titulo.toLowerCase().includes(busca) || item.resumo.toLowerCase().includes(busca);
    return matchCat && matchBusca;
  });
}

function renderizarFiltros(items, containerId, onChange) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const categorias = ['Todos', ...new Set(items.map(i => i.categoria))];
  container.innerHTML = categorias.map(cat => `
    <button class="btn-filtro ${cat === 'Todos' ? 'ativo' : ''}" data-cat="${cat}">${cat}</button>
  `).join('');
  container.querySelectorAll('.btn-filtro').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      onChange(btn.dataset.cat);
    });
  });
}

function renderizarListaPaginada(items, container, paginacaoEl, pagAtual, porPagina, tipo, onMudaPagina) {
  if (items.length === 0) {
    container.innerHTML = '<div class="estado-vazio"><div class="icone">🔍</div><p>Nenhum item encontrado.</p></div>';
    if (paginacaoEl) paginacaoEl.innerHTML = '';
    return;
  }
  const totalPaginas = Math.ceil(items.length / porPagina);
  const inicio = (pagAtual - 1) * porPagina;
  const pagItems = items.slice(inicio, inicio + porPagina);

  container.innerHTML = pagItems.map(item => criarCard(item, tipo)).join('');
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });

  if (paginacaoEl) {
    renderizarPaginacao(paginacaoEl, pagAtual, totalPaginas, onMudaPagina);
  }
}

function renderizarPaginacao(container, pagAtual, total, onChange) {
  if (total <= 1) { container.innerHTML = ''; return; }
  let html = `<button class="btn-pag" ${pagAtual === 1 ? 'disabled' : ''} onclick="(${onChange})(${pagAtual - 1})">‹</button>`;
  for (let i = 1; i <= total; i++) {
    html += `<button class="btn-pag ${i === pagAtual ? 'ativo' : ''}" onclick="(${onChange})(${i})">${i}</button>`;
  }
  html += `<button class="btn-pag" ${pagAtual === total ? 'disabled' : ''} onclick="(${onChange})(${pagAtual + 1})">›</button>`;
  container.innerHTML = html;
}

// ---- BUSCA ----
function initBusca(inputId, onBusca) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.addEventListener('input', () => {
    onBusca(input.value.toLowerCase().trim());
  });
}

// ---- AUTO-INIT por página ----
document.addEventListener('DOMContentLoaded', () => {
  const pagina = window.location.pathname.split('/').pop() || 'index.html';

  if (pagina === 'index.html' || pagina === '') carregarHome();

  if (pagina === 'materias.html') {
    carregarPaginaMaterias();
    initBusca('busca-materias', (v) => { buscaMaterias = v; paginaAtualMaterias = 1; renderizarMaterias(); });
  }

  if (pagina === 'mensagens.html') {
    carregarPaginaMensagens();
    initBusca('busca-mensagens', (v) => { buscaMensagens = v; paginaAtualMensagens = 1; renderizarMensagens(); });
  }

  if (pagina === 'devocionais.html') {
    carregarPaginaDevocionais();
    initBusca('busca-devocionais', (v) => { buscaDev = v; paginaAtualDev = 1; renderizarDevocionaisLista(); });
  }

  if (pagina === 'estudos.html') {
    carregarPaginaEstudos();
    initBusca('busca-estudos', (v) => { buscaEstudos = v; paginaAtualEstudos = 1; renderizarEstudos(); });
  }

  if (pagina === 'agenda.html') carregarPaginaAgenda();
  if (pagina === 'artigo.html') carregarArtigo();
});
