'use strict';


'use strict'
const d = document;


let number = d.getElementById('numberInput')
let text = d.getElementById('textoInput')
const submit = d.getElementById('submit')
const form = d.getElementById('form')

const DOMElements = {
  containerApi: d.querySelector('.contenedor'),
  titleApi: d.getElementById('name'),
  img: d.getElementById('img'),
  parrafo: d.getElementById('info'),
  btnAleatorio: d.getElementById('aleatorio')
}
const main = d.querySelector('main')



const getData = async () => {
  
  try {
    let URL = `https://api.thedogapi.com/v1/images/search?limit=${text.value}&page=${number.value}`
    console.log(URL)
    console.log(text)
    console.log(number)
    let response = await fetch(URL)
    let json = await response.json()
    console.log(json);
    console.log(json.length)
    if (json.length === 0) {
      DOMElements.parrafo.innerHTML = 'cargando'
    }
    json.forEach(el => {
      const image = d.createElement('img')
      const { img, parrafo,containerApi } = DOMElements;
      containerApi.appendChild(image)
      image.src = el.url
      setTimeout(() => containerApi.removeChild(image),4000)
      /*d.addEventListener('click', e => {
        if (e.target === DOMElements.btnAleatorio) {
          const {containerApi} = DOMElements;
          containerApi.removeChild(image)
        }
      })*/
    })
  }
  catch (err) {
    console.error(err);
  }

}
// ejecución de carga por primera vez
d.addEventListener('DOMContentLoaded', () => getData(), false)
// ejecución de recarga para traer otro perrito
form.addEventListener('submit', e => {
  e.preventDefault()
  getData()
})


