// ---------- Cursor ambient glow ----------
(function(){
  const glow = document.querySelector('.cursor-glow');
  if(!glow) return;
  let raf = null;
  window.addEventListener('mousemove', (e) => {
    if(raf) return;
    raf = requestAnimationFrame(() => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
      raf = null;
    });
  });
})();

// ---------- Mobile nav toggle ----------
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if(!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
  });
})();

// ---------- Active nav link ----------
(function(){
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === current){ a.classList.add('active'); }
  });
})();

// ---------- Scroll reveal ----------
(function(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(el => obs.observe(el));
})();

// ---------- Terminal typing effect (home hero) ----------
(function(){
  const el = document.getElementById('terminal-lines');
  if(!el) return;

  const lines = [
    [ '<span class="tk-com">// initializing developer...</span>' ],
    [ '<span class="tk-key">const</span> <span class="tk-var">dev</span> = {' ],
    [ '&nbsp;&nbsp;name: <span class="tk-str">"Lyxian"</span>,' ],
    [ '&nbsp;&nbsp;role: <span class="tk-str">"Multiplatform development"</span>,' ],
    [ '&nbsp;&nbsp;stack: [<span class="tk-str">"JavaScript"</span>, <span class="tk-str">"SQL"</span>, <span class="tk-str">"Java"</span>],' ],
    [ '&nbsp;&nbsp;loves: <span class="tk-str">"Loves coffee"</span>' ],
    [ '};' ],
    [ '<span class="tk-fn">deploy</span>(dev); <span class="tk-com">// not being able to sleep properly since 2022</span>' ],
  ];

  let i = 0;
  function typeLine(){
    if(i >= lines.length){
      const caret = document.createElement('span');
      caret.className = 'caret';
      el.appendChild(caret);
      return;
    }
    const div = document.createElement('div');
    div.className = 'line';
    el.appendChild(div);
    div.innerHTML = lines[i][0];
    i++;
    setTimeout(typeLine, 260);
  }
  typeLine();
})();

// ---------- Contact form (cosmetic) ----------
/*
(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const btn = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dict = (typeof TRANSLATIONS !== 'undefined') ? (TRANSLATIONS[getCurrentLang()] || TRANSLATIONS.en) : null;
    const original = btn.textContent;
    btn.textContent = dict ? dict.btn_sending : 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = dict ? dict.btn_sent : 'Message sent ✓';
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        form.reset();
      }, 2200);
    }, 900);
  });
})();
*/


//------------ Contact for real------------------------
(function(){
  const form = document.getElementById('contact-form');
  if(!form) return;
  const btn = form.querySelector('button[type="submit"]');
 
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dict = (typeof TRANSLATIONS !== 'undefined') ? (TRANSLATIONS[getCurrentLang()] || TRANSLATIONS.en) : null;
    const original = btn.textContent;
    btn.textContent = dict ? dict.btn_sending : 'Sending...';
    btn.disabled = true;
 
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
 
      if (response.ok) {
        btn.textContent = dict ? dict.btn_sent : 'Message sent ✓';
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
          form.reset();
        }, 2200);
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      btn.textContent = 'Something went wrong — try again';
      btn.disabled = false;
      setTimeout(() => { btn.textContent = original; }, 2500);
    }
  });
})();


// ---------- Project filter (projects page) ----------
(function(){
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if(!filters.length) return;
  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      const f = btn.dataset.filter;
      cards.forEach(card => {
        const show = f === 'all' || card.dataset.tags.includes(f);
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();
