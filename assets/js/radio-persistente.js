(() => {
  "use strict";

  const audio = document.getElementById("radio-audio");
  const btn = document.getElementById("radio-toggle");
  const volume = document.getElementById("radio-volume");
  const titulo = document.getElementById("radio-titulo");
  const status = document.getElementById("radio-status");
  const frame = document.getElementById("portal-frame");

  const STORAGE_VOLUME = "radioPersistenteVolume";
  const STORAGE_MUTED = "radioPersistenteMuted";

  let streamUrl = "";

  function setStatus(texto) {
    status.textContent = texto;
  }

  function setPlayingUI(isPlaying) {
    btn.textContent = isPlaying ? "❚❚" : "▶";
    btn.setAttribute("aria-label", isPlaying ? "Pausar rádio" : "Tocar rádio");
    btn.setAttribute("title", isPlaying ? "Pausar rádio" : "Tocar rádio");
  }

  function normalizarVolume(valor) {
    const numero = Number(valor);
    if (Number.isNaN(numero)) return 0.8;
    return Math.min(1, Math.max(0, numero / 100));
  }

  function aplicarVolumeSalvo() {
    const salvo = localStorage.getItem(STORAGE_VOLUME);
    if (salvo !== null) {
      volume.value = salvo;
    }

    audio.volume = normalizarVolume(volume.value);
    audio.muted = localStorage.getItem(STORAGE_MUTED) === "true";
  }

  async function carregarConfiguracao() {
    try {
      const resposta = await fetch("conteudo/radio.json", { cache: "no-store" });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);

      const dados = await resposta.json();

      streamUrl =
        dados.streamUrl ||
        dados.streamURL ||
        dados.stream ||
        dados.url ||
        "";

      const nome =
        dados.nomeCompleto ||
        dados.nome ||
        dados.titulo ||
        "Rádio Embaixadores do Reino";

      titulo.textContent = nome;

      if (!streamUrl) {
        setStatus('Campo "streamUrl" não encontrado em conteudo/radio.json');
        btn.disabled = true;
        return;
      }

      audio.src = streamUrl;
      setStatus("Clique para ouvir ao vivo");
    } catch (erro) {
      setStatus("Não foi possível carregar conteudo/radio.json");
      btn.disabled = true;
      console.error("Erro ao carregar configuração da rádio:", erro);
    }
  }

  async function tocar() {
    if (!streamUrl) {
      setStatus("Stream da rádio não configurado");
      return;
    }

    if (!audio.src) {
      audio.src = streamUrl;
    }

    try {
      setStatus("Conectando...");
      await audio.play();
      setPlayingUI(true);
      setStatus("Transmitindo ao vivo");
    } catch (erro) {
      setPlayingUI(false);
      setStatus("O navegador bloqueou o autoplay. Clique novamente para tocar.");
      console.error("Erro ao tocar rádio:", erro);
    }
  }

  function pausar() {
    audio.pause();
    setPlayingUI(false);
    setStatus("Rádio pausada");
  }

  btn.addEventListener("click", () => {
    if (audio.paused) {
      tocar();
    } else {
      pausar();
    }
  });

  volume.addEventListener("input", () => {
    audio.volume = normalizarVolume(volume.value);
    localStorage.setItem(STORAGE_VOLUME, volume.value);
  });

  audio.addEventListener("playing", () => {
    setPlayingUI(true);
    setStatus("Transmitindo ao vivo");
  });

  audio.addEventListener("pause", () => {
    setPlayingUI(false);
    if (!audio.ended) setStatus("Rádio pausada");
  });

  audio.addEventListener("waiting", () => {
    setStatus("Carregando transmissão...");
  });

  audio.addEventListener("error", () => {
    setPlayingUI(false);
    setStatus("Erro ao carregar o stream da rádio");
  });

  /*
    Mantém a navegação do portal dentro do iframe.
    Isso evita que o documento principal, onde está a rádio, seja recarregado.
  */
  function prepararLinksDoFrame() {
    let doc;
    let win;

    try {
      doc = frame.contentDocument;
      win = frame.contentWindow;
    } catch (erro) {
      return;
    }

    if (!doc || !win) return;

    doc.addEventListener("click", (evento) => {
      const link = evento.target.closest && evento.target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      let destino;
      try {
        destino = new URL(href, win.location.href);
      } catch (erro) {
        return;
      }

      if (destino.origin !== window.location.origin) {
        link.target = "_blank";
        return;
      }

      evento.preventDefault();

      const homePage = frame.dataset.homePage || "index.html";
      const path = destino.pathname.split("/").pop() || homePage;
      const arquivo = path === "index.html" ? homePage : path;

      frame.src = arquivo + destino.search + destino.hash;
    });
  }

  frame.addEventListener("load", prepararLinksDoFrame);

  aplicarVolumeSalvo();
  setPlayingUI(false);
  carregarConfiguracao();
})();
