(() => {
  const start = () => {
    const compact = document.createElement('style');
    compact.textContent = `html,body{height:100%;overflow-x:hidden}.app{min-height:100svh!important;padding:calc(env(safe-area-inset-top) + 3px) 10px calc(env(safe-area-inset-bottom) + 8px)!important;display:flex!important;flex-direction:column}header{height:50px;padding:0 2px!important}.sound-top{visibility:hidden}nav{display:none!important}.screen.active,#wordTrails.active,#classicBoard.active{flex:1;min-height:0}.scorebar{padding:6px 8px!important;margin:3px 0 6px!important}.scorebar span{font-size:12px}#classic,#classicBoard{min-height:0!important;padding:0!important;background:transparent!important}.boardScroll,.board-wrap{overflow:visible!important;margin:4px 0!important;padding:3px!important}.sqBoard,.scrabble-board{grid-template-columns:repeat(15,calc((100vw - 30px)/15))!important;gap:1px!important;width:calc(100vw - 30px)!important}.sqCell,.sq{width:auto!important;height:auto!important;aspect-ratio:1!important;font-size:calc((100vw - 30px)/28)!important}.bonus,.sq .mini{font-size:calc((100vw - 30px)/53)!important}.classicRack,.classic-rack{padding:5px 0!important;gap:4px!important}.boardTile,.classic-tile{width:calc((100vw - 52px)/7)!important;height:40px!important;font-size:20px!important}.boardBtns,.classic-actions{margin:2px 0!important;gap:6px!important}.boardBtns button,.classic-actions button{padding:8px 11px!important;font-size:13px!important}.boardHelp,.legend{display:none!important}.trailWheel,.wheel-wrap{width:230px!important;height:230px!important}.trailLetter,.trail-letter{width:47px!important;height:47px!important;font-size:23px!important}.trailWords,.trail-words{min-height:100px!important;padding:8px 0!important}.trailControls,.trail-actions{margin:7px!important}.trailBanner,.hub-banner{padding:8px!important;margin-bottom:5px!important}@media(max-height:700px){.scorebar{display:none}.trailWheel,.wheel-wrap{width:210px!important;height:210px!important}.trailWords,.trail-words{min-height:65px!important}}`;
    document.head.append(compact);
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
      drawer.querySelector('#drawerSound').textContent = sound?.textContent.includes('🔊') ? 'On 🔊' : 'Off 🔇';
    };
    menu.onclick = open; drawer.querySelector('.drawer-close').onclick = close; back.onclick = close;
    drawer.querySelector('#drawerSound').onclick = () => { sound?.click(); refresh(); };
    drawer.querySelector('#drawerDifficulty').onchange = e => { const difficulty = document.querySelector('#difficulty'); if (difficulty) { difficulty.value = e.target.value; difficulty.dispatchEvent(new Event('change')); } };
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else setTimeout(start, 0);
})();