'use strict'
const d = document;

// !
// ?
// *

// * elementos del DOM
const DOMElements = {
  //* form elements
  text: d.getElementById('textoInput'),
  submit: d.getElementById('submit'),
  form: d.getElementById('form'),
  // * part one
  containerApi: d.querySelector('.contenedor'),
  containerFavs: d.querySelector('.containerFavorites'),
  btnAleatorio: d.getElementById('aleatorio'),
  // * part two
  fragment: d.createDocumentFragment(),
  secondFragment: d.createDocumentFragment(),
  $template: d.getElementById('crud-template-perritosBasic').content,
  $templateFavs: d.getElementById('crudfavoritos').content,
}

// destructuring de elementos
const {
  containerApi,
  parrafo,
  $template,
  fragment,
  $templateFavs,
  containerFavs,
  secondFragment,
  text,
  submit,
  form
} = DOMElements;

const errorHandling = res => {
  if (!res.ok) {
    throw {
      status: res.status,
      ok: res.ok,
    }
  }
}


// main function, getData
const getData = async e => {
  try {
    let URL = `https://api.thedogapi.com/v1/images/search?limit=${text.value || 2}`
    console.log(URL)
    let response = await fetch(URL)
    //* manejo de los errores
    errorHandling(response)
    console.log(response)
    let json = await response.json()
    console.log(json);
    if (json.length === 0) {
      parrafo.innerHTML = 'cargando'
    }
    json.map(el => {
      $template.querySelector('.img-perritos').src = el.url;
      $template.querySelector('.addDog').dataset.id = el.id;
      let clone = d.importNode($template, true)
      fragment.appendChild(clone)
    })
    containerApi.appendChild(fragment)
    form.reset()
  }
  catch (err) {
    console.log(err)
    location.href = 'error.html'
  }
}


// function getFavorites
const getFavorites = async () => {
  try {
    const URL_FAV = 'https://api.thedogapi.com/v1/favourites'
    let peticion = await fetch(URL_FAV,{
      method: 'GET',
      headers: {
        'X-API-KEY': 'ce0e512f-9d50-41e8-9c8b-216fb89807a8'
      }
    });
    // * manejo de errores
    errorHandling(peticion)
    let data = await peticion.json()
    data.map(el => {
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

// * function to post a dog to favorites
export const postDog = async (id) => {
    try {
      const URL_POST_FAV = 'https://api.thedogapi.com/v1/favourites'
      //? se ejecuta funcion que retorna el objeto de opciones
      const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "x-api-key": "ce0e512f-9d50-41e8-9c8b-216fb89807a8"
        },
        body: JSON.stringify({
          image_id: id,
        }),
      };
      let peticion = await fetch(URL_POST_FAV, options);
      // *manejo de errores
      errorHandling(peticion)
      console.log(peticion)
      let data = await peticion.json();
      console.log(data)
      location.reload()
    } catch (err) {}
}

// function to delete a dog of favorites
const deleteDog = e => {
  if (e.target.matches('.delete')) {
    let favourite_id = e.target.dataset.id
    let URL_DEL_FAV = 'https://api.thedogapi.com/v1/favourites/'
    try {
      const options = {
        method: "DELETE",
        headers: {
          "x-api-key": "ce0e512f-9d50-41e8-9c8b-216fb89807a8"
        }
      };
      let isDelete = confirm("Are you sure you want to delete");
      if (isDelete) {
        fetch(`${URL_DEL_FAV}${favourite_id}`, options);
        e.path[2].style.display = 'none'
      }
    } catch (err) { }
  }
}


// ? se hace la declaración de todos los eventos, en orden
// * ejecución de carga por primera vez

d.addEventListener('DOMContentLoaded', getData)

// * ejecución de recarga para traer otro perrito

form.addEventListener('submit', e => {
  e.preventDefault()
  getData()
})

// * event to get favorites dogs
d.addEventListener('DOMContentLoaded', e => {
  getFavorites()
})


// * event to post to favorite dogs
d.addEventListener('click', e => {
  if(e.target.matches('.addDog')){
    postDog(e.target.dataset.id)
  }
})


// * event to delete a favorite dog
d.addEventListener('click', e => deleteDog(e))



// !clousure
const frutera = (frutasActuales) => {
  const frutasSurtido = surtidas => frutasActuales += surtidas
  return frutasSurtido;
}

const almacen = frutera(10)
console.log(almacen(20))
console.log(almacen(20))
console.log(almacen(250))
