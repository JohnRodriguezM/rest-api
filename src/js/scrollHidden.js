const $header = document.querySelector('footer');
console.log($header)

 // ? la variable que almacena la ubicacion es una variable que tiene un valor constante:
let ubicacion = window.pageYOffset
//por ejemplo el valor de ubicacion en inicio sería 0
console.log(ubicacion)


window.addEventListener('scroll', () => {
    /* por el contrario la varible que se declara dentro de la funcion va mutando su valor en medidad que se ejecute la funcion del evento scroll  por ej: 228*/
    let desplazamiento = window.pageYOffset + 2;
    console.log(desplazamiento)
    // cuando entra al condicional se comparan los valores: el valor de ubicacion es 0 mientras que el de desplazamiento puede ser de 228, por ende es falso y pasa al else
    if (ubicacion >= desplazamiento) {
        $header.style.bottom = '0'
    }
    // el else es true, por ende el "header se esconde 100px, cuando hago scroll"
    else {
        $header.style.bottom = '-200px'
    }
    // luego se retorna el valor de ubicacion y se iguala al de desplazamiento


    // entonces si ubicacion valia 0, queda valiendo 228
    return ubicacion = desplazamiento;
});



window.addEventListener('DOMContentLoaded', () => {
  if(ubicacion === 0){
    $header.style.bottom = '-9999px';
    setTimeout(() => {
      $header.style.bottom = '0';},2500)
}
})