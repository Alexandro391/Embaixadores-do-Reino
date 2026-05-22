/* =========================================
   EMBAIXADORES DO REINO — biblia.js
   Bíblia Online com arquivos JSON locais
   ========================================= */

let livrosData = [];
let livroAtual = null;
let capituloAtual = 1;
let dadosLivro = null;

async function initBiblia() {
  livrosData = await carregarJSON('conteudo/biblia/livros.json') || [];
  preencherSelectLivros();
  configurarEventos();

  // Carrega João 3 como padrão
  const selectLivro = document.getElementById('select-livro');
  if (selectLivro) {
    selectLivro.value = 'joao';
    await carregarLivro('joao');
    const selectCap = document.getElementById('select-capitulo');
    if (selectCap) { selectCap.value = '3'; capituloAtual = 3; }
    renderizarCapitulo();
  }
}

function preencherSelectLivros() {
  const select = document.getElementById('select-livro');
  if (!select) return;

  const at = livrosData.filter(l => l.testamento === 'Antigo Testamento');
  const nt = livrosData.filter(l => l.testamento === 'Novo Testamento');

  select.innerHTML = `
    <option value="">Selecione um livro...</option>
    <optgroup label="Antigo Testamento">
      ${at.map(l => `<option value="${l.id}">${l.nome}</option>`).join('')}
    </optgroup>
    <optgroup label="Novo Testamento">
      ${nt.map(l => `<option value="${l.id}">${l.nome}</option>`).join('')}
    </optgroup>`;
}

function preencherSelectCapitulos(totalCap) {
  const select = document.getElementById('select-capitulo');
  if (!select) return;
  select.innerHTML = Array.from({ length: totalCap }, (_, i) =>
    `<option value="${i + 1}">Capítulo ${i + 1}</option>`).join('');
  select.value = capituloAtual;
}

async function carregarLivro(id) {
  if (!id) return;
  livroAtual = livrosData.find(l => l.id === id);
  if (!livroAtual) return;
  dadosLivro = await carregarJSON(`conteudo/biblia/${id}.json`);
  capituloAtual = 1;
  preencherSelectCapitulos(livroAtual.capitulos);
}

function renderizarCapitulo() {
  const area = document.getElementById('biblia-versiculos');
  const titulo = document.getElementById('biblia-titulo-cap');
  if (!area) return;

  if (!dadosLivro || !livroAtual) {
    area.innerHTML = '<div class="estado-vazio"><div class="icone">📖</div><p>Selecione um livro para começar a leitura.</p></div>';
    if (titulo) titulo.textContent = 'Bíblia Online';
    return;
  }

  const capStr = String(capituloAtual);
  const versiculos = dadosLivro.capitulos?.[capStr];

  if (titulo) titulo.textContent = `${livroAtual.nome} — Capítulo ${capituloAtual}`;

  // Atualiza botões nav
  const btnAnterior = document.getElementById('btn-cap-anterior');
  const btnProximo = document.getElementById('btn-cap-proximo');
  if (btnAnterior) btnAnterior.disabled = capituloAtual <= 1;
  if (btnProximo) btnProximo.disabled = capituloAtual >= livroAtual.capitulos;

  if (!versiculos || versiculos.length === 0) {
    area.innerHTML = `
      <div class="estado-vazio">
        <div class="icone">📜</div>
        <p><strong>${livroAtual.nome} ${capituloAtual}</strong> ainda não foi adicionado.</p>
        <p style="font-size:0.9rem;margin-top:0.5rem;">Adicione o arquivo <code>conteudo/biblia/${livroAtual.id}.json</code> com o conteúdo deste capítulo.</p>
      </div>`;
    return;
  }

  area.innerHTML = versiculos.map(v => `
    <div class="versiculo-item" onclick="abrirVersiculoModal('${livroAtual.nome}', ${capituloAtual}, ${v.versiculo}, \`${v.texto.replace(/`/g,"'")}\`)" title="Clique para opções">
      <span class="versiculo-num">${v.versiculo}</span>
      <span class="versiculo-texto">${v.texto}</span>
    </div>`).join('');
}

