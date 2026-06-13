/* ══════════════════════════════════════
   CLASSROOM 6X — Main JavaScript
   Author: Ash Mercer
══════════════════════════════════════ */

/* ── 3D PARTICLE FIELD BACKGROUND ── */
(function initBg() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles, mouse = { x: 0, y: 0 };

  const COLORS = ['#4f8ef7', '#a259ff', '#00e5ff', '#4f8ef733', '#a259ff22'];
  const COUNT  = window.innerWidth < 600 ? 55 : 110;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function mkParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      z: Math.random() * 2 + 0.3,       // depth 0.3–2.3
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2.2 + 0.6,
      col: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, mkParticle);
  }

  function drawLine(a, b, dist, maxDist) {
    const op = (1 - dist / maxDist) * 0.28 * Math.min(a.z, b.z);
    ctx.strokeStyle = `rgba(79,142,247,${op})`;
    ctx.lineWidth   = 0.6;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // subtle radial gradient atmosphere
    const grd = ctx.createRadialGradient(W * 0.5, H * 0.18, 0, W * 0.5, H * 0.18, H * 0.75);
    grd.addColorStop(0, 'rgba(79,142,247,0.045)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    const maxDist = 160;
    particles.forEach((p, i) => {
      // parallax nudge toward mouse
      p.x += p.vx + (mouse.x / W - 0.5) * 0.08 * p.z;
      p.y += p.vy + (mouse.y / H - 0.5) * 0.08 * p.z;
      p.pulse += 0.018;

      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      const r = p.r * (0.85 + 0.15 * Math.sin(p.pulse)) * p.z;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = p.col;
      ctx.fill();

      // connect nearby
      for (let j = i + 1; j < particles.length; j++) {
        const q   = particles[j];
        const dx  = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) drawLine(p, q, dist, maxDist);
      }
    });

    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', () => { resize(); });
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  init();
  loop();
})();

/* ══════════════════════════════════════
   GAMES DATABASE
   To add a game — push one object here.
   Fields:
     name     : display name
     emoji    : fallback if no img
     img      : thumbnail URL (optional)
     category : action|racing|puzzle|multiplayer|sports|idle|shooting
     badge    : "HOT" | "NEW" | ""
     url      : link to YOUR main site
══════════════════════════════════════ */
const GAMES = [
  { name:"1v1.lol",             emoji:"🔫", category:"action",      badge:"HOT", url:"https://classrooms-6x.com/game/1v1-lol" },
  { name:"Slope",               emoji:"🔵", category:"action",      badge:"HOT", url:"https://classrooms-6x.com/game/slope" },
  { name:"Run 3",               emoji:"🏃", category:"action",      badge:"",    url:"https://classrooms-6x.com/game/run-3" },
  { name:"OvO",                 emoji:"⭕", category:"action",      badge:"",    url:"https://classrooms-6x.com/game/ovo" },
  { name:"Geometry Dash",       emoji:"🔷", category:"action",      badge:"",    url:"https://classrooms-6x.com/game/geometry-dash" },
  { name:"Stickman Hook",       emoji:"🕹️", category:"action",      badge:"",    url:"https://classrooms-6x.com/game/stickman-hook" },
  { name:"Friday Night Funkin", emoji:"🎵", category:"action",      badge:"HOT", url:"https://classrooms-6x.com/game/friday-night-funkin" },
  { name:"Moto X3M",            emoji:"🏍️", category:"racing",      badge:"",    url:"https://classrooms-6x.com/game/moto-x3m" },
  { name:"Drift Hunters",       emoji:"🚗", category:"racing",      badge:"",    url:"https://classrooms-6x.com/game/drift-hunters" },
  { name:"Drive Mad",           emoji:"🚙", category:"racing",      badge:"",    url:"https://classrooms-6x.com/game/drive-mad" },
  { name:"Drift Boss",          emoji:"🏎️", category:"racing",      badge:"HOT", url:"https://classrooms-6x.com/game/drift-boss" },
  { name:"Fireboy & Watergirl", emoji:"🔥", category:"puzzle",      badge:"",    url:"https://classrooms-6x.com/game/fireboy-and-watergirl" },
  { name:"2048",                emoji:"🔢", category:"puzzle",      badge:"",    url:"https://classrooms-6x.com/game/2048" },
  { name:"Little Alchemy 2",    emoji:"⚗️", category:"puzzle",      badge:"NEW", url:"https://classrooms-6x.com/game/little-alchemy-2" },
  { name:"Shell Shockers",      emoji:"🥚", category:"multiplayer", badge:"NEW", url:"https://classrooms-6x.com/game/shell-shockers" },
  { name:"Paper.io 2",          emoji:"📄", category:"multiplayer", badge:"",    url:"https://classrooms-6x.com/game/paper-io-2" },
  { name:"Rooftop Snipers",     emoji:"🎯", category:"multiplayer", badge:"",    url:"https://classrooms-6x.com/game/rooftop-snipers" },
  { name:"Basketball Stars",    emoji:"🏀", category:"sports",      badge:"HOT", url:"https://classrooms-6x.com/game/basketball-stars" },
  { name:"Retro Bowl",          emoji:"🏈", category:"sports",      badge:"",    url:"https://classrooms-6x.com/game/retro-bowl" },
  { name:"Basket Random",       emoji:"🏀", category:"sports",      badge:"",    url:"https://classrooms-6x.com/game/basket-random" },
  { name:"Cookie Clicker",      emoji:"🍪", category:"idle",        badge:"",    url:"https://classrooms-6x.com/game/cookie-clicker" },
  { name:"Monkey Mart",         emoji:"🐵", category:"idle",        badge:"HOT", url:"https://classrooms-6x.com/game/monkey-mart" },
  { name:"Idle Miner",          emoji:"⛏️", category:"idle",        badge:"",    url:"https://classrooms-6x.com/game/idle-miner" },
];

