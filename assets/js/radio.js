/* =========================================
   EMBAIXADORES DO REINO — radio.js
   Player de rádio evangélica
   ========================================= */

let audioPlayer = null;
let tocando = false;

async function initRadio() {
  const dados = await carregarJSON('conteudo/radio.json');
  if (!dados) return;

  // Preenche info em todos os players
  document.querySelectorAll('.radio-nome').forEach(el => el.textContent = dados.nome);
  document.querySelectorAll('.radio-programa').forEach(el => el.textContent = dados.programaAtual);
  document.querySelectorAll('.radio-slogan').forEach(el => el.textContent = dados.slogan || '');

  // Página completa da rádio
  const nomeCompleto = document.getElementById('radio-nome-completo');
  const sloganEl = document.getElementById('radio-slogan');
  const descEl = document.getElementById('radio-descricao');
  if (nomeCompleto) nomeCompleto.textContent = dados.nome;
  if (sloganEl) sloganEl.textContent = dados.slogan || '';
  if (descEl) descEl.textContent = dados.descricao;

  // Programação
  renderizarProgramacao(dados.programacao);

  // Cria o player de áudio invisível
  audioPlayer = new Audio();
  audioPlayer.src = dados.streamUrl;
  audioPlayer.preload = 'none';

  // Volume
  document.querySelectorAll('.volume-control').forEach(input => {
    input.addEventListener('input', () => {
      if (audioPlayer) audioPlayer.volume = input.value / 100;
    });
  });

  // Botões play/pause
  document.querySelectorAll('.btn-play-pause, .btn-play-grande').forEach(btn => {
    btn.addEventListener('click', () => togglePlay(dados));
  });
}

function togglePlay(dados) {
  if (!audioPlayer) return;
  if (tocando) {
    audioPlayer.pause();
    setEstadoPausado();
  } else {
    audioPlayer.src = dados ? dados.streamUrl : audioPlayer.src;
    audioPlayer.play().catch(() => {
      mostrarErroRadio();
    });
    setEstadoTocando();
  }
}

function setEstadoTocando() {
  tocando = true;
  document.querySelectorAll('.btn-play-pause').forEach(btn => btn.innerHTML = '⏸');
  document.querySelectorAll('.btn-play-grande').forEach(btn => btn.innerHTML = '⏸');
  document.querySelectorAll('.radio-onda').forEach(el => el.classList.remove('pausado'));
  document.querySelectorAll('.radio-status-texto').forEach(el => el.textContent = 'Ao vivo');
}

function setEstadoPausado() {
  tocando = false;
  document.querySelectorAll('.btn-play-pause').forEach(btn => btn.innerHTML = '▶');
  document.querySelectorAll('.btn-play-grande').forEach(btn => btn.innerHTML = '▶');
  document.querySelectorAll('.radio-onda').forEach(el => el.classList.add('pausado'));
  document.querySelectorAll('.radio-status-texto').forEach(el => el.textContent = 'Pausado');
}

function mostrarErroRadio() {
  document.querySelectorAll('.radio-programa').forEach(el => {
    el.textContent = 'Configure a URL da rádio em conteudo/radio.json';
    el.style.color = '#e74c3c';
  });
}

function renderizarProgramacao(programacao) {
  const lista = document.getElementById('programacao-lista');
  if (!lista || !programacao) return;
  lista.innerHTML = programacao.map(p => `
    <div class="programa-item">
      <span class="programa-horario">${p.horario}</span>
      <div class="programa-info">
        <strong>${p.programa}</strong>
        <small>${p.apresentador}</small>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initRadio);
