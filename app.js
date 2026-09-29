// ==========================================
//  TEMAS E PERSONALIZAÇÃO
// ==========================================
const TEMAS = {
  classico: {
    emojis: ['🎁', '🎀', '⭐', '🎉', '🎄'],
    cores: { 50:'#f0f4f9', 100:'#dce4ef', 200:'#b8c9de', 300:'#8fabc8', 400:'#5d82a8', 500:'#3d6490', 600:'#2b4c7e', 700:'#1b3764' },
    roletaCores: ['#2b4c7e','#3d6490','#5d82a8','#8fabc8']
  },
  dinheiro: {
    emojis: ['💵', '🎁', '💰', '🛍️', '💲'],
    cores: { 50:'#f0fdf4', 100:'#dcfce7', 200:'#bbf7d0', 300:'#86efac', 400:'#4ade80', 500:'#22c55e', 600:'#16a34a', 700:'#15803d' },
    roletaCores: ['#16a34a','#22c55e','#4ade80','#86efac']
  },
  dinheiro_caro: {
    emojis: ['💎', '👑', '💰', '🤑', '✨'],
    cores: { 50:'#ecfdf5', 100:'#d1fae5', 200:'#a7f3d0', 300:'#6ee7b7', 400:'#34d399', 500:'#059669', 600:'#047857', 700:'#064e3b' },
    roletaCores: ['#047857','#059669','#34d399','#6ee7b7']
  }
};

let temaAtual = 'classico';
let modoAtual = 'claro';
let coresRoleta = TEMAS.classico.roletaCores;

function aplicarTema(nome, emojisExtras) {
  const tema = TEMAS[nome];
  if (!tema) return;
  const root = document.documentElement.style;
  Object.entries(tema.cores).forEach(([k, v]) => root.setProperty('--c-' + k, v));
  temaAtual = nome;
  coresRoleta = tema.roletaCores;
  aplicarModo(modoAtual);
  const emojis = emojisExtras ? misturarEmojis(tema.emojis, emojisExtras) : tema.emojis;
  atualizarPresentes(emojis);
  localStorage.setItem('tema', nome);
}

function aplicarModo(modo) {
  const root = document.documentElement.style;
  const tema = TEMAS[temaAtual];
  modoAtual = modo;

  if (modo === 'escuro') {
    root.setProperty('--bg', '#0f172a');
    root.setProperty('--bg-1', '#1a2332');
    root.setProperty('--bg-2', '#131c2b');
    root.setProperty('--bg-3', '#0f172a');
    root.setProperty('--blob-1', tema.cores[700]);
    root.setProperty('--blob-2', tema.cores[600]);
    root.setProperty('--text', '#e2e8f0');
    root.setProperty('--text-mid', '#cbd5e1');
    root.setProperty('--text-muted', '#94a3b8');
    root.setProperty('--card-bg', 'rgba(30,41,59,0.85)');
    root.setProperty('--card-border', 'rgba(255,255,255,0.08)');
    root.setProperty('--input-bg', '#1e293b');
    root.setProperty('--surface', 'rgba(255,255,255,0.06)');
    root.setProperty('--surface-2', 'rgba(255,255,255,0.1)');
    root.setProperty('--c-text', tema.cores[300]);
  } else {
    root.setProperty('--bg', '#ffffff');
    root.setProperty('--bg-1', tema.cores[100]);
    root.setProperty('--bg-2', tema.cores[50]);
    root.setProperty('--bg-3', '#ffffff');
    root.setProperty('--blob-1', tema.cores[200]);
    root.setProperty('--blob-2', tema.cores[100]);
    root.setProperty('--text', '#1f2937');
    root.setProperty('--text-mid', '#374151');
    root.setProperty('--text-muted', '#4b5563');
    root.setProperty('--card-bg', 'rgba(255,255,255,0.85)');
    root.setProperty('--card-border', 'rgba(0,0,0,0.08)');
    root.setProperty('--input-bg', '#ffffff');
    root.setProperty('--surface', tema.cores[50]);
    root.setProperty('--surface-2', tema.cores[100]);
    root.setProperty('--c-text', tema.cores[700]);
  }

  localStorage.setItem('modo', modo);
}

