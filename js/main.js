const GAMES = [
  { name:"Eggy Car",             emoji:"🥚", img:"images/eggy-car-unblocked-classroom-6x.webp",               categories:["car","racing"],                      badge:"NEW", url:"game/eggy-car-unblocked.html" },
  { name:"Wormate.io",           emoji:"🐛", img:"images/wormate-io-unblocked-classroom-6x.webp",             categories:["io","multiplayer"],                  badge:"NEW", url:"game/wormate-io-unblocked.html" },
  { name:"Agar.io",              emoji:"🔵", img:"images/agario-unblocked-classroom-6x.webp",                 categories:["io","multiplayer"],                  badge:"",    url:"game/agario-unblocked.html" },
  { name:"House of Hazards",     emoji:"🏠", img:"images/house-of-hazards-unblocked-classroom-6x.webp",       categories:["2player","multiplayer"],             badge:"NEW", url:"game/house-of-hazards-unblocked.html" },
  { name:"Madalin Stunt Cars 2", emoji:"🚗", img:"images/madalin-stunt-cars-2-unblocked-classroom-6x.webp",  categories:["car","racing","multiplayer"],        badge:"",    url:"game/madalin-stunt-cars-2-unblocked.html" },
  { name:"Blockpost",            emoji:"🧱", img:"images/blockpost-unblocked-classroom-6x.webp",              categories:["shooting","io","multiplayer"],       badge:"",    url:"game/blockpost-unblocked.html" },
  { name:"Sky Balls 3D",         emoji:"🔮", img:"images/sky-balls-3d-unblocked-classroom-6x.webp",           categories:["action","2player"],                 badge:"NEW", url:"game/sky-balls-3d-unblocked.html" },
  { name:"1v1.lol",              emoji:"🔫", img:"images/1v1lol-unblocked-classroom-6x.webp",                 categories:["shooting","io","multiplayer"],       badge:"HOT", url:"game/1v1lol-unblocked.html" },
  { name:"Slope",                emoji:"🔵", img:"images/slope-unblocked-classroom-6x.webp",                  categories:["action"],                           badge:"HOT", url:"game/slope-unblocked.html" },
  { name:"Run 3",                emoji:"🏃", img:"images/run-3-unblocked-classroom-6x.webp",                  categories:["action"],                           badge:"",    url:"game/run-3-unblocked.html" },
  { name:"OvO",                  emoji:"⭕", img:"images/ovo-unblocked-classroom-6x.webp",                   categories:["action"],                           badge:"",    url:"game/ovo-unblocked.html" },
  { name:"Geometry Dash",        emoji:"🔷", img:"images/geometry-dash-unblocked-classroom-6x.webp",          categories:["action"],                           badge:"",    url:"game/geometry-dash-unblocked.html" },
  { name:"Stickman Hook",        emoji:"🕹️", img:"images/stickman-hook-unblocked-classroom-6x.webp",         categories:["action"],                           badge:"",    url:"game/stickman-hook-unblocked.html" },
  { name:"Friday Night Funkin",  emoji:"🎵", img:"images/friday-night-funkin-unblocked-classroom-6x.webp",    categories:["action"],                           badge:"HOT", url:"game/friday-night-funkin-unblocked.html" },
  { name:"Moto X3M",             emoji:"🏍️", img:"images/moto-x3m-unblocked-classroom-6x.webp",             categories:["racing","car","sports"],            badge:"",    url:"game/moto-x3m-unblocked.html" },
  { name:"Drift Hunters",        emoji:"🚗", img:"images/drift-hunters-unblocked-classroom-6x.webp",          categories:["racing","car","sports"],            badge:"",    url:"game/drift-hunters-unblocked.html" },
  { name:"Drive Mad",            emoji:"🚙", img:"images/drive-mad-unblocked-classroom-6x.webp",              categories:["racing","car"],                     badge:"",    url:"game/drive-mad-unblocked.html" },
  { name:"Drift Boss",           emoji:"🏎️", img:"images/drift-boss-unblocked-classroom-6x.webp",           categories:["racing","car"],                     badge:"HOT", url:"game/drift-boss-unblocked.html" },
  { name:"Fireboy & Watergirl",  emoji:"🔥", img:"images/fireboy-watergirl-3-unblocked-classroom-6x.webp",   categories:["puzzle","2player"],                 badge:"",    url:"game/fireboy-watergirl-3-unblocked.html" },
  { name:"2048",                 emoji:"🔢", img:"images/2048-unblocked-classroom-6x.webp",                  categories:["puzzle"],                           badge:"",    url:"game/2048-unblocked.html" },
  { name:"Little Alchemy 2",     emoji:"⚗️", img:"images/little-alchemy-2-unblocked-classroom-6x.webp",     categories:["puzzle"],                           badge:"NEW", url:"game/little-alchemy-2-unblocked.html" },
  { name:"Shell Shockers",       emoji:"🥚", img:"images/shell-shockers-unblocked-classroom-6x.webp",        categories:["shooting","io","multiplayer"],       badge:"NEW", url:"game/shell-shockers-unblocked.html" },
  { name:"Paper.io 2",           emoji:"📄", img:"images/paperio-2-unblocked-classroom-6x.webp",             categories:["io","multiplayer"],                 badge:"",    url:"game/paperio-2-unblocked.html" },
  { name:"Rooftop Snipers",      emoji:"🎯", img:"images/rooftop-snipers-unblocked-classroom-6x.webp",       categories:["2player","shooting"],               badge:"",    url:"game/rooftop-snipers-unblocked.html" },
  { name:"Basketball Stars",     emoji:"🏀", img:"images/basketball-stars-unblocked-classroom-6x.webp",      categories:["sports","2player"],                 badge:"HOT", url:"game/basketball-stars-unblocked.html" },
  { name:"Retro Bowl",           emoji:"🏈", img:"images/retro-bowl-unblocked-classroom-6x.webp",            categories:["sports"],                           badge:"",    url:"game/retro-bowl-unblocked.html" },
  { name:"Basket Random",        emoji:"🏀", img:"images/basket-random-unblocked-classroom-6x.webp",         categories:["sports","2player"],                 badge:"",    url:"game/basket-random-unblocked.html" },
  { name:"Cookie Clicker",       emoji:"🍪", img:"images/cookie-clicker-unblocked-classroom-6x.webp",        categories:["idle"],                             badge:"",    url:"game/cookie-clicker-unblocked.html" },
  { name:"Monkey Mart",          emoji:"🐵", img:"images/monkey-mart-unblocked-classroom-6x.webp",           categories:["idle"],                             badge:"HOT", url:"game/monkey-mart-unblocked.html" },
  { name:"Idle Miner",           emoji:"⛏️", img:"images/idle-miner-unblocked-classroom-6x.webp",           categories:["idle"],                             badge:"",    url:"game/idle-miner-unblocked.html" },
  { name:"Smash Karts",          emoji:"🏎️", img:"images/smash-karts-unblocked-classroom-6x.webp",         categories:["io","multiplayer","shooting","car"], badge:"",    url:"game/smash-karts-unblocked.html" },
  { name:"Tunnel Rush",          emoji:"🌀", img:"images/tunnel-rush-unblocked-classroom-6x.webp",           categories:["action"],                           badge:"",    url:"game/tunnel-rush-unblocked.html" },
  { name:"Happy Wheels",         emoji:"🛞", img:"images/happy-wheels-unblocked-classroom-6x.webp",          categories:["action"],                           badge:"",    url:"game/happy-wheels-unblocked.html" },
  { name:"Subway Surfers",       emoji:"🚇", img:"images/subway-surfers-unblocked-classroom-6x.webp",        categories:["action"],                           badge:"",    url:"game/subway-surfers-unblocked.html" },
];

