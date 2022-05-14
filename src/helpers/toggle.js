'use strict';

const btn = document.getElementById('btn')
const container = document.querySelector('.containerFavorites')

function Toggle(element) {
  element.classList.toggle('hidden')
  element.classList.toggle('visible')
}

btn.addEventListener('click', () => Toggle(container))