// ==========================================
//  DETECÇÃO AUTOMÁTICA DE TEMA
// ==========================================
function extrairValorNumerico(texto) {
  const match = texto.match(/R?\$\s*(\d+)/i) || texto.match(/(\d+)\s*reais/i);
  return match ? parseInt(match[1], 10) : null;
}

function detectarTema(texto) {
  const v = extrairValorNumerico(texto);
  if (v) return v > 100 ? 'dinheiro_caro' : 'dinheiro';
  if (/r\$|reais|real|dinheiro|valor/i.test(texto.toLowerCase())) return 'dinheiro';
  return 'classico';
}

function extrairValor(texto) {
  const v = extrairValorNumerico(texto);
  return v ? 'R$' + v : null;
}

function misturarEmojis(baseEmojis, textos) {
  const resultado = [];
  for (let i = 0; i < 12; i++) {
    if (i % 3 === 0 && textos.length > 0) {
      resultado.push(textos[i % textos.length]);
    } else {
      resultado.push(baseEmojis[i % baseEmojis.length]);
    }
  }
  return resultado;
}

// ==========================================
//  PRESENTINHOS FLUTUANTES
// ==========================================
let presentesContainer;

function criarPresentes(emojis) {
  presentesContainer = document.createElement('div');
  presentesContainer.className = 'presentes-bg';
  document.body.prepend(presentesContainer);
  preencherPresentes(emojis);
}

function preencherPresentes(itens) {
  presentesContainer.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    const item = itens[i % itens.length];
    const el = document.createElement('span');
    const isTexto = item.startsWith('R$') || /^\d/.test(item);
    el.className = 'presente' + (isTexto ? ' presente-texto' : '');
    el.textContent = item;
    el.style.left = Math.random() * 100 + '%';
    el.style.fontSize = isTexto ? (18 + Math.random() * 14) + 'px' : (16 + Math.random() * 20) + 'px';
    el.style.animationDuration = (8 + Math.random() * 12) + 's';
    el.style.animationDelay = -(Math.random() * 20) + 's';
    presentesContainer.appendChild(el);
  }
}

function atualizarPresentes(itens) {
  if (presentesContainer) preencherPresentes(itens);
}

// ==========================================
//  REGRA
// ==========================================
function aplicarRegra(texto) {
  const banner = document.getElementById('bannerRegra');
  if (texto && texto.trim()) {
    banner.textContent = texto.trim();
    banner.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
    banner.textContent = '';
  }

  const temaDetectado = detectarTema(texto || '');
  const valor = extrairValor(texto || '');
  const extras = valor ? [valor] : null;
  aplicarTema(temaDetectado, extras);

  localStorage.setItem('regra', texto || '');
}


// ==========================================
//  FIREBASE
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCGEHSLy7faEM6oXIR2S7oYQTUCyvzcWCg",
  authDomain: "amigo-secreto-96fa5.firebaseapp.com",
  projectId: "amigo-secreto-96fa5",
  storageBucket: "amigo-secreto-96fa5.firebasestorage.app",
  messagingSenderId: "427253223866",
  appId: "1:427253223866:web:375a2097d1c5d2a3c3cd83"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ==========================================
//  ESTADO
// ==========================================
let modoOnline = false;
let codigoSalaAtual = null;
let meuNome = null;
let unsubscribeSala = null;
let dadosSala = null;
let jaRevelei = false;

let listaAmigos = [];
let paresSorteados = {};
let pessoasRestantes = [];
let pessoaAtualRoleta = null;
let anguloAtual = 0;

// ==========================================
//  ELEMENTOS DOM
// ==========================================
const $ = id => document.getElementById(id);
const canvas = $('roleta');
const ctx = canvas.getContext('2d');

// ==========================================
//  NAVEGAÇÃO
// ==========================================
function mostrarTela(id) {
  document.querySelectorAll('.view').forEach(el => el.classList.add('hidden'));
  $(id).classList.remove('hidden');
  if (id !== 'telaRoleta') pararLuzes();
}

