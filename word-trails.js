(() => {
  const boot = () => {
    const css = document.createElement('style');
    css.textContent = `
      #wordTrails{display:none;min-height:650px;padding:12px;border-radius:22px;background:linear-gradient(#0759c9 0 55%,#1992e6 68%,#f1a431 100%);box-shadow:inset 0 0 36px #001e6d66}
      #wordTrails.active{display:block}.trailBanner{padding:11px;border-radius:15px;text-align:center;font-weight:900;background:linear-gradient(90deg,#5c32b7,#ed3e84);box-shadow:0 3px #452071}.trailHud{display:flex;justify-content:space-between;margin:12px 0;padding:9px 12px;border-radius:15px;background:#112963dd;border:1px solid #75affd}.trailStage{margin:auto;width:max-content;max-width:95%;padding:7px 16px;border-radius:18px;background:#dbedff;color:#173d7b;font-weight:900}.trailWords{display:flex;flex-wrap:wrap;justify-content:center;gap:9px;min-height:170px;padding:18px 0}.trailWord{min-width:76px;padding:8px 5px;border:2px solid #aad8ff;border-radius:10px;background:#ffffff38;letter-spacing:5px;font-weight:900;text-align:center}.trailWord.done{background:#ec4386;border-color:#ffb4d0;letter-spacing:1px}.trailCurrent{height:38px;text-align:center;font-size:27px;font-weight:900;letter-spacing:6px;text-shadow:0 2px #053b89}.trailWheel{width:282px;height:282px;margin:auto;position:relative;border:2px solid #e7f8ff;border-radius:50%;background:radial-gradient(circle,#edfcffbb 0 39%,#b4e9fb99 40% 64%,#fff8 65%);touch-action:none;box-shadow:0 4px 14px #00317799}.trailLetter{position:absolute;width:53px;height:53px;transform:translate(-50%,-50%);border:0;border-radius:50%;background:#fff;color:#10285f;font-size:27px;font-weight:900;box-shadow:0 3px #75a8d7}.trailLetter.on{background:#ffcf2c;transform:translate(-50%,-50%) scale(.9)}.trailControls{display:flex;justify-content:center;gap:10px;margin:15px}.trailControls button{border:0;border-radius:13px;padding:10px 15px;background:#162f72;color:#fff;font-weight:900}.trailControls button:last-child{background:#ffc928;color:#573300}`;
    document.head.append(css);

    const nav=document.querySelector('nav'), button=document.createElement('button');
    button.className='tab'; button.textContent='Word Trails'; nav.insertBefore(button,nav.firstChild);
    const view=document.createElement('section'); view.id='wordTrails';
    view.innerHTML='<div class="trailBanner">✨ WORD TRAILS · Connect letters to reveal words</div><div class="trailHud"><span>🫙 24 / 40</span><span>🪙 <b id="trailGold">250</b></span></div><div class="trailStage" id="trailStage">Level 1 · Mountain Trail</div><div class="trailWords" id="trailWords"></div><div class="trailCurrent" id="trailCurrent">&nbsp;</div><div class="trailWheel" id="trailWheel"></div><div class="trailControls"><button id="trailClear">Clear</button><button id="trailShuffle">↻ Shuffle</button><button id="trailNext">Next level</button></div><p class="hint">Swipe through letters, or tap them in order.</p>';
    document.querySelector('.app').append(view);

    const levels=[
      {title:'Mountain Trail',letters:'SILICON',words:['LION','COIN','ICON','SOIL','SILICON']},
      {title:'Ocean Trail',letters:'SEASHELL',words:['SEA','SEAL','EEL','SHELL','SHE']},
      {title:'Space Trail',letters:'ROCKETS',words:['ROCK','STAR','COST','ROCKET','TORE']}
    ];
    let level=0, picked=[], found=[], dragging=false, coins=250;
    const shuffle=a=>[...a].sort(()=>Math.random()-.5);
    const render=()=>{
      const l=levels[level], wheel=document.querySelector('#trailWheel'); wheel.innerHTML=''; picked=[];
      document.querySelector('#trailStage').textContent='Level '+(level+1)+' · '+l.title;
      document.querySelector('#trailGold').textContent=coins;
      document.querySelector('#trailCurrent').innerHTML='&nbsp;';
      document.querySelector('#trailWords').innerHTML=l.words.map(w=>'<span class="trailWord '+(found.includes(w)?'done':'')+'">'+(found.includes(w)?w:'_ '.repeat(w.length))+'</span>').join('');
      shuffle(l.letters.split('')).forEach((letter,i)=>{
        const a=-Math.PI/2+i*2*Math.PI/l.letters.length, b=document.createElement('button');
        b.className='trailLetter'; b.textContent=letter; b.style.left=(141+104*Math.cos(a))+'px'; b.style.top=(141+104*Math.sin(a))+'px';
        const pick=()=>{if(!picked.includes(b)){picked.push(b);b.classList.add('on');document.querySelector('#trailCurrent').textContent=picked.map(x=>x.textContent).join('')}};
        b.onpointerdown=()=>{dragging=true;pick()}; b.onpointerenter=()=>{if(dragging)pick()}; b.onclick=()=>{if(!dragging)pick()}; wheel.append(b);
      });
    };
    const submit=()=>{
      if(!picked.length)return; const word=picked.map(x=>x.textContent).join(''), l=levels[level];
      if(l.words.includes(word)&&!found.includes(word)){found.push(word);coins+=12;if(found.length===l.words.length)coins+=40;}
      else {const t=document.querySelector('#toast');if(t){t.textContent=word+' is not a trail word';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500);}}
      render();
    };
    document.addEventListener('pointerup',()=>{if(dragging){dragging=false;submit()}});
    document.querySelector('#trailClear').onclick=render; document.querySelector('#trailShuffle').onclick=render;
    document.querySelector('#trailNext').onclick=()=>{level=(level+1)%levels.length;found=[];render()};
    button.onclick=()=>{document.querySelectorAll('.tab,.screen,#wordTrails').forEach(x=>x.classList.remove('active'));button.classList.add('active');view.classList.add('active');document.querySelector('#subtitle').textContent='Word Trails · '+levels[level].title;};
    render();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();