/* ── STATE ── */
let activeCategory = 'all';

function goPlay(url) { window.open(url, '_blank'); }

function buildCard(g) {
  const badgeClass = g.badge === 'HOT' ? 'badge-hot' : g.badge === 'NEW' ? 'badge-new' : '';
  return `
    <div class="game-card" onclick="goPlay('${g.url}')">
      <div class="game-thumb">
        ${g.img
          ? `<img src="${g.img}" alt="${g.name} unblocked" loading="lazy"/>`
          : g.emoji}
        ${g.badge ? `<span class="game-badge ${badgeClass}">${g.badge}</span>` : ''}
      </div>
      <div class="game-info">
        <h3>${g.name}</h3>
        <span class="game-cat-tag">${g.category}</span>
      </div>
      <button class="play-btn" onclick="event.stopPropagation(); goPlay('${g.url}')">▶ Play Now</button>
    </div>`;
}

function renderGames(list) {
  const grid = document.getElementById('gameGrid');
  if (!grid) return;
  if (!list.length) {
    grid.innerHTML = '<div class="no-results">😔 No games found — try a different keyword!</div>';
    return;
  }
  grid.innerHTML = list.map(buildCard).join('');
}

function filterGames() {
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  let list = activeCategory === 'all' ? GAMES : GAMES.filter(g => g.category === activeCategory);
  if (q) list = list.filter(g => g.name.toLowerCase().includes(q) || g.category.includes(q));
  renderGames(list);
}

function setCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn?.classList.add('active');
  const si = document.getElementById('searchInput');
  if (si) si.value = '';
  filterGames();
}

/* ── NAV HAMBURGER ── */
function initNav() {
  const ham = document.getElementById('hamburger');
  const links = document.querySelector('.nav-links');
  if (ham && links) {
    ham.addEventListener('click', () => links.classList.toggle('open'));
  }
}

/* ── FAQ ACCORDION ── */
function initFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFaq();
  filterGames();
  const si = document.getElementById('searchInput');
  if (si) si.addEventListener('input', filterGames);
});
