/* ══════════════════════════════════════
   CLASSROOM 6X — Custom Crosshair Cursor
══════════════════════════════════════ */
(function() {
  // Create cursor elements
  const cursor = document.createElement('div');
  cursor.id = 'custom-cursor';
  cursor.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="10" fill="none" stroke="#4f8ef7" stroke-width="1.5"/>
      <circle cx="16" cy="16" r="2.5" fill="#ff4444"/>
      <line x1="16" y1="2" x2="16" y2="10" stroke="#4f8ef7" stroke-width="1.5"/>
      <line x1="16" y1="22" x2="16" y2="30" stroke="#4f8ef7" stroke-width="1.5"/>
      <line x1="2" y1="16" x2="10" y2="16" stroke="#4f8ef7" stroke-width="1.5"/>
      <line x1="22" y1="16" x2="30" y2="16" stroke="#4f8ef7" stroke-width="1.5"/>
      <line x1="11" y1="7" x2="13" y2="9" stroke="#ff4444" stroke-width="1"/>
      <line x1="21" y1="7" x2="19" y2="9" stroke="#ff4444" stroke-width="1"/>
      <line x1="11" y1="25" x2="13" y2="23" stroke="#ff4444" stroke-width="1"/>
      <line x1="21" y1="25" x2="19" y2="23" stroke="#ff4444" stroke-width="1"/>
    </svg>
  `;
  document.body.appendChild(cursor);

  // Click spark container
  const sparkContainer = document.createElement('div');
  sparkContainer.id = 'spark-container';
  document.body.appendChild(sparkContainer);

  // Move cursor
  let mx = -100, my = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx - 16}px, ${my - 16}px)`;
  });

  // Click effect — shooting sparks
  document.addEventListener('click', e => {
    for (let i = 0; i < 8; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark';
      const angle = (i / 8) * Math.PI * 2;
      const dist = 30 + Math.random() * 20;
      spark.style.cssText = `
        left:${e.clientX}px; top:${e.clientY}px;
        --dx:${Math.cos(angle) * dist}px;
        --dy:${Math.sin(angle) * dist}px;
        background:${Math.random() > 0.5 ? '#4f8ef7' : '#ff4444'};
      `;
      sparkContainer.appendChild(spark);
      setTimeout(() => spark.remove(), 500);
    }
    // Cursor click animation
    cursor.classList.add('clicked');
    setTimeout(() => cursor.classList.remove('clicked'), 150);
  });

  // Hide on leave
  document.addEventListener('mouseleave', () => cursor.style.opacity = '0');
  document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
})();
