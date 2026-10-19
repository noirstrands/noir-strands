const products=[
['Pixie Cut','Pixie Cut',191,'Natural Black','8 inch','HD Lace','pixie-cut.jpg'],
['Pixie Curls','Pixie Curls',222,'Espresso','12 inch','Transparent Lace','pixie-curls.jpg'],
['Bone Straight','Bone Straight',139,'Natural Black','16 inch','','DD67239A-8B14-4DB1-BAB3-6D5982B589BD.png'],
['Body Wave','Body Wave',283,'Burgundy','20 inch','5x5 Closure','body-wave-card.jpg'],
['Deep Wave','Deep Wave',314,'Natural Black','','13x4 Lace Front','E7991C70-6C31-4265-B47F-29089799952B.png'],
['Water Wave','Water Wave',344,'Natural Black','5x5','HD Lace','IMG_0881.jpeg'],
['Loose Deep Waves','Loose Deep Waves',497,'Burgundy','20 inch','HD Lace','loose-deep-1.jpg'],
['Straight Bob','Straight Bob',120,'Copper Orange','','Transparent Lace','04AABB70-9A50-4222-AC37-11C838CCB456.png'],
['Curly Bob','Curly Bob',245,'Blonde','30 inch','4x4 Closure','curly-bob.jpg'],
['Burmese Curly','Burmese Curly',229,'Espresso','12 inch','HD Lace','burmese-curly.jpg'],
['Deep Curly','Deep Curly',337,'Pink','24 inch','5x5 Closure','deep-curly.jpg'],
['Afro Kinky','Afro Kinky',150,'Blonde','30 inch','13x4 Lace Front','afro-kinky.jpg'],
['Layered Straight','Layered Straight',245,'Natural Black','20 inch','HD Lace','loose-deep-2.jpg'],
['Layered Body Wave','Layered Body Wave',339,'Natural Black','20 inch','Transparent Lace','layered-body-wave.jpg']
];
const cats=['All styles','Pixie Cut','Pixie Curls','Bone Straight','Body Wave','Deep Wave','Water Wave','Loose Wave','Kinky Curly','Kinky Straight','Jerry Curl','Loose Deep Waves','Straight Bob','Curly Bob','Burmese Curly','Bob Wig','Jerry Straight','Deep Curly','Afro Kinky'];
let cart=JSON.parse(localStorage.cart||'[]'), saved=JSON.parse(localStorage.saved||'[]');
const chips=document.querySelector('#chips'); cats.forEach((c,i)=>{let b=document.createElement('button');b.className='chip'+(i===0?' active':'');b.textContent=c;b.onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');render(c==='All styles'?'':c)};chips.appendChild(b)});
function render(filter=''){
 const q=(document.querySelector('#search').value||'').toLowerCase();
 const list=products.filter(p=>(!filter||p[0]===filter)&&(!q||p[0].toLowerCase().includes(q)));
 document.querySelector('#products').innerHTML=list.map((p,i)=>{
  const isPixie=p[0]==='Pixie Cut';
  const isPixieCurls=p[0]==='Pixie Curls';
  const isBodyWave=p[0]==='Body Wave';
  const isStraightBob=p[0]==='Straight Bob';
  const isWaterWave=p[0]==='Water Wave';
  const isWaterWave=p[0]==='Water Wave';
  const bobColors=['Copper Orange','Auburn Brown','Dark Chocolate Brown','Natural Black'];
  const slides=['2F4B1925-05C6-4A60-A163-5BB1E694B9BC.png','5C67CEE6-3B7A-43F7-AB7B-94653487040D.png','IMG_0801.jpeg'];
  const curlsSlides=['IMG_0857.webp','IMG_0856.webp'];
  const deepWaveSlides=['temp_image_3C634754-F18F-469F-AB28-25B1D857BBDA.jpeg','IMG_0865.jpeg'];
  const waterWaveSlides=['IMG_0881.jpeg','IMG_0880.jpeg'];
  const waterWaveSlides=['IMG_0881.jpeg','IMG_0880.jpeg'];
  const imageList=isPixie?slides.map(name=>'/noir-strands/'+name):(isPixieCurls?curlsSlides.map(name=>'/noir-strands/'+name):(isBodyWave?deepWaveSlides.map(name=>'/noir-strands/'+name):(isWaterWave?waterWaveSlides.map(name=>'/noir-strands/'+name):[])));
  const attrs=(isPixie||isPixieCurls||isBodyWave||isWaterWave)?'data-slides="'+imageList.join('|')+'" data-slide-index="0"':'';
  const hideLaceLabel=p[0]==='Bone Straight';
  return `<article class="product"><img class="product-img" ${attrs} src="${(isPixie||isPixieCurls||isBodyWave||isWaterWave)?imageList[0]:p[6]}" alt="${p[0]} wig" loading="eager" decoding="async">${hideLaceLabel?'':'<span class="badge">'+p[5]+'</span><small>'+p[5].toUpperCase()+'</small>'}<h3>${p[1]}</h3><div class="meta">${p[1]}<br>● ${p[3]}${p[4] ? ' · '+p[4] : ''}</div><div class="price">$${p[2]}</div>${isPixie?'<select class="color-select"><option>Natural Black</option><option>Gold</option><option>Auburn Copper</option></select>':(isBodyWave||isWaterWave?'<select class="color-select"><option>Natural Black</option><option>Burgundy</option></select>':(isStraightBob?'<select class="color-select">'+bobColors.map(color=>'<option>'+color+'</option>').join('')+'</select>':'<select><option>'+p[3]+'</option></select>'))}${p[4] ? '<select><option>'+p[4]+'</option></select>' : ''}<button class="add" onclick="addCart(${i},'${filter}')">ADD TO CART</button></article>`;
 }).join('');
 // Selecting a colour displays its matching image and pauses rotation for that card.
 document.querySelectorAll('.product').forEach(card=>{
  const img=card.querySelector('img[data-slides]');
  const select=card.querySelector('.color-select');
  if(!img||!select)return;
  select.selectedIndex=Number(img.dataset.slideIndex||0);
  select.addEventListener('change',()=>{
   const slides=img.dataset.slides.split('|');
   const selected=select.selectedIndex;
   const preload=new Image();
   preload.onload=()=>{img.src=slides[selected];img.dataset.slideIndex=String(selected);img.dataset.manualSelection='true';};
   preload.onerror=()=>console.error('Selected wig colour image failed to load:',slides[selected]);
   preload.src=slides[selected];
  });
 });
 if(window.pixieSlideshowTimer)clearInterval(window.pixieSlideshowTimer);
 window.pixieSlideshowTimer=setInterval(()=>{
  document.querySelectorAll('img[data-slides]').forEach(img=>{
   if(img.dataset.manualSelection==='true')return;
   const slides=img.dataset.slides.split('|');
   const next=(Number(img.dataset.slideIndex||0)+1)%slides.length;
   const preload=new Image();
   preload.onload=()=>{
    img.src=slides[next];img.dataset.slideIndex=String(next);
    const select=img.closest('.product')?.querySelector('.color-select');
    if(select)select.selectedIndex=next;
   };
   preload.onerror=()=>console.error('Product slideshow image failed to load:',slides[next]);
   preload.src=slides[next];
  });
 },2000);
}
function currentList(filter){const q=(document.querySelector('#search').value||'').toLowerCase();return products.filter(p=>(!filter||p[0]===filter)&&(!q||p[0].toLowerCase().includes(q)))}
window.addCart=(i,filter)=>{let p=currentList(filter)[i];cart.push(p);localStorage.cart=JSON.stringify(cart);update()};
function update(){document.querySelector('#cartCount').textContent=cart.length;document.querySelector('#savedCount').textContent=saved.length;document.querySelector('#cartItems').innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p[1]}</span><b>$${p[2]}</b></div>`).join('')||'<p>Your bag is empty.</p>';document.querySelector('#cartTotal').textContent=cart.length?'Items selected: '+cart.length:''}
function open(id){document.querySelector(id).classList.add('open')}function closeAll(){document.querySelectorAll('.drawer').forEach(x=>x.classList.remove('open'))}
document.querySelector('#cartBtn').onclick=()=>open('#cartDrawer');document.querySelector('#savedBtn').onclick=()=>open('#savedDrawer');document.querySelectorAll('.close').forEach(b=>b.onclick=closeAll);document.querySelector('#search').oninput=()=>render();document.querySelector('#filterToggle').onclick=()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));document.querySelector('.chip').classList.add('active');render()};render();update();
