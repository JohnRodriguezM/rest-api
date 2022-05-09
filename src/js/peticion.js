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

const manejoErrores = res => {
  if (!res.ok) {
    throw {
      status: res.status,
      ok: res.ok,
    }
  }
}

const getData = async () => {
  const { containerApi, parrafo } = DOMElements;
  try {
    let URL = `https://api.thedogapi.com/v1/images/searcH?limit=${text.value}&page=${number.value}`
    /*console.log(URL)
    console.log(text)
    console.log(number)*/
    let response = await fetch(URL)
    // manejo de los errores
    manejoErrores(response)
    console.log(response)
    let json = await response.json()
    console.log(json);
    /*console.log(json.length)*/
    if (json.length === 0) {
      parrafo.innerHTML = 'cargando'
    }
    json.forEach(el => {
      const elementDiv = {
        presentation: d.createElement('img'),
        texto: d.createElement('p'),
        breeds: d.createElement('h4')
      }
      // se dejan elementos por si el json trae mas información, pero no todos traen info completa, revisar ese tema
      const { presentation, texto, breeds } = elementDiv;
      // presentation - img
      presentation.setAttribute('class', 'img-perritos')
      containerApi.appendChild(presentation)
      presentation.src = el.url
      // texto
    })
  }
  catch (err) {
    location.href = 'error.html'
    parrafo.textContent = `Status ${err.status} ok : ${err.ok}` || 'Ha ocurrido un error'
    /*alert(`Status ${err.status} ok : ${err.ok}`)*/
  }

}
// ejecución de carga por primera vez
d.addEventListener('DOMContentLoaded', () => getData(), false)
// ejecución de recarga para traer otro perrito
form.addEventListener('submit', e => {
  e.preventDefault()
  getData()
})


/*setTimeout(() => containerApi.removeChild(image),4000)*/
/*d.addEventListener('click', e => {
  if (e.target === DOMElements.btnAleatorio) {
    const {containerApi} = DOMElements;
    containerApi.removeChild(image)
  }
})*/