/* =========================================
   EMBAIXADORES DO REINO — componentes.js
   Header, Footer e componentes reutilizáveis
   ========================================= */

const HEADER_HTML = `
<header id="header" role="banner">
  <div class="header-inner">
    <a href="index.html" class="logo" aria-label="Embaixadores do Reino - Início">
      <div class="logo-icone">✝</div>
      <div class="logo-texto">
        <span class="nome">Embaixadores do Reino</span>
        <span class="slogan">Portal Evangélico</span>
      </div>
    </a>
    <nav class="nav-desktop" aria-label="Navegação principal">
      <a href="index.html">Início</a>
      <a href="materias.html">Matérias</a>
      <a href="mensagens.html">Mensagens</a>
      <a href="devocionais.html">Devocionais</a>
      <a href="estudos.html">Estudos</a>
      <a href="biblia.html">Bíblia</a>
      <a href="radio.html">Rádio</a>
      <a href="oracao.html">Oração</a>
      <a href="agenda.html">Agenda</a>
      <a href="contato.html">Contato</a>
    </nav>
    <button class="btn-menu-mobile" id="btn-menu-mobile" aria-label="Abrir menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>
<nav class="nav-mobile" id="nav-mobile" aria-label="Menu mobile">
  <a href="index.html">🏠 Início</a>
  <a href="materias.html">📰 Matérias</a>
  <a href="mensagens.html">🎤 Mensagens</a>
  <a href="devocionais.html">🙏 Devocionais</a>
  <a href="estudos.html">📖 Estudos Bíblicos</a>
  <a href="biblia.html">📜 Bíblia Online</a>
  <a href="radio.html">📻 Rádio</a>
  <a href="oracao.html">✝ Pedido de Oração</a>
  <a href="agenda.html">📅 Agenda</a>
  <a href="sobre.html">ℹ️ Sobre</a>
  <a href="contato.html">📩 Contato</a>
</nav>`;

const FOOTER_HTML = `
<footer id="footer" role="contentinfo">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-sobre">
        <div class="logo">
          <div class="logo-icone">✝</div>
          <div class="logo-texto">
            <span class="nome">Embaixadores do Reino</span>
            <span class="slogan">Portal Evangélico</span>
          </div>
        </div>
        <p>Um portal evangélico dedicado à evangelização, ensino bíblico e edificação cristã. Matérias, mensagens, devocionais, estudos, rádio e Bíblia online.</p>
        <div class="footer-redes">
          <a href="#" aria-label="Facebook" title="Facebook">f</a>
          <a href="#" aria-label="Instagram" title="Instagram">📷</a>
          <a href="#" aria-label="YouTube" title="YouTube">▶</a>
          <a href="#" aria-label="WhatsApp" title="WhatsApp">💬</a>
        </div>
      </div>
      <div class="footer-coluna">
        <h4>Conteúdo</h4>
        <a href="materias.html">Matérias</a>
        <a href="mensagens.html">Mensagens</a>
        <a href="devocionais.html">Devocionais</a>
        <a href="estudos.html">Estudos Bíblicos</a>
        <a href="biblia.html">Bíblia Online</a>
      </div>
      <div class="footer-coluna">
        <h4>Portal</h4>
        <a href="radio.html">📻 Rádio</a>
        <a href="oracao.html">🙏 Pedido de Oração</a>
        <a href="agenda.html">📅 Agenda</a>
        <a href="sobre.html">Sobre nós</a>
        <a href="contato.html">Contato</a>
      </div>
      <div class="footer-coluna">
        <h4>Institucional</h4>
        <a href="sobre.html">Missão e Visão</a>
        <a href="contato.html">Fale Conosco</a>
        <a href="privacidade.html">Privacidade</a>
        <a href="sitemap.xml">Sitemap</a>
        <a href="feed.xml">Feed RSS</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} Embaixadores do Reino. Todos os direitos reservados.</p>
      <p><a href="privacidade.html">Política de Privacidade</a> · <a href="sitemap.xml">Sitemap</a></p>
    </div>
  </div>
</footer>
<button id="btn-topo" aria-label="Voltar ao topo" title="Voltar ao topo">▲</button>`;

// Injeta header e footer automaticamente
document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('header-container');
  const footerContainer = document.getElementById('footer-container');
  if (headerContainer) headerContainer.innerHTML = HEADER_HTML;
  if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;
});
