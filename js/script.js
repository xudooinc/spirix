// Simple carousel auto-rotate
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('#carousel .slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

function go(i){
  index = i % slides.length;
  carousel.style.transform = `translateX(${-index * 100}%)`;
  dots.forEach((d,di)=>{
    d.classList.toggle('opacity-100', di===index);
    d.classList.toggle('opacity-40', di!==index);
  });
}
dots.forEach(d => d.addEventListener('click', e => go(Number(d.dataset.index))));

setInterval(()=> go(index+1), 3500);
go(0);
