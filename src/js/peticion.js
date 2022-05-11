'use strict';


'use strict'
const d = document;


let number = d.getElementById('numberInput')
let text = d.getElementById('textoInput')
const submit = d.getElementById('submit')
const form = d.getElementById('form')

const DOMElements = {
  containerApi: d.querySelector('.contenedor'),
  containerFavs: d.querySelector('.containerFavorites'),
  btnAleatorio: d.getElementById('aleatorio'),

  fragment: d.createDocumentFragment(),
  secondFragment: d.createDocumentFragment(),
  $template: d.getElementById('crud-template-perritosBasic').content,
  $templateFavs: d.getElementById('crudfavoritos').content,
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
/**/
/*api_key=ce0e512f-9d50-41e8-9c8b-216fb89807a8*/
const getData = async () => {
  const { containerApi, parrafo, $template, fragment } = DOMElements;
  try {
    let URL = `https://api.thedogapi.com/v1/images/search?limit=${text.value}&page=${number.value}&api_key=ce0e512f-9d50-41e8-9c8b-216fb89807a8`
    console.log(URL)
    let response = await fetch(URL)
    // manejo de los errores
    manejoErrores(response)
    console.log(response)
    let json = await response.json()
    console.log(json);
    if (json.length === 0) {
      parrafo.innerHTML = 'cargando'
    }
    json.forEach(el => {

      $template.querySelector('.img-perritos').src = el.url;
      $template.querySelector('.addDog').textContent = 'add dog to favorites'
      $template.querySelector('.addDog').dataset.id = el.id;
      let clone = d.importNode($template, true)
      fragment.appendChild(clone)
    })
    containerApi.appendChild(fragment)
  }
  catch (err) {
    location.href = 'error.html'
  }
}



// event to post to favorites dogs
const { $template, containerApi } = DOMElements;

d.addEventListener('click', async function (e) {
  const { $template, containerApi, $templateFavs, containerFavs,secondFragment } = DOMElements;
  if (e.target.matches('.get-favoritos')) {
    try {
      // pendiente de modificar esta url para hacerla dinamica
      let URL_FAV = 'https://api.thedogapi.com/v1/favourites?limit=2&api_key=ce0e512f-9d50-41e8-9c8b-216fb89807a8'
      /* let options = {
         method: 'POST',
         headers: {
           "Content-type": "application/json;",
           "x-api-key": "ce0e512f-9d50-41e8-9c8b-216fb89807a8"
         },
         data: JSON.stringify({
           "image_id" : d.querySelector('.addDog').dataset.id,
         }),
       };*/
      let peticion = await fetch(URL_FAV);
      console.log(peticion)
      /*console.log(options)*/
      let data = await peticion.json()
      console.log(data)
      data.forEach((el, i) => {
        let button = $templateFavs.querySelector('.deleteFavorites')
        button.textContent = el.id
        let Clone = d.importNode($templateFavs,true)
        secondFragment.appendChild(Clone)
      })
      containerFavs.appendChild(secondFragment)
    } catch (err) {

    }
  }
})



// ejecución de carga por primera vez
d.addEventListener('DOMContentLoaded', () => getData(), false)
// ejecución de recarga para traer otro perrito
form.addEventListener('submit', e => {
  e.preventDefault()
  getData()
})
