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


span.addEventListener('click', (e) => {
  container.classList.toggle('manejoVerMas')
  container.classList.toggle('manejoVerMenos')
  let elements = [...container.children];
  console.log(elements)
  elements.forEach((el) => el.classList.add('animate__animated', 'animate__zoomIn'))
})


