//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarro = [];//este es el que va a ir cambiando este es la lista del carrito
//para hacer el carrito se creo un html con una tabla en la navbar 



//podemos creaar una funcion donde se registren o carguen todos los events listenesrs
cargarEventListener();
function cargarEventListener(){

    listaCursos.addEventListener('click', agregarCurso);


    //elimina cursos de carrito
    carrito.addEventListener('click', eliminarCurso);

    //vaciar carrito
    btnVaciarCarrito.addEventListener('click', (e) => {
        e.preventDefault()
        articulosCarro = [];
        limpiarHTML();
    });

}

function agregarCurso(e){
e.preventDefault();
   if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado); 
}
}

function eliminarCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso'))
    {
     const cursoId= e.target.getAttribute('data-id');
     //eliminar curso por el data-id
    articulosCarro = articulosCarro.filter(curso => curso.id !== cursoId);
    carritoHTML();
    }
}



//leer los datos de elementos arriba del boton de agregar curso

function leerDatosCursos(curso){
//curso trae toda la card
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1

    }   
    
    //revisar si ya esta este articulo
    const existe = articulosCarro.some( curso => curso.id === infoCurso.id );
    if(existe)
    {
        //actualixamos la cantidad
        const cursos = articulosCarro.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad ++;
                return curso;//se regresa el objeto actualizado al array
            }
            else{
                return curso;//se regresan los objetos al nuevo array
            }

        })
        articulosCarro = [...cursos];//una copia del array de cursos


    }
    else{
        //agregar elementos al arreglo del carrito

        articulosCarro =[...articulosCarro, infoCurso];//aqui vamos metiendo cada curso que se precione al carrito
    }
   
    //lo hacemos aca porque aca es donde estamos extrayendo el articulo que se dio click
    console.log(articulosCarro)
    carritoHTML()

}

//muestra el carrito de compras en el carrito

function carritoHTML(){
//limpiar el html 
limpiarHTML();
//crear el html

        articulosCarro.forEach(curso => {


            const row = document.createElement('tr');
            const {imagen, titulo, cantidad, precio,id} = curso;//en la medida se puede hacer destructing, hacerlo
            
            
            row.innerHTML =`
            <td>
                <img src="${imagen}">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}">X</a>
            </td>
            
            
            `;

            //agregar al carrito del tbody
            contenedorCarrito.appendChild(row);
        });
}

//eliminar los cursos del HTML
function limpiarHTML(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

    }