let activeCategory = 'all';

function goPlay(url) {
  const inSubdir = window.location.pathname.includes('/category/') || window.location.pathname.includes('/pages/');
  window.location.href = inSubdir ? '../' + url : url;
}

function buildCard(g) {
  const badgeClass = g.badge === 'HOT' ? 'badge-hot' : g.badge === 'NEW' ? 'badge-new' : '';
  const inSubdir = window.location.pathname.includes('/category/') || window.location.pathname.includes('/game/') || window.location.pathname.includes('/pages/');
  const imgPrefix = inSubdir ? '../' : '';
  return `
    <div class="game-card" onclick="goPlay('${g.url}')">
      <div class="game-thumb">
        ${g.img
          ? `<img src="${imgPrefix}${g.img}" alt="${g.name} unblocked" loading="lazy"/>`
          : `<span class="game-emoji">${g.emoji}</span>`}
        ${g.badge ? `<span class="badge ${badgeClass}">${g.badge}</span>` : ''}
      </div>
      <div class="game-info">
        <div class="game-name">${g.name}</div>
        <span class="game-cat-tag">${g.categories[0]}</span>
      </div>
      <button class="play-btn">▶ Play Now</button>
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
  let list = activeCategory === 'all' ? GAMES : GAMES.filter(g => g.categories.includes(activeCategory));
  if (q) list = list.filter(g => g.name.toLowerCase().includes(q) || g.categories.join(' ').includes(q));
  renderGames(list);
}

function setCategory(cat, btn) {
  activeCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterGames();
}

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
      }
    });
  }
}

function initFaq() {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const icon = this.querySelector('.faq-icon');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const ic = i.querySelector('.faq-icon');
        if (ic) ic.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        if (icon) icon.textContent = '−';
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFaq();
  filterGames();
  const si = document.getElementById('searchInput');
  if (si) si.addEventListener('input', filterGames);
});
