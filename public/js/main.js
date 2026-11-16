// Always open a page at the top (unless a #section link was used)
(function(){
  try{ if('scrollRestoration' in history) history.scrollRestoration='manual'; }catch(e){}
  var hasTarget=function(){ try{ return location.hash && document.querySelector(location.hash); }catch(e){ return false; } };
  function toTop(){
    if(hasTarget()) return;
    try{ window.scrollTo({top:0,left:0,behavior:'instant'}); }catch(e){ window.scrollTo(0,0); }
    document.documentElement.scrollTop=0; document.body.scrollTop=0;
  }
  toTop();
  document.addEventListener('DOMContentLoaded',toTop);
  window.addEventListener('load',function(){ toTop(); setTimeout(toTop,50); setTimeout(toTop,250); });
  window.addEventListener('pageshow',toTop);
  // smooth scrolling only for in-page jump links
  document.addEventListener('click',function(e){
    var a=e.target.closest && e.target.closest('a[href^="#"]'); if(!a) return;
    var t=document.querySelector(a.getAttribute('href')); if(!t) return;
    e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'});
  });
})();
(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  if(btn&&nav){btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.textContent=o?'Close':'Menu';});}
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();

  // Enquiry form -> WhatsApp message (no server needed)
  var f=document.getElementById('enquiry');
  if(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var d=new FormData(f),lines=['Hi Joha, I found you on your website.'];
    if(d.get('name'))lines.push('Name: '+d.get('name'));
    if(d.get('suburb'))lines.push('Suburb: '+d.get('suburb'));
    if(d.get('service'))lines.push('Service: '+d.get('service'));
    if(d.get('message'))lines.push('','Details: '+d.get('message'));
    var url='https://wa.me/27635012986?text='+encodeURIComponent(lines.join('\n'));
    var ok=document.getElementById('form-ok');
    if(ok){ok.hidden=false;ok.querySelector('a').href=url;}
    window.location.href=url;
  });}

  // Gallery filters
  var fb=document.querySelectorAll('.filters button');
  fb.forEach(function(b){b.addEventListener('click',function(){
    fb.forEach(function(x){x.setAttribute('aria-pressed',x===b)});
    var c=b.dataset.f;
    document.querySelectorAll('.gallery .shot').forEach(function(s){s.hidden=!(c==='all'||s.dataset.cat===c)});
  });});
})();
(function(){
  var lb=document.getElementById('lightbox');if(!lb||!lb.showModal)return;
  var img=lb.querySelector('img');
  document.querySelectorAll('.zoom').forEach(function(b){b.addEventListener('click',function(){img.src=b.dataset.src;img.alt=b.querySelector('img').alt;lb.showModal();});});
  lb.querySelector('.lb-close').addEventListener('click',function(){lb.close()});
  lb.addEventListener('click',function(e){if(e.target===lb)lb.close()});
})();
// EV savings calculator
(function(){
  var g=function(id){return document.getElementById(id)}; if(!g('c-km')) return;
  var R=function(n){return 'R '+Math.round(n).toLocaleString('en-ZA').replace(/,/g,' ')};
  function fill(el){el.style.setProperty('--p',((el.value-el.min)/(el.max-el.min)*100)+'%')}
  function calc(){
    var km=+g('c-km').value,l=+g('c-l').value,p=+g('c-p').value,e=+g('c-e').value,s=+g('c-s').value;
    g('o-km').textContent=km.toLocaleString('en-ZA').replace(/,/g,' ')+' km';
    g('o-l').textContent=l.toFixed(1)+' L/100km';
    g('o-p').textContent='R'+p.toFixed(2)+'/L';
    g('o-e').textContent='R'+e.toFixed(2)+'/kWh';
    g('o-s').textContent=s+'%';
    var pet=km/100*l*p, ev=km/100*18*e*(1-s/100), mo=pet-ev;
    g('r-pet').textContent=R(pet); g('r-ev').textContent=R(ev); g('r-mo').textContent=R(mo); g('r-year').textContent=R(mo*12);
    ['c-km','c-l','c-p','c-e','c-s'].forEach(function(i){fill(g(i))});
    var msg='Hi Joha, I used the savings calculator on your website. I drive about '+km+' km a month and would like a quote for a home EV charger.';
    g('c-wa').href='https://wa.me/27635012986?text='+encodeURIComponent(msg);
  }
  ['c-km','c-l','c-p','c-e','c-s'].forEach(function(i){g(i).addEventListener('input',calc)});
  calc();
})();
