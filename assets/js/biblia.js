/* =========================================
   EMBAIXADORES DO REINO — biblia.js
   Bíblia Online completa via GetBible API
   Tradução usada: almeida — João Ferreira de Almeida, edição 1911
   Fonte: https://api.getbible.net/v2/almeida
   ========================================= */

const GETBIBLE_TRADUCAO = 'almeida';
const GETBIBLE_API = 'https://api.getbible.net/v2';

const LIVROS_BIBLIA_COMPLETA = [
  {
    "numero": 1,
    "id": "genesis",
    "nome": "Gênesis",
    "testamento": "Antigo Testamento",
    "capitulos": 50
  },
  {
    "numero": 2,
    "id": "exodo",
    "nome": "Êxodo",
    "testamento": "Antigo Testamento",
    "capitulos": 40
  },
  {
    "numero": 3,
    "id": "levitico",
    "nome": "Levítico",
    "testamento": "Antigo Testamento",
    "capitulos": 27
  },
  {
    "numero": 4,
    "id": "numeros",
    "nome": "Números",
    "testamento": "Antigo Testamento",
    "capitulos": 36
  },
  {
    "numero": 5,
    "id": "deuteronomio",
    "nome": "Deuteronômio",
    "testamento": "Antigo Testamento",
    "capitulos": 34
  },
  {
    "numero": 6,
    "id": "josue",
    "nome": "Josué",
    "testamento": "Antigo Testamento",
    "capitulos": 24
  },
  {
    "numero": 7,
    "id": "juizes",
    "nome": "Juízes",
    "testamento": "Antigo Testamento",
    "capitulos": 21
  },
  {
    "numero": 8,
    "id": "rute",
    "nome": "Rute",
    "testamento": "Antigo Testamento",
    "capitulos": 4
  },
  {
    "numero": 9,
    "id": "1-samuel",
    "nome": "1 Samuel",
    "testamento": "Antigo Testamento",
    "capitulos": 31
  },
  {
    "numero": 10,
    "id": "2-samuel",
    "nome": "2 Samuel",
    "testamento": "Antigo Testamento",
    "capitulos": 24
  },
  {
    "numero": 11,
    "id": "1-reis",
    "nome": "1 Reis",
    "testamento": "Antigo Testamento",
    "capitulos": 22
  },
  {
    "numero": 12,
    "id": "2-reis",
    "nome": "2 Reis",
    "testamento": "Antigo Testamento",
    "capitulos": 25
  },
  {
    "numero": 13,
    "id": "1-cronicas",
    "nome": "1 Crônicas",
    "testamento": "Antigo Testamento",
    "capitulos": 29
  },
  {
    "numero": 14,
    "id": "2-cronicas",
    "nome": "2 Crônicas",
    "testamento": "Antigo Testamento",
    "capitulos": 36
  },
  {
    "numero": 15,
    "id": "esdras",
    "nome": "Esdras",
    "testamento": "Antigo Testamento",
    "capitulos": 10
  },
  {
    "numero": 16,
    "id": "neemias",
    "nome": "Neemias",
    "testamento": "Antigo Testamento",
    "capitulos": 13
  },
  {
    "numero": 17,
    "id": "ester",
    "nome": "Ester",
    "testamento": "Antigo Testamento",
    "capitulos": 10
  },
  {
    "numero": 18,
    "id": "jo",
    "nome": "Jó",
    "testamento": "Antigo Testamento",
    "capitulos": 42
  },
  {
    "numero": 19,
    "id": "salmos",
    "nome": "Salmos",
    "testamento": "Antigo Testamento",
    "capitulos": 150
  },
  {
    "numero": 20,
    "id": "proverbios",
    "nome": "Provérbios",
    "testamento": "Antigo Testamento",
    "capitulos": 31
  },
  {
    "numero": 21,
    "id": "eclesiastes",
    "nome": "Eclesiastes",
    "testamento": "Antigo Testamento",
    "capitulos": 12
  },
  {
    "numero": 22,
    "id": "cantares",
    "nome": "Cantares",
    "testamento": "Antigo Testamento",
    "capitulos": 8
  },
  {
    "numero": 23,
    "id": "isaias",
    "nome": "Isaías",
    "testamento": "Antigo Testamento",
    "capitulos": 66
  },
  {
    "numero": 24,
    "id": "jeremias",
    "nome": "Jeremias",
    "testamento": "Antigo Testamento",
    "capitulos": 52
  },
  {
    "numero": 25,
    "id": "lamentacoes",
    "nome": "Lamentações",
    "testamento": "Antigo Testamento",
    "capitulos": 5
  },
  {
    "numero": 26,
    "id": "ezequiel",
    "nome": "Ezequiel",
    "testamento": "Antigo Testamento",
    "capitulos": 48
  },
  {
    "numero": 27,
    "id": "daniel",
    "nome": "Daniel",
    "testamento": "Antigo Testamento",
    "capitulos": 12
  },
  {
    "numero": 28,
    "id": "oseias",
    "nome": "Oséias",
    "testamento": "Antigo Testamento",
    "capitulos": 14
  },
  {
    "numero": 29,
    "id": "joel",
    "nome": "Joel",
    "testamento": "Antigo Testamento",
    "capitulos": 3
  },
  {
    "numero": 30,
    "id": "amos",
    "nome": "Amós",
    "testamento": "Antigo Testamento",
    "capitulos": 9
  },
  {
    "numero": 31,
    "id": "obadias",
    "nome": "Obadias",
    "testamento": "Antigo Testamento",
    "capitulos": 1
  },
  {
    "numero": 32,
    "id": "jonas",
    "nome": "Jonas",
    "testamento": "Antigo Testamento",
    "capitulos": 4
  },
  {
    "numero": 33,
    "id": "miqueias",
    "nome": "Miquéias",
    "testamento": "Antigo Testamento",
    "capitulos": 7
  },
  {
    "numero": 34,
    "id": "naum",
    "nome": "Naum",
    "testamento": "Antigo Testamento",
    "capitulos": 3
  },
  {
    "numero": 35,
    "id": "habacuque",
    "nome": "Habacuque",
    "testamento": "Antigo Testamento",
    "capitulos": 3
  },
  {
    "numero": 36,
    "id": "sofonias",
    "nome": "Sofonias",
    "testamento": "Antigo Testamento",
    "capitulos": 3
  },
  {
    "numero": 37,
    "id": "ageu",
    "nome": "Ageu",
    "testamento": "Antigo Testamento",
    "capitulos": 2
  },
  {
    "numero": 38,
    "id": "zacarias",
    "nome": "Zacarias",
    "testamento": "Antigo Testamento",
    "capitulos": 14
  },
  {
    "numero": 39,
    "id": "malaquias",
    "nome": "Malaquias",
    "testamento": "Antigo Testamento",
    "capitulos": 4
  },
  {
    "numero": 40,
    "id": "mateus",
    "nome": "Mateus",
    "testamento": "Novo Testamento",
    "capitulos": 28
  },
  {
    "numero": 41,
    "id": "marcos",
    "nome": "Marcos",
    "testamento": "Novo Testamento",
    "capitulos": 16
  },
  {
    "numero": 42,
    "id": "lucas",
    "nome": "Lucas",
    "testamento": "Novo Testamento",
    "capitulos": 24
  },
  {
    "numero": 43,
    "id": "joao",
    "nome": "João",
    "testamento": "Novo Testamento",
    "capitulos": 21
  },
  {
    "numero": 44,
    "id": "atos",
    "nome": "Atos",
    "testamento": "Novo Testamento",
    "capitulos": 28
  },
  {
    "numero": 45,
    "id": "romanos",
    "nome": "Romanos",
    "testamento": "Novo Testamento",
    "capitulos": 16
  },
  {
    "numero": 46,
    "id": "1-corintios",
    "nome": "1 Coríntios",
    "testamento": "Novo Testamento",
    "capitulos": 16
  },
  {
    "numero": 47,
    "id": "2-corintios",
    "nome": "2 Coríntios",
    "testamento": "Novo Testamento",
    "capitulos": 13
  },
  {
    "numero": 48,
    "id": "galatas",
    "nome": "Gálatas",
    "testamento": "Novo Testamento",
    "capitulos": 6
  },
  {
    "numero": 49,
    "id": "efesios",
    "nome": "Efésios",
    "testamento": "Novo Testamento",
    "capitulos": 6
  },
  {
    "numero": 50,
    "id": "filipenses",
    "nome": "Filipenses",
    "testamento": "Novo Testamento",
    "capitulos": 4
  },
  {
    "numero": 51,
    "id": "colossenses",
    "nome": "Colossenses",
    "testamento": "Novo Testamento",
    "capitulos": 4
  },
  {
    "numero": 52,
    "id": "1-tessalonicenses",
    "nome": "1 Tessalonicenses",
    "testamento": "Novo Testamento",
    "capitulos": 5
  },
  {
    "numero": 53,
    "id": "2-tessalonicenses",
    "nome": "2 Tessalonicenses",
    "testamento": "Novo Testamento",
    "capitulos": 3
  },
  {
    "numero": 54,
    "id": "1-timoteo",
    "nome": "1 Timóteo",
    "testamento": "Novo Testamento",
    "capitulos": 6
  },
  {
    "numero": 55,
    "id": "2-timoteo",
    "nome": "2 Timóteo",
    "testamento": "Novo Testamento",
    "capitulos": 4
  },
  {
    "numero": 56,
    "id": "tito",
    "nome": "Tito",
    "testamento": "Novo Testamento",
    "capitulos": 3
  },
  {
    "numero": 57,
    "id": "filemom",
    "nome": "Filemom",
    "testamento": "Novo Testamento",
    "capitulos": 1
  },
  {
    "numero": 58,
    "id": "hebreus",
    "nome": "Hebreus",
    "testamento": "Novo Testamento",
    "capitulos": 13
  },
  {
    "numero": 59,
    "id": "tiago",
    "nome": "Tiago",
    "testamento": "Novo Testamento",
    "capitulos": 5
  },
  {
    "numero": 60,
    "id": "1-pedro",
    "nome": "1 Pedro",
    "testamento": "Novo Testamento",
    "capitulos": 5
  },
  {
    "numero": 61,
    "id": "2-pedro",
    "nome": "2 Pedro",
    "testamento": "Novo Testamento",
    "capitulos": 3
  },
  {
    "numero": 62,
    "id": "1-joao",
    "nome": "1 João",
    "testamento": "Novo Testamento",
    "capitulos": 5
  },
  {
    "numero": 63,
    "id": "2-joao",
    "nome": "2 João",
    "testamento": "Novo Testamento",
    "capitulos": 1
  },
  {
    "numero": 64,
    "id": "3-joao",
    "nome": "3 João",
    "testamento": "Novo Testamento",
    "capitulos": 1
  },
  {
    "numero": 65,
    "id": "judas",
    "nome": "Judas",
    "testamento": "Novo Testamento",
    "capitulos": 1
  },
  {
    "numero": 66,
    "id": "apocalipse",
    "nome": "Apocalipse",
    "testamento": "Novo Testamento",
    "capitulos": 22
  }
];

