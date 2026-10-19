(() => {
  const start = () => {
    const menu = document.querySelector('#menu');
    const sound = document.querySelector('#sound');
    if (!menu) return;
    const back = document.createElement('div');
    back.className = 'drawer-backdrop';
    const drawer = document.createElement('aside');
    drawer.className = 'game-drawer';
    drawer.setAttribute('aria-label', 'Games and settings');
    drawer.innerHTML = '<div class="drawer-head"><span>Word Quest</span><button class="drawer-close" aria-label="Close menu">×</button></div><p class="drawer-title">CHOOSE A GAME</p><div class="drawer-games"></div><div class="drawer-settings"><p class="drawer-title">SETTINGS</p><label>Sound <button type="button" id="drawerSound">On 🔊</button></label><label style="margin-top:12px">CPU <select id="drawerDifficulty"><option value="0">1 · Casual</option><option value="1">2 · Explorer</option><option value="2">3 · Clever</option><option value="3">4 · Expert</option><option value="4">5 · Word Wizard</option></select></label></div>';
    document.body.append(back, drawer);
    const open = () => { refresh(); drawer.classList.add('open'); back.classList.add('open'); };
    const close = () => { drawer.classList.remove('open'); back.classList.remove('open'); };
    const refresh = () => {
      const games = drawer.querySelector('.drawer-games');
      games.innerHTML = '';
      [...document.querySelectorAll('nav .tab')].forEach(tab => {
        const item = document.createElement('button');
        item.className = 'drawer-game' + (tab.classList.contains('active') ? ' active' : '');
        item.textContent = tab.textContent;
        item.onclick = () => { tab.click(); close(); };
        games.append(item);
      });
      const difficulty = document.querySelector('#difficulty');
      const drawerDifficulty = drawer.querySelector('#drawerDifficulty');
      if (difficulty) drawerDifficulty.value = difficulty.value;
      const isOn = sound?.textContent.includes('🔊');
      drawer.querySelector('#drawerSound').textContent = isOn ? 'On 🔊' : 'Off 🔇';
    };
    menu.onclick = open;
    drawer.querySelector('.drawer-close').onclick = close;
    back.onclick = close;
    drawer.querySelector('#drawerSound').onclick = () => { sound?.click(); refresh(); };
    drawer.querySelector('#drawerDifficulty').onchange = e => {
      const difficulty = document.querySelector('#difficulty');
      if (difficulty) { difficulty.value = e.target.value; difficulty.dispatchEvent(new Event('change')); }
    };
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else setTimeout(start, 0);
})();