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
      /*$template.querySelector('.addDog').textContent = 'add dog to favorites'*/
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

// event to get favorites dogs
d.addEventListener('DOMContentLoaded', async function (e) {
  const { $templateFavs, containerFavs, secondFragment } = DOMElements;
    try {
      // pendiente de modificar esta url para hacerla dinamica
      let URL_FAV = 'https://api.thedogapi.com/v1/favourites?&api_key=ce0e512f-9d50-41e8-9c8b-216fb89807a8'
      let peticion = await fetch(URL_FAV);
      console.log(peticion)
      let data = await peticion.json()
      console.log(data)
      data.forEach((el, i) => {
        let button = $templateFavs.querySelector('.delete')
        $templateFavs.querySelector('.favorites').src = el.image.url
        button.dataset.id = el.id
        let Clone = d.importNode($templateFavs, true)
        secondFragment.appendChild(Clone)
      })
      containerFavs.appendChild(secondFragment)
    } catch (err) {

    }
  }
)


// event to post to favorite dogs
d.addEventListener('click', async function (e) {

  if (e.target.matches('.addDog')) {
    try {
      // pendiente de modificar esta url para hacerla dinamica
      let URL_POST_FAV = 'https://api.thedogapi.com/v1/favourites'
       let options = {
         method: 'POST',
         headers: {
           "Content-Type": "application/json; charset=utf-8",
           "x-api-key": "ce0e512f-9d50-41e8-9c8b-216fb89807a8"
         },
         body: JSON.stringify({
           image_id : e.target.dataset.id ,
         }),
       };
      let peticion = await fetch(URL_POST_FAV,options);
      console.log(peticion)
      let data = await peticion.json();
      console.log(data)
      location.reload()
    } catch (err) {

    }
  }
})


// event to delete a favorite dog
d.addEventListener('click', e => {
  if(e.target.matches('.delete')){
    let favourite_id = e.target.dataset.id
    let URL_DEL_FAV = 'https://api.thedogapi.com/v1/favourites/'
    try {
      let options = {
        method: "DELETE",
        headers: {
          "x-api-key": "ce0e512f-9d50-41e8-9c8b-216fb89807a8"
        }
      };
      let isDelete = confirm("Are you sure you want to delete");
      if (isDelete) {
        fetch(`${URL_DEL_FAV}${favourite_id}` , options);
        e.path[2].style.display = 'none'
      }
    } catch (err) {}
  }
})


// ejecución de carga por primera vez
d.addEventListener('DOMContentLoaded', () => getData(), false)
// ejecución de recarga para traer otro perrito
form.addEventListener('submit', e => {
  e.preventDefault()
  getData()
})
