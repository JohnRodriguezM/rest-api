'use strict';

const btn = document.getElementById('btn')
const container = document.querySelector('.containerFavorites')
const span = document.getElementById('span')

function Toggle(element) {
  element.classList.toggle('hidden')
  element.classList.toggle('visible')
  element.classList.add('animate__animated', 'animate__zoomIn')
}

btn.addEventListener('click', () => Toggle(container))

span.onclick = () => {
  container.classList.toggle('manejoVerMas')
  span.innerHTML = 'ver menos'
  container.classList.toggle('manejoVerMenos')
}
