'use strict';

import { postDog } from "./peticion.mjs";


const DomData = {
  form: document.getElementById('formUploadCat'),
  inputFile: document.getElementById('uploadCat'),
  btn_file: document.getElementById('submitPhoto')
}
//* destructuring object data
const { form, btn_file,inputFile } = DomData;
inputFile.addEventListener('input', e =>  {
  let archivos = e.target.files;
  if(archivos.length > 0){
    const fileReader = new FileReader();
    console.log(fileReader)
    fileReader.onload = e => {
      document.getElementById('preview').src = e.target.result
      document.getElementById('preview').style.display = 'block'
    }
    fileReader.readAsDataURL(archivos[0])
  }
})

//! manejo de fromData
const uploadDogFormData = async e => {
  // ? si le paso un argumento a la instancia de FromData estoy pasandole todos los valores que vienen ahí dentro al objeto de FromData
  const formD = new FormData(form);
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
  const post = await postDog(data.id)
  console.log('soy el post', post)
  location.reload()
}

// * se llama el evento
btn_file.addEventListener('click',uploadDogFormData)