'use strict';

import { postDog } from "./peticion.mjs";


const DomData = {
  form: document.getElementById('formUploadCat'),
  inputFile: document.getElementById('uploadCat'),
  btn_file: document.getElementById('submitPhoto')
}
//* destructuring object data
const { form, btn_file } = DomData;


//! manejo de fromData
const uploadCatFormData = async e => {
  // ? si le paso un argumento a la instancia de FromData estoy pasandole todos los valores que vienen ahí dentro al objeto de FromData
  const formD = new FormData(form);
  console.log(formD)
  console.log(formD.get('file'))
  const options = {
    method : 'POST',
    headers : {
      'X-API-KEY': 'ce0e512f-9d50-41e8-9c8b-216fb89807a8'
    },
    body: formD,
  }
  const res = await fetch('https://api.thedogapi.com/v1/images/upload', options)
  console.log('upload',res)
  const data = await res.json()
  console.log('uploaded cat',data)
  postDog(data.id)
  location.reload()
}

// * se llama el evento
btn_file.addEventListener('click',uploadCatFormData)