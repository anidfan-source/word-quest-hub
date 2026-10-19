(() => {
  const boot = () => {
    const css = document.createElement('style');
    css.textContent = `
      #wordTrails{display:none;min-height:0!important;padding:8px!important;border-radius:20px;background:linear-gradient(#0759c9 0 55%,#1992e6 68%,#f1a431 100%);box-shadow:inset 0 0 36px #001e6d66}
      #wordTrails.active{display:block}.trailBanner{padding:9px;border-radius:15px;text-align:center;font-weight:900;background:linear-gradient(90deg,#5c32b7,#ed3e84);box-shadow:0 3px #452071}.trailHud{display:flex;justify-content:space-between;margin:8px 0;padding:7px 12px;border-radius:15px;background:#112963dd;border:1px solid #75affd}.trailStage{margin:auto;width:max-content;max-width:95%;padding:6px 14px;border-radius:18px;background:#dbedff;color:#173d7b;font-weight:900}.trailWords{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;min-height:112px;padding:10px 0}.trailWord{min-width:76px;padding:7px 5px;border:2px solid #aad8ff;border-radius:10px;background:#ffffff38;letter-spacing:5px;font-weight:900;text-align:center}.trailWord.done{background:#ec4386;border-color:#ffb4d0;letter-spacing:1px}.trailCurrent{height:32px;text-align:center;font-size:24px;font-weight:900;letter-spacing:6px;text-shadow:0 2px #053b89}.trailWheel{--ring:37%;width:min(72vw,282px)!important;aspect-ratio:1;height:auto!important;margin:auto;position:relative;border:2px solid #e7f8ff;border-radius:50%;background:radial-gradient(circle,#edfcffbb 0 39%,#b4e9fb99 40% 64%,#fff8 65%);touch-action:none;box-shadow:0 4px 14px #00317799;user-select:none}.trailLetter{position:absolute;width:50px;height:50px;transform:translate(-50%,-50%);border:0;border-radius:50%;background:#fff;color:#10285f;font-size:26px;font-weight:900;box-shadow:0 3px #75a8d7;touch-action:none}.trailLetter.on{background:#ffcf2c;transform:translate(-50%,-50%) scale(.9)}.trailPath{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.trailControls{display:flex;justify-content:center;gap:9px;margin:10px}.trailControls button{border:0;border-radius:13px;padding:9px 13px;background:#162f72;color:#fff;font-weight:900}.trailControls button:last-child{background:#ffc928;color:#573300}
      @media(max-height:700px){.trailWords{min-height:78px;padding:7px 0}.trailWheel{width:min(65vw,230px)!important}.trailBanner{padding:7px}.trailHud{margin:5px 0}.trailControls{margin:7px}}
    `;
    document.head.append(css);
    const nav=document.querySelector('nav'), button=document.createElement('button');
    button.className='tab'; button.textContent='Word Trails'; nav.insertBefore(button,nav.firstChild);
    const view=document.createElement('section'); view.id='wordTrails';
    view.innerHTML='<div class="trailBanner">✨ WORD TRAILS · Connect letters to reveal words</div><div class="trailHud"><span>🫙 24 / 40</span><span>🪙 <b id="trailGold">250</b></span></div><div class="trailStage" id="trailStage">Level 1 · Mountain Trail</div><div class="trailWords" id="trailWords"></div><div class="trailCurrent" id="trailCurrent">&nbsp;</div><div class="trailWheel" id="trailWheel"><svg class="trailPath" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline id="trailLine" fill="none" stroke="#ec4386" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="trailControls"><button id="trailClear">Clear</button><button id="trailShuffle">↻ Shuffle</button><button id="trailNext">Next level</button></div><p class="hint">Hold and trace across the letters to make a word.</p>';
    document.querySelector('.app').append(view);
    const levels=[{title:'Mountain Trail',letters:'SILICON',words:['LION','COIN','ICON','SOIL','SILICON']},{title:'Ocean Trail',letters:'SEASHELL',words:['SEA','SEAL','EEL','SHELL','SHE']},{title:'Space Trail',letters:'ROCKETS',words:['ROCK','STAR','COST','ROCKET','TORE']}];
    let level=0,picked=[],found=[],dragging=false,coins=250;
    const shuffle=a=>[...a].sort(()=>Math.random()-.5);
    const setPath=()=>document.querySelector('#trailLine').setAttribute('points',picked.map(x=>x.dataset.x+','+x.dataset.y).join(' '));
    const pick=b=>{if(!dragging||!b||picked.includes(b))return;picked.push(b);b.classList.add('on');document.querySelector('#trailCurrent').textContent=picked.map(x=>x.textContent).join('');setPath()};
    const render=()=>{
      const l=levels[level],wheel=document.querySelector('#trailWheel');wheel.querySelectorAll('.trailLetter').forEach(x=>x.remove());picked=[];
      document.querySelector('#trailLine').setAttribute('points','');
      document.querySelector('#trailStage').textContent='Level '+(level+1)+' · '+l.title;document.querySelector('#trailGold').textContent=coins;document.querySelector('#trailCurrent').innerHTML='&nbsp;';
      document.querySelector('#trailWords').innerHTML=l.words.map(w=>'<span class="trailWord '+(found.includes(w)?'done':'">'+(found.includes(w)?w:'_ '.repeat(w.length))+'</span>').join('');
      shuffle(l.letters.split('')).forEach((letter,i)=>{
        const a=-Math.PI/2+i*2*Math.PI/l.letters.length,x=50+37*Math.cos(a),y=50+37*Math.sin(a),b=document.createElement('button');
        b.className='trailLetter';b.textContent=letter;b.style.left=x+'%';b.style.top=y+'%';b.dataset.x=x;b.dataset.y=y;
        b.onpointerdown=e=>{dragging=true;wheel.setPointerCapture?.(e.pointerId);pick(b);e.preventDefault()};wheel.append(b);
      });
    };
    const submit=()=>{if(!picked.length)return;const word=picked.map(x=>x.textContent).join(''),l=levels[level];if(l.words.includes(word)&&!found.includes(word)){found.push(word);coins+=12;if(found.length===l.words.length)coins+=40;const t=document.querySelector('#toast');if(t){t.textContent='Trail found: '+word+'! +12 coins';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400)}}else{const t=document.querySelector('#toast');if(t){t.textContent=word+' is not a trail word';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1400)}}render()};
    const wheel=document.querySelector('#trailWheel');
    wheel.onpointermove=e=>{if(!dragging)return;const hit=document.elementFromPoint(e.clientX,e.clientY)?.closest('.trailLetter');pick(hit)};
    const finish=e=>{if(!dragging)return;dragging=false;wheel.releasePointerCapture?.(e.pointerId);submit()};
    wheel.onpointerup=finish;wheel.onpointercancel=finish;
    document.querySelector('#trailClear').onclick=render;document.querySelector('#trailShuffle').onclick=render;document.querySelector('#trailNext').onclick=()=>{level=(level+1)%levels.length;found=[];render()};
    button.onclick=()=>{document.querySelectorAll('.tab,.screen,#wordTrails').forEach(x=>x.classList.remove('active'));button.classList.add('active');view.classList.add('active');document.querySelector('#subtitle').textContent='Word Trails · '+levels[level].title;};
    render();
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();