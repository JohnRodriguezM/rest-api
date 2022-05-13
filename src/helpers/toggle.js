'use strict';


const btn = document.getElementById('btn')


let container = document.querySelector('.containerFavorites')

btn.addEventListener('click',(e) => {
  container.classList.toggle('hidden')
  container.classList.toggle('visible')

  
})