function abrirVersiculoModal(livro, cap, num, texto) {
  const ref = `${livro} ${cap}:${num}`;
  const modal = document.getElementById('modal-versiculo');
  if (modal) {
    document.getElementById('modal-ver-ref').textContent = ref;
    document.getElementById('modal-ver-texto').textContent = texto;
    document.getElementById('btn-copiar-ver').onclick = () => copiarVersiculo(ref, texto);
    document.getElementById('btn-compartilhar-ver').onclick = () => compartilharVersiculo(ref, texto);
    Modal.abrir('modal-versiculo');
  }
}
window.abrirVersiculoModal = abrirVersiculoModal;

function copiarVersiculo(ref, texto) {
  const conteudo = `"${texto}" — ${ref}`;
  navigator.clipboard.writeText(conteudo).then(() => {
    const btn = document.getElementById('btn-copiar-ver');
    if (btn) { btn.textContent = '✅ Copiado!'; setTimeout(() => btn.textContent = '📋 Copiar', 2000); }
  });
}

function compartilharVersiculo(ref, texto) {
  const conteudo = `"${texto}" — ${ref} | Embaixadores do Reino`;
  if (navigator.share) {
    navigator.share({ title: ref, text: conteudo, url: window.location.href });
  } else {
    const url = `https://wa.me/?text=${encodeURIComponent(conteudo)}`;
    window.open(url, '_blank');
  }
}

function buscaBiblia(termo) {
  if (!dadosLivro || !termo) { renderizarCapitulo(); return; }
  const area = document.getElementById('biblia-versiculos');
  const titulo = document.getElementById('biblia-titulo-cap');
  if (!area) return;

  const resultados = [];
  Object.entries(dadosLivro.capitulos).forEach(([cap, versiculos]) => {
    versiculos.forEach(v => {
      if (v.texto.toLowerCase().includes(termo.toLowerCase())) {
        resultados.push({ cap: parseInt(cap), ...v });
      }
    });
  });

  if (titulo) titulo.textContent = `Busca: "${termo}" — ${resultados.length} resultado(s)`;

  if (resultados.length === 0) {
    area.innerHTML = `<div class="estado-vazio"><div class="icone">🔍</div><p>Nenhum versículo encontrado com "<strong>${termo}</strong>".</p></div>`;
    return;
  }

  area.innerHTML = resultados.map(v => {
    const textoDestacado = v.texto.replace(new RegExp(termo, 'gi'), m => `<mark style="background:rgba(200,169,81,0.3);border-radius:3px;">${m}</mark>`);
    return `
      <div class="versiculo-item" onclick="abrirVersiculoModal('${livroAtual?.nome || ''}', ${v.cap}, ${v.versiculo}, \`${v.texto.replace(/`/g,"'")}\`)">
        <span class="versiculo-num">${v.cap}:${v.versiculo}</span>
        <span class="versiculo-texto">${textoDestacado}</span>
      </div>`;
  }).join('');
}

function configurarEventos() {
  const selectLivro = document.getElementById('select-livro');
  const selectCap = document.getElementById('select-capitulo');
  const inputBusca = document.getElementById('busca-biblia');
  const btnAnterior = document.getElementById('btn-cap-anterior');
  const btnProximo = document.getElementById('btn-cap-proximo');

  if (selectLivro) {
    selectLivro.addEventListener('change', async () => {
      const val = selectLivro.value;
      if (!val) return;
      await carregarLivro(val);
      renderizarCapitulo();
    });
  }

  if (selectCap) {
    selectCap.addEventListener('change', () => {
      capituloAtual = parseInt(selectCap.value);
      renderizarCapitulo();
    });
  }

  if (inputBusca) {
    let timer;
    inputBusca.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const termo = inputBusca.value.trim();
        if (termo.length >= 3) buscaBiblia(termo);
        else renderizarCapitulo();
      }, 400);
    });
  }

  if (btnAnterior) {
    btnAnterior.addEventListener('click', () => {
      if (capituloAtual > 1) {
        capituloAtual--;
        document.getElementById('select-capitulo').value = capituloAtual;
        renderizarCapitulo();
        document.getElementById('biblia-versiculos')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnProximo) {
    btnProximo.addEventListener('click', () => {
      if (livroAtual && capituloAtual < livroAtual.capitulos) {
        capituloAtual++;
        document.getElementById('select-capitulo').value = capituloAtual;
        renderizarCapitulo();
        document.getElementById('biblia-versiculos')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('select-livro')) initBiblia();
});
