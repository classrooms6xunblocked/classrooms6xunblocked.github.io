/* ══════════════════════════════════════
   NEON GAMING HUB — 3D Background
   Floating controllers + cubes + particles
══════════════════════════════════════ */
(function initBg() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, mouse = { x: 0, y: 0 };

  // Gaming symbols to draw
  const SYMBOLS = ['⬡', '◈', '⬟'];
  const COLORS  = ['#4f8ef7', '#a259ff', '#00e5ff', '#ff4444'];

  // Floating cubes
  class Cube {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.z  = Math.random() * 0.8 + 0.2;
      this.size = (Math.random() * 30 + 15) * this.z;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.02;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.3 + 0.15;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx + (mouse.x / W - 0.5) * 0.06 * this.z;
      this.y += this.vy + (mouse.y / H - 0.5) * 0.06 * this.z;
      this.rot += this.rotSpeed;
      this.pulse += 0.02;
      if (this.x < -50) this.x = W + 50;
      if (this.x > W + 50) this.x = -50;
      if (this.y < -50) this.y = H + 50;
      if (this.y > H + 50) this.y = -50;
    }
    draw() {
      const s = this.size * (0.9 + 0.1 * Math.sin(this.pulse));
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 15;
      ctx.shadowColor = this.color;
      // Draw cube wireframe
      ctx.strokeRect(-s/2, -s/2, s, s);
      // 3D offset lines
      const off = s * 0.3;
      ctx.beginPath();
      ctx.moveTo(-s/2, -s/2); ctx.lineTo(-s/2 + off, -s/2 - off);
      ctx.moveTo(s/2, -s/2);  ctx.lineTo(s/2 + off, -s/2 - off);
      ctx.moveTo(s/2, s/2);   ctx.lineTo(s/2 + off, s/2 - off);
      ctx.moveTo(-s/2, s/2);  ctx.lineTo(-s/2 + off, s/2 - off);
      ctx.moveTo(-s/2+off, -s/2-off); ctx.lineTo(s/2+off, -s/2-off);
      ctx.moveTo(s/2+off, -s/2-off);  ctx.lineTo(s/2+off, s/2-off);
      ctx.moveTo(-s/2+off, s/2-off);  ctx.lineTo(s/2+off, s/2-off);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Controller particles
  class Controller {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.z = Math.random() * 0.6 + 0.2;
      this.size = (Math.random() * 35 + 18) * this.z;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.rot = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.008;
      this.alpha = Math.random() * 0.25 + 0.15;
      this.pulse = Math.random() * Math.PI * 2;
      this.color = Math.random() > 0.5 ? '#4f8ef7' : '#a259ff';
    }
    update() {
      this.x += this.vx + (mouse.x / W - 0.5) * 0.04 * this.z;
      this.y += this.vy + (mouse.y / H - 0.5) * 0.04 * this.z;
      this.rot += this.rotSpeed;
      this.pulse += 0.015;
      if (this.x < -80) this.x = W + 80;
      if (this.x > W + 80) this.x = -80;
      if (this.y < -80) this.y = H + 80;
      if (this.y > H + 80) this.y = -80;
    }
    draw() {
      const s = this.size * (0.95 + 0.05 * Math.sin(this.pulse));
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha * (0.8 + 0.2 * Math.sin(this.pulse));
      ctx.strokeStyle = this.color;
      ctx.fillStyle = this.color;
      ctx.lineWidth = 1.2;
      ctx.shadowBlur = 18;
      ctx.shadowColor = this.color;

      // Draw controller shape - simple rectangles for compatibility
      const w = s * 2, h = s * 1.2;
      ctx.beginPath();
      ctx.rect(-w/2, -h/2, w, h);
      ctx.stroke();

      // Left handle
      ctx.beginPath();
      ctx.rect(-w/2, h * 0.1, w * 0.3, h * 0.5);
      ctx.stroke();

      // Right handle
      ctx.beginPath();
      ctx.rect(w/2 - w*0.3, h*0.1, w*0.3, h*0.5);
      ctx.stroke();

      // D-pad (left side)
      ctx.fillRect(-w*0.3, -h*0.05, w*0.06, h*0.3);
      ctx.fillRect(-w*0.35, h*0.05, w*0.16, h*0.1);

      // Buttons (right side) — 2 circles
      ctx.beginPath();
      ctx.arc(w*0.25, -h*0.05, s*0.12, 0, Math.PI*2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(w*0.38, h*0.08, s*0.12, 0, Math.PI*2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Small glowing particles
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 2 + 0.5;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha = Math.random() * 0.4 + 0.1;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.pulse += 0.03;
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * (0.8 + 0.2*Math.sin(this.pulse)), 0, Math.PI*2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha * (0.7 + 0.3*Math.sin(this.pulse));
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  let cubes = [], controllers = [], particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    const isMob = W < 600;
    cubes       = Array.from({ length: isMob ? 8 : 16 }, () => new Cube());
    controllers = Array.from({ length: isMob ? 4 : 8  }, () => new Controller());
    particles   = Array.from({ length: isMob ? 30 : 60}, () => new Particle());
  }

  function drawConnections() {
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i+1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(79,142,247,${(1 - d/maxDist) * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.shadowBlur = 0;
          ctx.globalAlpha = 1;
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // Atmosphere glow
    const grd = ctx.createRadialGradient(W*0.5, H*0.2, 0, W*0.5, H*0.2, H*0.8);
    grd.addColorStop(0, 'rgba(79,142,247,0.04)');
    grd.addColorStop(0.5, 'rgba(162,89,255,0.02)');
    grd.addColorStop(1, 'transparent');
    ctx.globalAlpha = 1;
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Draw connections
    drawConnections();

    // Draw cubes
    cubes.forEach(c => { c.update(); c.draw(); });

    // Draw controllers
    controllers.forEach(c => { c.update(); c.draw(); });

    // Draw particles
    ctx.globalAlpha = 1;
    particles.forEach(p => { p.update(); p.draw(); });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    requestAnimationFrame(loop);
  }

  window.addEventListener('resize', init);
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
  { name:"1v1.lol",             emoji:"🔫", category:"action",      badge:"HOT", url:"#" },
  { name:"Slope",               emoji:"🔵", category:"action",      badge:"HOT", url:"#" },
  { name:"Run 3",               emoji:"🏃", category:"action",      badge:"",    url:"#" },
  { name:"OvO",                 emoji:"⭕", category:"action",      badge:"",    url:"#" },
  { name:"Geometry Dash",       emoji:"🔷", category:"action",      badge:"",    url:"#" },
  { name:"Stickman Hook",       emoji:"🕹️", category:"action",      badge:"",    url:"#" },
  { name:"Friday Night Funkin", emoji:"🎵", category:"action",      badge:"HOT", url:"#" },
  { name:"Moto X3M",            emoji:"🏍️", category:"racing",      badge:"",    url:"#" },
  { name:"Drift Hunters",       emoji:"🚗", category:"racing",      badge:"",    url:"#" },
  { name:"Drive Mad",           emoji:"🚙", category:"racing",      badge:"",    url:"#" },
  { name:"Drift Boss",          emoji:"🏎️", category:"racing",      badge:"HOT", url:"#" },
  { name:"Fireboy & Watergirl", emoji:"🔥", category:"puzzle",      badge:"",    url:"#" },
  { name:"2048",                emoji:"🔢", category:"puzzle",      badge:"",    url:"#" },
  { name:"Little Alchemy 2",    emoji:"⚗️", category:"puzzle",      badge:"NEW", url:"#" },
  { name:"Shell Shockers",      emoji:"🥚", category:"multiplayer", badge:"NEW", url:"#" },
  { name:"Paper.io 2",          emoji:"📄", category:"multiplayer", badge:"",    url:"#" },
  { name:"Rooftop Snipers",     emoji:"🎯", category:"multiplayer", badge:"",    url:"#" },
  { name:"Basketball Stars",    emoji:"🏀", category:"sports",      badge:"HOT", url:"#" },
  { name:"Retro Bowl",          emoji:"🏈", category:"sports",      badge:"",    url:"#" },
  { name:"Basket Random",       emoji:"🏀", category:"sports",      badge:"",    url:"#" },
  { name:"Cookie Clicker",      emoji:"🍪", category:"idle",        badge:"",    url:"#" },
  { name:"Monkey Mart",         emoji:"🐵", category:"idle",        badge:"HOT", url:"#" },
  { name:"Idle Miner",          emoji:"⛏️", category:"idle",        badge:"",    url:"#" },
];

/* ── STATE ── */
let activeCategory = 'all';

function goPlay(url) { if(url function goPlay(url) { window.open(url, '_blank'); }function goPlay(url) { window.open(url, '_blank'); } url !== '#') { window.open(url, '_blank'); } }

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
