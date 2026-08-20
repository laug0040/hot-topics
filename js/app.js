document.addEventListener('DOMContentLoaded',()=>{
  const main = document.getElementById('main-content');
  const navList = document.getElementById('nav-list');
  const toggle = document.getElementById('nav-toggle');
  const masthead = document.getElementById('masthead');

  async function loadPartial(name){
    try{
      const res = await fetch(`partials/${name}.html`);
      if(!res.ok) throw new Error('Partial not found');
      const html = await res.text();
      main.innerHTML = html;
      masthead.style.backgroundImage = '';
    }catch(e){
      main.innerHTML = '<p>Content could not be loaded.</p>';
    }
  }

  // navigation clicks
  navList.addEventListener('click',e=>{
    const a = e.target.closest('a');
    if(!a) return;
    e.preventDefault();
    const page = a.dataset.page || 'home';
    loadPartial(page);
    // close mobile nav
    if(window.getComputedStyle(toggle).display!=='none') navList.style.display='none';
  });

  toggle.addEventListener('click',()=>{
    navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
  });

  // initial load
  loadPartial('home');
});