let livrosData = [];
let livroAtual = null;
let capituloAtual = 1;
let dadosLivro = null;
const cacheCapitulos = new Map();
const cacheLivrosCompletos = new Map();

async function initBiblia() {
  try {
    const locais = await carregarJSON('conteudo/biblia/livros.json');
    livrosData = Array.isArray(locais) && locais.length ? locais : LIVROS_BIBLIA_COMPLETA;
  } catch (erro) {
    livrosData = LIVROS_BIBLIA_COMPLETA;
  }

  preencherSelectLivros();
  configurarEventos();

  const selectLivro = document.getElementById('select-livro');
  if (selectLivro) {
    selectLivro.value = 'joao';
    await carregarLivro('joao');
    const selectCap = document.getElementById('select-capitulo');
    if (selectCap) { selectCap.value = '3'; capituloAtual = 3; }
    await renderizarCapitulo();
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
  dadosLivro = { capitulos: {} };
  capituloAtual = 1;
  preencherSelectCapitulos(livroAtual.capitulos);
}

function textoCarregando(mensagem = 'Carregando capítulo...') {
  const area = document.getElementById('biblia-versiculos');
  if (!area) return;
  area.innerHTML = `<div class="loader"><div class="spinner"></div></div><p style="text-align:center;color:#777;margin-top:0.75rem;">${mensagem}</p>`;
}

async function carregarCapituloAtual() {
  if (!livroAtual) return [];

  const chave = `${livroAtual.id}-${capituloAtual}`;
  if (cacheCapitulos.has(chave)) return cacheCapitulos.get(chave);

  const url = `${GETBIBLE_API}/${GETBIBLE_TRADUCAO}/${livroAtual.numero}/${capituloAtual}.json`;
  const resposta = await fetch(url, { cache: 'force-cache' });
  if (!resposta.ok) throw new Error(`Falha ao carregar ${livroAtual.nome} ${capituloAtual}`);

  const bruto = await resposta.json();
  const versiculos = extrairVersiculosDeCapitulo(bruto, capituloAtual);
  cacheCapitulos.set(chave, versiculos);

  if (!dadosLivro) dadosLivro = { capitulos: {} };
  dadosLivro.capitulos[String(capituloAtual)] = versiculos;

  return versiculos;
}

function extrairVersiculosDeCapitulo(bruto, capitulo) {
  let lista = [];

  if (Array.isArray(bruto?.verses)) lista = bruto.verses;
  else if (Array.isArray(bruto?.chapter?.verses)) lista = bruto.chapter.verses;
  else if (Array.isArray(bruto?.chapters)) {
    const achado = bruto.chapters.find(c => Number(c.chapter || c.chapter_nr || c.nr) === Number(capitulo));
    if (achado) lista = achado.verses || achado.versiculos || [];
  } else if (Array.isArray(bruto)) lista = bruto;

  return lista.map((v, idx) => ({
    versiculo: Number(v.verse || v.verse_nr || v.nr || v.versiculo || idx + 1),
    texto: limparTexto(String(v.text || v.texto || v.value || ''))
  })).filter(v => v.texto);
}

function normalizarLivroCompleto(bruto) {
  const capitulos = {};

  if (Array.isArray(bruto?.chapters)) {
    bruto.chapters.forEach((cap, index) => {
      const numero = Number(cap.chapter || cap.chapter_nr || cap.nr || index + 1);
      capitulos[String(numero)] = extrairVersiculosDeCapitulo(cap, numero);
    });
  } else if (bruto?.chapters && typeof bruto.chapters === 'object') {
    Object.entries(bruto.chapters).forEach(([numero, cap]) => {
      capitulos[String(numero)] = extrairVersiculosDeCapitulo(cap, Number(numero));
    });
  } else if (Array.isArray(bruto?.verses)) {
    bruto.verses.forEach((v, idx) => {
      const cap = String(v.chapter || v.chapter_nr || 1);
      if (!capitulos[cap]) capitulos[cap] = [];
      capitulos[cap].push({
        versiculo: Number(v.verse || v.verse_nr || v.nr || idx + 1),
        texto: limparTexto(String(v.text || v.texto || ''))
      });
    });
  }

  return { capitulos };
}

function limparTexto(texto) {
  return texto
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

async function renderizarCapitulo() {
  const area = document.getElementById('biblia-versiculos');
  const titulo = document.getElementById('biblia-titulo-cap');
  if (!area) return;

  if (!livroAtual) {
    area.innerHTML = '<div class="estado-vazio"><div class="icone">📖</div><p>Selecione um livro para começar a leitura.</p></div>';
    if (titulo) titulo.textContent = 'Bíblia Online';
    return;
  }

  if (titulo) titulo.textContent = `${livroAtual.nome} — Capítulo ${capituloAtual}`;

  const btnAnterior = document.getElementById('btn-cap-anterior');
  const btnProximo = document.getElementById('btn-cap-proximo');
  if (btnAnterior) btnAnterior.disabled = capituloAtual <= 1;
  if (btnProximo) btnProximo.disabled = capituloAtual >= livroAtual.capitulos;

  try {
    textoCarregando();
    const versiculos = await carregarCapituloAtual();

    if (!versiculos || versiculos.length === 0) {
      area.innerHTML = `
        <div class="estado-vazio">
          <div class="icone">📜</div>
          <p>Não foi possível carregar <strong>${livroAtual.nome} ${capituloAtual}</strong>.</p>
        </div>`;
      return;
    }

    area.innerHTML = versiculos.map(v => `
      <div class="versiculo-item" onclick="abrirVersiculoModal('${escaparAttr(livroAtual.nome)}', ${capituloAtual}, ${v.versiculo}, \`${escaparTemplate(v.texto)}\`)" title="Clique para opções">
        <span class="versiculo-num">${v.versiculo}</span>
        <span class="versiculo-texto">${v.texto}</span>
      </div>`).join('');
  } catch (erro) {
    area.innerHTML = `
      <div class="estado-vazio">
        <div class="icone">⚠️</div>
        <p>Não foi possível carregar a Bíblia agora.</p>
        <p style="font-size:0.9rem;margin-top:0.5rem;">Verifique sua conexão e tente novamente.</p>
      </div>`;
  }
}

function escaparTemplate(texto) {
  return String(texto).replace(/`/g, "'").replace(/\\/g, '\\\\').replace(/\$/g, '\\$');
}

function escaparAttr(texto) {
  return String(texto).replace(/'/g, "\\'");
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

async function carregarLivroCompletoParaBusca() {
  if (!livroAtual) return { capitulos: {} };
  if (cacheLivrosCompletos.has(livroAtual.id)) return cacheLivrosCompletos.get(livroAtual.id);

  const url = `${GETBIBLE_API}/${GETBIBLE_TRADUCAO}/${livroAtual.numero}.json`;
  const resposta = await fetch(url, { cache: 'force-cache' });
  if (!resposta.ok) throw new Error(`Falha ao carregar busca de ${livroAtual.nome}`);

  const bruto = await resposta.json();
  const normalizado = normalizarLivroCompleto(bruto);
  cacheLivrosCompletos.set(livroAtual.id, normalizado);
  return normalizado;
}

async function buscaBiblia(termo) {
  if (!livroAtual || !termo) { await renderizarCapitulo(); return; }

  const area = document.getElementById('biblia-versiculos');
  const titulo = document.getElementById('biblia-titulo-cap');
  if (!area) return;

  try {
    textoCarregando('Buscando no livro selecionado...');
    const livroBusca = await carregarLivroCompletoParaBusca();
    const resultados = [];

    Object.entries(livroBusca.capitulos || {}).forEach(([cap, versiculos]) => {
      (versiculos || []).forEach(v => {
        if (v.texto.toLowerCase().includes(termo.toLowerCase())) {
          resultados.push({ cap: parseInt(cap), ...v });
        }
      });
    });

    if (titulo) titulo.textContent = `Busca em ${livroAtual.nome}: "${termo}" — ${resultados.length} resultado(s)`;

    if (resultados.length === 0) {
      area.innerHTML = `<div class="estado-vazio"><div class="icone">🔍</div><p>Nenhum versículo encontrado com "<strong>${termo}</strong>".</p></div>`;
      return;
    }

    area.innerHTML = resultados.map(v => {
      const regex = new RegExp(termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const textoDestacado = v.texto.replace(regex, m => `<mark style="background:rgba(200,169,81,0.3);border-radius:3px;">${m}</mark>`);
      return `
        <div class="versiculo-item" onclick="abrirVersiculoModal('${escaparAttr(livroAtual?.nome || '')}', ${v.cap}, ${v.versiculo}, \`${escaparTemplate(v.texto)}\`)">
          <span class="versiculo-num">${v.cap}:${v.versiculo}</span>
          <span class="versiculo-texto">${textoDestacado}</span>
        </div>`;
    }).join('');
  } catch (erro) {
    area.innerHTML = `
      <div class="estado-vazio">
        <div class="icone">⚠️</div>
        <p>Não foi possível realizar a busca agora.</p>
      </div>`;
  }
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
      if (inputBusca) inputBusca.value = '';
      await renderizarCapitulo();
    });
  }

  if (selectCap) {
    selectCap.addEventListener('change', async () => {
      capituloAtual = parseInt(selectCap.value);
      if (inputBusca) inputBusca.value = '';
      await renderizarCapitulo();
    });
  }

  if (inputBusca) {
    let timer;
    inputBusca.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        const termo = inputBusca.value.trim();
        if (termo.length >= 3) await buscaBiblia(termo);
        else await renderizarCapitulo();
      }, 400);
    });
  }

  if (btnAnterior) {
    btnAnterior.addEventListener('click', async () => {
      if (capituloAtual > 1) {
        capituloAtual--;
        const sel = document.getElementById('select-capitulo');
        if (sel) sel.value = capituloAtual;
        if (inputBusca) inputBusca.value = '';
        await renderizarCapitulo();
        document.getElementById('biblia-versiculos')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnProximo) {
    btnProximo.addEventListener('click', async () => {
      if (livroAtual && capituloAtual < livroAtual.capitulos) {
        capituloAtual++;
        const sel = document.getElementById('select-capitulo');
        if (sel) sel.value = capituloAtual;
        if (inputBusca) inputBusca.value = '';
        await renderizarCapitulo();
        document.getElementById('biblia-versiculos')?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('select-livro')) initBiblia();
});