// ==========================================
//  UTILIDADES
// ==========================================
const normalize = s => s.trim().toLowerCase();
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sattolo(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function gerarSorteio(lista) {
  const arr = [...lista];
  const embaralhado = sattolo([...arr]);
  const pares = {};
  arr.forEach((p, i) => pares[p] = embaralhado[i]);
  return pares;
}

function derangementValido(orig, novo) {
  for (let i = 0; i < orig.length; i++) if (orig[i] === novo[i]) return false;
  return new Set(novo).size === novo.length;
}

function gerarCodigoSala() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// ==========================================
//  ROLETA (Canvas)
// ==========================================
let luzFrame = 0;
let luzAnimId = null;

function desenharRoleta(nomes) {
  const fatia = (2 * Math.PI) / nomes.length;
  const cores = coresRoleta;
  const centro = canvas.width / 2;
  const raioTotal = centro;
  const bordaLarg = 18;
  const raioInterno = raioTotal - bordaLarg;
  const raioCentro = 28;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Sombra externa
  ctx.save();
  ctx.beginPath();
  ctx.arc(centro, centro, raioTotal - 2, 0, Math.PI * 2);
  ctx.shadowColor = 'rgba(0,0,0,0.35)';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#b8860b';
  ctx.fill();
  ctx.restore();

  // Borda dourada
  const bordaGrad = ctx.createRadialGradient(centro - 30, centro - 30, raioTotal * 0.6, centro, centro, raioTotal);
  bordaGrad.addColorStop(0, '#f5d75e');
  bordaGrad.addColorStop(0.4, '#d4a017');
  bordaGrad.addColorStop(0.7, '#b8860b');
  bordaGrad.addColorStop(1, '#8b6914');
  ctx.beginPath();
  ctx.arc(centro, centro, raioTotal - 2, 0, Math.PI * 2);
  ctx.fillStyle = bordaGrad;
  ctx.fill();

  // Linha interna da borda
  ctx.beginPath();
  ctx.arc(centro, centro, raioInterno + 2, 0, Math.PI * 2);
  ctx.strokeStyle = '#8b6914';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Fatias
  nomes.forEach((nome, i) => {
    const inicio = anguloAtual + i * fatia;
    const fim = inicio + fatia;
    const corBase = cores[i % cores.length];
    const corClara = cores[(i + 1) % cores.length];

    const grad = ctx.createRadialGradient(centro, centro, raioCentro, centro, centro, raioInterno);
    grad.addColorStop(0, corClara);
    grad.addColorStop(1, corBase);

    ctx.beginPath();
    ctx.moveTo(centro, centro);
    ctx.arc(centro, centro, raioInterno, inicio, fim);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Linha dourada entre fatias
    ctx.beginPath();
    ctx.moveTo(centro, centro);
    ctx.lineTo(
      centro + Math.cos(inicio) * raioInterno,
      centro + Math.sin(inicio) * raioInterno
    );
    ctx.strokeStyle = '#d4a017';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Sparkles nas fatias
    if (i % 2 === 0) {
      const sparkAngle = inicio + fatia * 0.35;
      const sparkR = raioInterno * 0.82;
      desenharSparkle(
        centro + Math.cos(sparkAngle) * sparkR,
        centro + Math.sin(sparkAngle) * sparkR,
        3
      );
    }

    // Texto
    ctx.save();
    ctx.translate(centro, centro);
    ctx.rotate(inicio + fatia / 2);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 3;
    const textoNome = capitalize(nome);
    const maxLarg = raioInterno * 0.42;
    const textoFinal = ctx.measureText(textoNome).width > maxLarg
      ? textoNome.slice(0, 8) + '...'
      : textoNome;
    ctx.fillText(textoFinal, raioInterno * 0.58, 0);
    ctx.restore();
  });

  // Contorno interno das fatias
  ctx.beginPath();
  ctx.arc(centro, centro, raioInterno, 0, Math.PI * 2);
  ctx.strokeStyle = '#d4a017';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Luzinhas na borda
  const numLuzes = 20;
  const raioLuzes = raioTotal - bordaLarg / 2;
  for (let i = 0; i < numLuzes; i++) {
    const ang = (i / numLuzes) * Math.PI * 2 - Math.PI / 2;
    const x = centro + Math.cos(ang) * raioLuzes;
    const y = centro + Math.sin(ang) * raioLuzes;
    const acesa = (i + luzFrame) % 3 !== 0;

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    if (acesa) {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
      glow.addColorStop(0, '#fffde0');
      glow.addColorStop(0.5, '#f5d75e');
      glow.addColorStop(1, 'rgba(245,215,94,0)');
      ctx.fillStyle = '#fffde0';
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 7, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.restore();
    } else {
      ctx.fillStyle = '#8b6914';
      ctx.fill();
    }
  }

  // Centro dourado
  const centroGrad = ctx.createRadialGradient(centro - 6, centro - 6, 2, centro, centro, raioCentro);
  centroGrad.addColorStop(0, '#f5e6a3');
  centroGrad.addColorStop(0.5, '#d4a017');
  centroGrad.addColorStop(1, '#8b6914');
  ctx.beginPath();
  ctx.arc(centro, centro, raioCentro, 0, Math.PI * 2);
  ctx.fillStyle = centroGrad;
  ctx.fill();
  ctx.strokeStyle = '#b8860b';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Emoji no centro
  ctx.font = '22px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.fillText('🎁', centro, centro + 1);
}

function desenharSparkle(x, y, tam) {
  ctx.save();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.moveTo(x, y - tam);
  ctx.lineTo(x + tam * 0.3, y - tam * 0.3);
  ctx.lineTo(x + tam, y);
  ctx.lineTo(x + tam * 0.3, y + tam * 0.3);
  ctx.lineTo(x, y + tam);
  ctx.lineTo(x - tam * 0.3, y + tam * 0.3);
  ctx.lineTo(x - tam, y);
  ctx.lineTo(x - tam * 0.3, y - tam * 0.3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function iniciarLuzes(nomes) {
  pararLuzes();
  let ultimo = 0;
  function tick(agora) {
    if (agora - ultimo > 400) {
      luzFrame++;
      desenharRoleta(nomes);
      ultimo = agora;
    }
    luzAnimId = requestAnimationFrame(tick);
  }
  luzAnimId = requestAnimationFrame(tick);
}

function pararLuzes() {
  if (luzAnimId) {
    cancelAnimationFrame(luzAnimId);
    luzAnimId = null;
  }
}

// ==========================================
//  SONS DA ROLETA (Web Audio API)
// ==========================================
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function somTick(velocidade) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 800 + Math.random() * 400;
    gain.gain.value = 0.06 + velocidade * 0.04;
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (_) {}
}

function somVitoria() {
  try {
    const ctx = getAudioCtx();
    const notas = [523, 659, 784, 1047];
    notas.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  } catch (_) {}
}

function girarRoleta(nomes, nomeDestino, callback) {
  pararLuzes();
  const fatia = (2 * Math.PI) / nomes.length;
  const indiceDestino = nomes.indexOf(nomeDestino);

  const voltasExtras = 3 * 2 * Math.PI;
  const alvoAngulo = -Math.PI / 2 - indiceDestino * fatia - fatia / 2;
  const deltaAngulo = voltasExtras + (alvoAngulo - anguloAtual);

  const duracao = 3000;
  const inicioTempo = performance.now();
  const anguloInicial = anguloAtual;
  let ultimaFatia = -1;

  function animar(agora) {
    const progresso = Math.min((agora - inicioTempo) / duracao, 1);
    const ease = 1 - Math.pow(1 - progresso, 4);

    anguloAtual = anguloInicial + deltaAngulo * ease;
    luzFrame++;
    desenharRoleta(nomes);

    const fatiaAtual = Math.floor(((anguloAtual % (Math.PI * 2)) + Math.PI * 2) / fatia) % nomes.length;
    if (fatiaAtual !== ultimaFatia) {
      somTick(1 - progresso);
      ultimaFatia = fatiaAtual;
    }

    if (progresso < 1) {
      requestAnimationFrame(animar);
    } else {
      somVitoria();
      iniciarLuzes(nomes);
      callback();
    }
  }

  requestAnimationFrame(animar);
}

// ==========================================
//  MODO LOCAL
// ==========================================
function salvarListaLocal() {
  localStorage.setItem('listaAmigos', JSON.stringify(listaAmigos));
}

function carregarListaLocal() {
  try {
    const salva = JSON.parse(localStorage.getItem('listaAmigos'));
    if (Array.isArray(salva)) listaAmigos = salva;
  } catch (_) {}
}

function adicionarAmigoLocal() {
  const name = normalize($('nomeAmigo').value);
  if (!name) return alert('Digite um nome válido');
  if (listaAmigos.includes(name)) return alert('Nome já adicionado');
  listaAmigos.push(name);
  $('nomeAmigo').value = '';
  $('nomeAmigo').focus();
  renderListaLocal();
  salvarListaLocal();
}

function renderListaLocal() {
  $('listaAmigos').innerHTML = '';
  listaAmigos.forEach(n => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = capitalize(n);
    const btn = document.createElement('button');
    btn.className = 'btn-remove';
    btn.textContent = '×';
    btn.onclick = () => {
      listaAmigos = listaAmigos.filter(x => x !== n);
      renderListaLocal();
      salvarListaLocal();
    };
    li.appendChild(span);
    li.appendChild(btn);
    $('listaAmigos').appendChild(li);
  });
}

async function iniciarSorteioLocal() {
  if (listaAmigos.length < 2) return alert('Adicione pelo menos 2 nomes');
  paresSorteados = gerarSorteio(listaAmigos);
  pessoasRestantes = [...listaAmigos];

  try {
    await db.collection('jogos_locais').add({
      participantes: [...listaAmigos],
      pares: paresSorteados,
      regra: $('inputRegra').value.trim() || '',
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (_) {}

  atualizarTelaSelecao();
  mostrarTela('telaSelecao');
}

function atualizarTelaSelecao() {
  $('listaPessoas').innerHTML = '';
  if (pessoasRestantes.length === 0) {
    $('listaPessoas').innerHTML = '<p class="hint">Todos já viram seus amigos secretos!</p>';
    return;
  }
  pessoasRestantes.forEach(n => {
    const btn = document.createElement('button');
    btn.className = 'btn-person';
    btn.textContent = capitalize(n);
    btn.onclick = () => abrirRoletaLocal(n);
    $('listaPessoas').appendChild(btn);
  });
}

function abrirRoletaLocal(nome) {
  modoOnline = false;
  pessoaAtualRoleta = nome;
  $('tituloRoleta').textContent = 'Vez de ' + capitalize(nome);
  $('btnGirar').classList.remove('hidden');
  const nomesRoleta = listaAmigos.filter(n => n !== nome);
  anguloAtual = 0;
  desenharRoleta(nomesRoleta);
  iniciarLuzes(nomesRoleta);
  mostrarTela('telaRoleta');
}

function girarLocal() {
  const amigoSorteado = paresSorteados[pessoaAtualRoleta];
  const nomesRoleta = listaAmigos.filter(n => n !== pessoaAtualRoleta);

  $('btnGirar').disabled = true;

  girarRoleta(nomesRoleta, amigoSorteado, () => {
    setTimeout(() => {
      $('nomePessoaAtual').textContent = capitalize(pessoaAtualRoleta);
      $('resultadoPrivado').textContent = capitalize(amigoSorteado);
      mostrarTela('telaPrivada');
      $('btnGirar').disabled = false;
      pessoasRestantes = pessoasRestantes.filter(p => p !== pessoaAtualRoleta);
      pessoaAtualRoleta = null;
    }, 500);
  });
}

// ==========================================
//  MODO ONLINE — CRIAR SALA
// ==========================================
async function criarSala() {
  const codigo = gerarCodigoSala();

  try {
    const regra = $('inputRegra').value.trim();
    await db.collection('salas').doc(codigo).set({
      participantes: [],
      pares: null,
      jaRevelaram: [],
      status: 'aguardando',
      regra: regra || '',
      criadoEm: firebase.firestore.FieldValue.serverTimestamp()
    });

    codigoSalaAtual = codigo;
    modoOnline = true;
    $('codigoSalaEntrar').textContent = codigo;
    mostrarTela('telaEntrarNome');
  } catch (err) {
    alert('Erro ao criar sala. Tente novamente.');
  }
}

// ==========================================
//  MODO ONLINE — ENTRAR NA SALA
// ==========================================
async function irParaEntrarNome(codigo) {
  codigo = codigo.toUpperCase().trim();
  if (!codigo) return alert('Digite o código da sala');

  try {
    const doc = await db.collection('salas').doc(codigo).get();
    if (!doc.exists) return alert('Sala não encontrada. Verifique o código.');

    const dados = doc.data();
    if (dados.status === 'pronto') return alert('Esta sala já iniciou o sorteio. Não é possível entrar.');

    codigoSalaAtual = codigo;
    modoOnline = true;
    $('codigoSalaEntrar').textContent = codigo;
    mostrarTela('telaEntrarNome');
  } catch (err) {
    alert('Erro ao buscar sala. Tente novamente.');
  }
}

async function entrarComNome() {
  const nome = normalize($('inputMeuNome').value);
  if (!nome) return alert('Digite seu nome');

  try {
    const doc = await db.collection('salas').doc(codigoSalaAtual).get();
    const dados = doc.data();

    if (dados.participantes.includes(nome)) {
      return alert('Esse nome já está na sala. Escolha outro.');
    }

    await db.collection('salas').doc(codigoSalaAtual).update({
      participantes: firebase.firestore.FieldValue.arrayUnion(nome)
    });

    meuNome = nome;
    jaRevelei = false;
    $('inputMeuNome').value = '';
    escutarSala(codigoSalaAtual);
    mostrarTela('telaSala');
  } catch (err) {
    alert('Erro ao entrar. Tente novamente.');
  }
}

// ==========================================
//  MODO ONLINE — ESCUTAR SALA
// ==========================================
function escutarSala(codigo) {
  if (unsubscribeSala) unsubscribeSala();

  unsubscribeSala = db.collection('salas').doc(codigo).onSnapshot(doc => {
    if (!doc.exists) {
      alert('A sala foi encerrada.');
      sairDaSala();
      return;
    }

    dadosSala = doc.data();
    $('codigoSala').textContent = codigo;

    if (dadosSala.regra) {
      aplicarRegra(dadosSala.regra);
      $('inputRegra').value = dadosSala.regra;
    }

    renderLobby(dadosSala);
  });
}

function renderLobby(dados) {
  const container = $('listaParticipantesSala');
  container.innerHTML = '';

  dados.participantes.forEach(nome => {
    const jaRevelou = dados.jaRevelaram && dados.jaRevelaram.includes(nome);
    const div = document.createElement('div');
    div.className = 'participante-item';

    if (dados.status === 'pronto') {
      div.innerHTML = `
        <span>${capitalize(nome)} ${nome === meuNome ? '(você)' : ''}</span>
        <span class="participante-status ${jaRevelou ? 'status-girou' : 'status-pendente'}">
          ${jaRevelou ? 'Já revelou' : 'Pendente'}
        </span>
      `;
    } else {
      div.innerHTML = `
        <span>${capitalize(nome)} ${nome === meuNome ? '(você)' : ''}</span>
      `;
    }

    container.appendChild(div);
  });

  const total = dados.participantes.length;
  const ehPar = total % 2 === 0;

  if (dados.status === 'aguardando') {
    $('salaAguardando').classList.remove('hidden');
    $('salaPronte').classList.add('hidden');

    if (total < 4) {
      $('contadorJogadores').textContent = `${total} jogador${total !== 1 ? 'es' : ''} na sala. Mínimo 4 para iniciar.`;
      $('btnIniciarSorteio').disabled = true;
    } else if (!ehPar) {
      $('contadorJogadores').textContent = `${total} jogadores na sala. Precisa ser número par para iniciar.`;
      $('btnIniciarSorteio').disabled = true;
    } else {
      $('contadorJogadores').textContent = `${total} jogadores na sala. Pronto para iniciar!`;
      $('btnIniciarSorteio').disabled = false;
    }

    $('statusSala').textContent = 'Compartilhe o código com seus amigos!';
  } else {
    $('salaAguardando').classList.add('hidden');
    $('salaPronte').classList.remove('hidden');

    $('statusSala').textContent = 'Sorteio realizado! Revele seu amigo secreto.';

    if (jaRevelei) {
      $('btnRevelar').classList.add('hidden');
      $('btnRever').classList.remove('hidden');
    } else {
      $('btnRevelar').classList.remove('hidden');
      $('btnRever').classList.add('hidden');
    }

    const todosRevelaram = dados.participantes.every(n => dados.jaRevelaram.includes(n));
    if (todosRevelaram) {
      $('statusSala').textContent = 'Todos já revelaram seus amigos secretos!';
    }
  }
}

// ==========================================
//  MODO ONLINE — INICIAR SORTEIO
// ==========================================
async function iniciarSorteioOnline() {
  if (!dadosSala) return;

  const total = dadosSala.participantes.length;
  if (total < 4 || total % 2 !== 0) return;

  const pares = gerarSorteio(dadosSala.participantes);

  try {
    await db.collection('salas').doc(codigoSalaAtual).update({
      pares: pares,
      status: 'pronto',
      jaRevelaram: []
    });
  } catch (err) {
    alert('Erro ao iniciar sorteio. Tente novamente.');
  }
}

// ==========================================
//  MODO ONLINE — REVELAR / REVER
// ==========================================
function revelarMeuAmigo() {
  if (!dadosSala || !dadosSala.pares || !meuNome) return;

  const amigoSorteado = dadosSala.pares[meuNome];
  if (!amigoSorteado) return alert('Erro: seu nome não está no sorteio.');

  pessoaAtualRoleta = meuNome;
  modoOnline = true;

  $('tituloRoleta').textContent = 'Sua vez, ' + capitalize(meuNome) + '!';
  $('btnGirar').classList.remove('hidden');

  const nomesRoleta = dadosSala.participantes.filter(n => n !== meuNome);
  anguloAtual = 0;
  desenharRoleta(nomesRoleta);
  iniciarLuzes(nomesRoleta);
  mostrarTela('telaRoleta');
}

function girarOnline() {
  const amigoSorteado = dadosSala.pares[meuNome];
  const nomesRoleta = dadosSala.participantes.filter(n => n !== meuNome);

  $('btnGirar').disabled = true;

  girarRoleta(nomesRoleta, amigoSorteado, () => {
    setTimeout(() => {
      $('nomePessoaAtual').textContent = capitalize(meuNome);
      $('resultadoPrivado').textContent = capitalize(amigoSorteado);
      mostrarTela('telaPrivada');
      $('btnGirar').disabled = false;

      jaRevelei = true;

      db.collection('salas').doc(codigoSalaAtual).update({
        jaRevelaram: firebase.firestore.FieldValue.arrayUnion(meuNome)
      });
    }, 500);
  });
}

function reverMeuAmigo() {
  if (!dadosSala || !dadosSala.pares || !meuNome) return;

  const amigoSorteado = dadosSala.pares[meuNome];
  $('nomePessoaAtual').textContent = capitalize(meuNome);
  $('resultadoPrivado').textContent = capitalize(amigoSorteado);
  mostrarTela('telaPrivada');
}

// ==========================================
//  SAIR / ENCERRAR
// ==========================================
function sairDaSala() {
  if (unsubscribeSala) unsubscribeSala();
  unsubscribeSala = null;
  codigoSalaAtual = null;
  meuNome = null;
  dadosSala = null;
  modoOnline = false;
  jaRevelei = false;
  history.replaceState(null, '', window.location.pathname);
  mostrarTela('telaInicio');
}

async function encerrarSala() {
  if (!confirm('Encerrar a sala vai apagar todos os dados. Tem certeza?')) return;
  try {
    await db.collection('salas').doc(codigoSalaAtual).delete();
  } catch (err) {}
  sairDaSala();
}

// ==========================================
//  EVENT LISTENERS
// ==========================================

// Toggle claro/escuro
$('btnModo').addEventListener('click', () => {
  aplicarModo(modoAtual === 'claro' ? 'escuro' : 'claro');
  $('btnModo').textContent = modoAtual === 'escuro' ? '🌙' : '☀️';
});

// Regra
$('inputRegra').addEventListener('input', (e) => aplicarRegra(e.target.value));

// Início
$('btnLocal').addEventListener('click', () => {
  modoOnline = false;
  carregarListaLocal();
  renderListaLocal();
  mostrarTela('telaCadastro');
});

$('btnCriarSala').addEventListener('click', criarSala);

$('btnEntrarSala').addEventListener('click', () => irParaEntrarNome($('inputCodigo').value));
$('inputCodigo').addEventListener('keydown', e => {
  if (e.key === 'Enter') irParaEntrarNome($('inputCodigo').value);
});

// Entrar com nome
$('btnEntrarComNome').addEventListener('click', entrarComNome);
$('inputMeuNome').addEventListener('keydown', e => {
  if (e.key === 'Enter') entrarComNome();
});
$('btnVoltarEntrar').addEventListener('click', () => {
  codigoSalaAtual = null;
  mostrarTela('telaInicio');
});

// Cadastro local
$('btnAdd').addEventListener('click', adicionarAmigoLocal);
$('nomeAmigo').addEventListener('keydown', e => { if (e.key === 'Enter') adicionarAmigoLocal(); });
$('btnStart').addEventListener('click', iniciarSorteioLocal);
$('btnResetLocal').addEventListener('click', () => {
  listaAmigos = [];
  salvarListaLocal();
  mostrarTela('telaInicio');
});

// Seleção local
$('btnVoltar').addEventListener('click', () => mostrarTela('telaCadastro'));

// Sala online
$('btnCopiarLink').addEventListener('click', () => {
  const link = window.location.origin + window.location.pathname + '?sala=' + codigoSalaAtual;
  navigator.clipboard.writeText(link).then(() => {
    $('btnCopiarLink').textContent = 'Copiado!';
    setTimeout(() => $('btnCopiarLink').textContent = 'Copiar link', 2000);
  });
});

$('btnIniciarSorteio').addEventListener('click', iniciarSorteioOnline);
$('btnRevelar').addEventListener('click', revelarMeuAmigo);
$('btnRever').addEventListener('click', reverMeuAmigo);
$('btnSairSala').addEventListener('click', sairDaSala);
$('btnEncerrarSala').addEventListener('click', encerrarSala);

// Roleta
$('btnGirar').addEventListener('click', () => {
  if (modoOnline) {
    girarOnline();
  } else {
    girarLocal();
  }
});

// Resultado
$('btnOkPrivado').addEventListener('click', () => {
  if (modoOnline) {
    mostrarTela('telaSala');
  } else {
    mostrarTela('telaSelecao');
    atualizarTelaSelecao();
  }
});

// ==========================================
//  INIT
// ==========================================
(function init() {
  const modoSalvo = localStorage.getItem('modo') || 'claro';
  const regraSalva = localStorage.getItem('regra') || '';

  criarPresentes(TEMAS.classico.emojis);
  aplicarTema('classico');
  aplicarModo(modoSalvo);
  $('btnModo').textContent = modoSalvo === 'escuro' ? '🌙' : '☀️';

  if (regraSalva) {
    $('inputRegra').value = regraSalva;
    aplicarRegra(regraSalva);
  }

  // Verificar URL para sala online
  const params = new URLSearchParams(window.location.search);
  const salaParam = params.get('sala');
  if (salaParam) {
    codigoSalaAtual = salaParam.toUpperCase().trim();
    $('codigoSalaEntrar').textContent = codigoSalaAtual;
    mostrarTela('telaEntrarNome');
  }
})();
