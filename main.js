// FAQ
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Sticky
  const sb = document.getElementById('sb');
  window.addEventListener('scroll', () => {
    sb.classList.toggle('on', window.scrollY > 500);
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.pain-card,.mod-card,.testi,.upsell-card,.sol-box,.upsell-box,.gcard').forEach(el => {
    el.style.cssText += 'opacity:0;transform:translateY(22px);transition:opacity .5s ease,transform .5s ease;';
    obs.observe(el);
  });

  // 3D tilt on gallery cards
  document.querySelectorAll('.gcard').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `perspective(800px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) translateZ(10px) translateY(0)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Canvas particles in hero
  (function(){
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const hero = canvas.parentElement;
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];
    function resize(){ W = canvas.width = hero.offsetWidth; H = canvas.height = hero.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);
    for(let i=0;i<60;i++) pts.push({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.35, vy: (Math.random()-.5)*.35,
      r: Math.random()*1.6+.4, a: Math.random()*.45+.08
    });
    function tick(){
      ctx.clearRect(0,0,W,H);
      pts.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W) p.vx*=-1;
        if(p.y<0||p.y>H) p.vy*=-1;
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(201,168,76,${p.a})`;
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    tick();
  })();