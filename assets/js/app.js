/* =========================================
   EMBAIXADORES DO REINO — app.js
   Funcionalidades gerais do site
   ========================================= */

// Marca a página ativa no menu
function marcarPaginaAtiva() {
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      link.classList.add('ativo');
    }
  });
}

// Menu mobile hambúrguer
function initMenuMobile() {
  const btn = document.getElementById('btn-menu-mobile');
  const nav = document.getElementById('nav-mobile');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const aberto = nav.classList.toggle('aberto');
    btn.classList.toggle('aberto', aberto);
    btn.setAttribute('aria-expanded', aberto);
    document.body.style.overflow = aberto ? 'hidden' : '';
  });

  // Fecha ao clicar em link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('aberto');
      btn.classList.remove('aberto');
      document.body.style.overflow = '';
    });
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('aberto');
      btn.classList.remove('aberto');
      document.body.style.overflow = '';
    }
  });
}

// Header scroll
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// Botão voltar ao topo
function initBtnTopo() {
  const btn = document.getElementById('btn-topo');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visivel', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Sistema de Modais
const Modal = {
  abrir(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.modal-fechar')?.focus();
  },
  fechar(id) {
    const overlay = document.getElementById(id);
    if (!overlay) return;
    overlay.classList.remove('ativo');
    document.body.style.overflow = '';
  },
  fecharTodos() {
    document.querySelectorAll('.modal-overlay.ativo').forEach(m => {
      m.classList.remove('ativo');
    });
    document.body.style.overflow = '';
  },
  init() {
    // Fechar ao clicar no overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.fecharTodos();
      });
    });
    // Fechar ao clicar no X
    document.querySelectorAll('.modal-fechar').forEach(btn => {
      btn.addEventListener('click', () => this.fecharTodos());
    });
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.fecharTodos();
    });
  }
};

// Utilitário: formatar data PT-BR
function formatarData(dataStr) {
  if (!dataStr) return '';
  const [ano, mes, dia] = dataStr.split('-');
  const meses = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  return `${dia}/${meses[parseInt(mes) - 1]}/${ano}`;
}

function formatarDataCompleta(dataStr) {
  if (!dataStr) return '';
  const data = new Date(dataStr + 'T00:00:00');
  return data.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatarMesAbrev(dataStr) {
  if (!dataStr) return '';
  const [, mes] = dataStr.split('-');
  const meses = ['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'];
  return meses[parseInt(mes) - 1];
}

function extrairDia(dataStr) {
  if (!dataStr) return '';
  return dataStr.split('-')[2];
}

// Utilitário: carregar JSON
async function carregarJSON(caminho) {
  try {
    const res = await fetch(caminho);
    if (!res.ok) throw new Error(`Erro ao carregar ${caminho}`);
    return await res.json();
  } catch (err) {
    console.warn('Erro ao carregar JSON:', err.message);
    return null;
  }
}

// Utilitário: criar card de matéria/mensagem/estudo
function criarCard(item, tipo) {
  const icones = { materias: '📰', mensagens: '🎤', estudos: '📖', devocionais: '🙏' };
  const icone = icones[tipo] || '✝';
  const pagina = tipo === 'materias' ? 'artigo.html' : tipo === 'mensagens' ? 'artigo.html' : tipo === 'estudos' ? 'artigo.html' : 'artigo.html';
  const labelBtn = tipo === 'materias' ? 'Ler matéria' : tipo === 'mensagens' ? 'Ler mensagem' : tipo === 'estudos' ? 'Ver estudo' : 'Ler devocional';

  return `
    <article class="card" data-id="${item.id}" data-tipo="${tipo}">
      <div class="card-imagem">
        <div class="card-imagem-placeholder">${icone}</div>
        <span class="card-categoria">${item.categoria}</span>
        ${item.destaque ? '<span class="destaque-badge" style="position:absolute;top:0.75rem;right:0.75rem;">⭐ Destaque</span>' : ''}
      </div>
      <div class="card-corpo">
        <div class="card-meta">
          <span>📅 ${formatarData(item.data)}</span>
          <span>✍️ ${item.autor}</span>
        </div>
        <h3><a href="${pagina}?tipo=${tipo}&id=${item.id}">${item.titulo}</a></h3>
        <p>${item.resumo}</p>
        <div class="card-rodape">
          <a href="${pagina}?tipo=${tipo}&id=${item.id}" class="btn btn-principal btn-pequeno">${labelBtn} →</a>
          ${item.tags ? `<div class="card-tags">${item.tags.slice(0,2).map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
        </div>
      </div>
    </article>`;
}

// Inicialização geral
document.addEventListener('DOMContentLoaded', () => {
  marcarPaginaAtiva();
  initMenuMobile();
  initHeaderScroll();
  initBtnTopo();
  Modal.init();
});

// Expor globalmente
window.Modal = Modal;
window.carregarJSON = carregarJSON;
window.criarCard = criarCard;
window.formatarData = formatarData;
window.formatarDataCompleta = formatarDataCompleta;
window.formatarMesAbrev = formatarMesAbrev;
window.extrairDia = extrairDia;
