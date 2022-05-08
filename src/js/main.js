/*'use strict'


const d = document;


const DOMElements = {
  containerApi: d.querySelector('.contenedor'),
  titleApi: d.getElementById('name'),
  img: d.getElementById('img'),
  parrafo: d.getElementById('info'),
  btnAleatorio: d.getElementById('aleatorio')
}
const main = d.querySelector('main')
console.log(main)
console.log(DOMElements);
const URL = 'https://api.thedogapi.com/v1/images/search'
const getData = async (url) => {
  try {
    let response = await fetch(url)

    let json = await response.json()
    console.log(json);
    console.log(json.length)
    if (json.length === 0) {
      DOMElements.parrafo.innerHTML = 'cargando'
    }
    json.forEach(el => {
      const { img, parrafo } = DOMElements;
      img.src = el.url
      parrafo.innerHTML = el.height
    })
  }
  catch (err) {
    console.error(err);
  }

}
// ejecución de carga por primera vez
d.addEventListener('DOMContentLoaded', () => getData(URL), false)
// ejecución de recarga para traer otro perrito
d.addEventListener('click', e => {
  if (e.target === DOMElements.btnAleatorio) {
    getData(URL);
  }
})

*/