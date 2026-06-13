/* ══════════════════════════════════════
   NEON GAMING HUB 3D Background
══════════════════════════════════════ */
(function() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width  = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  let mx = W/2, my = H/2;

  window.addEventListener('resize', () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  const COLORS = ['#4f8ef7','#a259ff','#00e5ff','#ff4444'];

  // Floating 3D wireframe cubes — large & bright
  const cubes = Array.from({length:18}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 70 + 50,          // 50–120px (was 20–60)
    vx: (Math.random()-0.5) * 0.5,
    vy: (Math.random()-0.5) * 0.5,
    rot: Math.random() * Math.PI*2,
    rs: (Math.random()-0.5) * 0.02,
    color: ['#4f8ef7','#a259ff','#00e5ff'][Math.floor(Math.random()*3)],
    alpha: Math.random() * 0.3 + 0.5,       // 0.5–0.8 (was 0.2–0.5)
  }));

  // Floating game controllers — large & bright
  const controllers = Array.from({length:10}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 55 + 45,          // 45–100px (was 30–80)
    vx: (Math.random()-0.5) * 0.4,
    vy: (Math.random()-0.5) * 0.4,
    rot: Math.random() * Math.PI*2,
    rs: (Math.random()-0.5) * 0.01,
    color: Math.random() > 0.5 ? '#4f8ef7' : '#a259ff',
    alpha: Math.random() * 0.3 + 0.5,       // 0.5–0.8 (was 0.2–0.5)
  }));

  // Particles
  const dots = Array.from({length:60}, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 1,
    vx: (Math.random()-0.5) * 0.6,
    vy: (Math.random()-0.5) * 0.6,
    color: COLORS[Math.floor(Math.random()*COLORS.length)],
    alpha: Math.random() * 0.5 + 0.2,
  }));

  function drawCube(c) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot);
    ctx.globalAlpha = c.alpha;
    ctx.strokeStyle = c.color;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 20;
    ctx.shadowColor = c.color;
    const s = c.size;
    ctx.strokeRect(-s/2, -s/2, s, s);
    const o = s * 0.3;
    ctx.beginPath();
    ctx.moveTo(-s/2,-s/2); ctx.lineTo(-s/2+o,-s/2-o);
    ctx.moveTo( s/2,-s/2); ctx.lineTo( s/2+o,-s/2-o);
    ctx.moveTo( s/2, s/2); ctx.lineTo( s/2+o, s/2-o);
    ctx.moveTo(-s/2, s/2); ctx.lineTo(-s/2+o, s/2-o);
    ctx.moveTo(-s/2+o,-s/2-o); ctx.lineTo(s/2+o,-s/2-o);
    ctx.moveTo( s/2+o,-s/2-o); ctx.lineTo(s/2+o, s/2-o);
    ctx.moveTo(-s/2+o, s/2-o); ctx.lineTo(s/2+o, s/2-o);
    ctx.stroke();
    ctx.restore();
  }

  function drawController(c) {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot);
    ctx.globalAlpha = c.alpha;
    ctx.strokeStyle = c.color;
    ctx.fillStyle = c.color;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 25;
    ctx.shadowColor = c.color;
    const w = c.size*2, h = c.size*1.2;
    // Body
    ctx.strokeRect(-w/2, -h/2, w, h);
    // Left handle
    ctx.strokeRect(-w/2, h*0.1, w*0.3, h*0.5);
    // Right handle
    ctx.strokeRect(w/2-w*0.3, h*0.1, w*0.3, h*0.5);
    // Dpad
    ctx.fillRect(-w*0.3, -h*0.05, w*0.06, h*0.3);
    ctx.fillRect(-w*0.35, h*0.05, w*0.16, h*0.1);
    // Buttons
    ctx.beginPath(); ctx.arc(w*0.25, -h*0.05, c.size*0.12, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(w*0.38,  h*0.08, c.size*0.12, 0, Math.PI*2); ctx.fill();
    ctx.restore();
  }

  function loop() {
    ctx.clearRect(0,0,W,H);

    // Background glow
    const g = ctx.createRadialGradient(W/2, H/3, 0, W/2, H/3, H);
    g.addColorStop(0, 'rgba(79,142,247,0.06)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

    // Draw cubes
    cubes.forEach(c => {
      c.x += c.vx; c.y += c.vy; c.rot += c.rs;
      if(c.x<-60) c.x=W+60; if(c.x>W+60) c.x=-60;
      if(c.y<-60) c.y=H+60; if(c.y>H+60) c.y=-60;
      drawCube(c);
    });

    // Draw controllers
    controllers.forEach(c => {
      c.x += c.vx; c.y += c.vy; c.rot += c.rs;
      if(c.x<-80) c.x=W+80; if(c.x>W+80) c.x=-80;
      if(c.y<-80) c.y=H+80; if(c.y>H+80) c.y=-80;
      drawController(c);
    });

    // Draw dots + connections
    ctx.shadowBlur = 0;
    dots.forEach((d,i) => {
      d.x += d.vx; d.y += d.vy;
      if(d.x<0) d.x=W; if(d.x>W) d.x=0;
      if(d.y<0) d.y=H; if(d.y>H) d.y=0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI*2);
      ctx.fillStyle = d.color;
      ctx.globalAlpha = d.alpha;
      ctx.fill();
      // Connect nearby
      for(let j=i+1;j<dots.length;j++){
        const dx=d.x-dots[j].x, dy=d.y-dots[j].y;
        const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){
          ctx.beginPath();
          ctx.moveTo(d.x,d.y); ctx.lineTo(dots[j].x,dots[j].y);
          ctx.strokeStyle=`rgba(79,142,247,${(1-dist/120)*0.2})`;
          ctx.lineWidth=0.5;
          ctx.globalAlpha=1;
          ctx.stroke();
        }
      }
    });

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    requestAnimationFrame(loop);
  }
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

function goPlay(url) {
  if(url && url !== '#') { window.open(url, '_blank'); }
}

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
