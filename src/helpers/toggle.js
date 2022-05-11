'use strict';


const btn = document.getElementById('btn')


function toggle(){
  let container = document.querySelector('.favoritesDogs')
  console.log(container)
  container.classList.toggle('hidden')
  container.classList.toggle('visible')
}

btn.addEventListener('click', toggle)