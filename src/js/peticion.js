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
    let URL = `https://api.thedogapi.com/v1/images/search?limit=${text.value}&page=${number.value}api_key=ce0e512f-9d50-41e8-9c8b-216fb89807a8`
    console.log(URL)
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
        containerCard: d.createElement('div'),
        presentation: d.createElement('img'),
        texto: d.createElement('p'),
        breeds: d.createElement('h4'),
        addDog:d.createElement('button'),
        deleteDog: d.createElement('button')
      }
      // se dejan elementos por si el json trae mas información, pero no todos traen info completa, revisar ese tema

      const { presentation, addDog, containerCard, texto, breeds,deleteDog } = elementDiv;


      // presentation - img
      containerCard.setAttribute('class','containerDogs')
      containerApi.appendChild(containerCard)
      presentation.setAttribute('class', 'img-perritos')
      presentation.src = el.url


      // boton para añadir perrito a fav
      addDog.setAttribute('class','addDog')
      addDog.textContent = 'Add dog to favorites'


      // boton para eliminar Perritos
      deleteDog.textContent = 'borrar este perrito'
      deleteDog.dataset.id = el.id;
      // codigo para borrar perrito, sirve (pero no se permite acceder a ese método por parte de la API según CORS)
      /*deleteDog.addEventListener('click',async e => {
        if(e.target === deleteDog){
          try{
            let options = {
            method: "DELETE"
          }
          fetch(`https://cdn2.thedogapi.com/images/${e.target.dataset.id}.jpg`,options)
          }catch(error){
            console.error(error)
          }
          
        }
      })*/
      // se agregan ambos elmentos al DOM
      containerCard.append(presentation,addDog,deleteDog)
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