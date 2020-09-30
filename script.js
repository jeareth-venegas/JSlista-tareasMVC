//LISTA DE TAREAS


//29 sept 2020

//
//MODELO
//

//lista de tareas (array)
let tareas = []
const datosLocalStorage = localStorage.getItem('tareas');

if(datosLocalStorage !== null){
    tareas = JSON.parse(datosLocalStorage);
}


//se añade un contador de tareas para asignar un id único a cada tarea
let contador = 0;

function addTarea(nombreTarea, fechaTarea, completoTarea){
    //crea objeto que crea una nueva tarea

    //arreglo de las tareas[] con el objeto
    const miTarea = {
        id: contador,
        nombre: nombreTarea,
        completo: completoTarea,
        fecha: fechaTarea,
    };

    //agrega objeto al array
    tareas.push(miTarea); //sin comillas

    contador++;
// Se despliega la nueva tarea en el DOM
    appendTaskDOM(miTarea);

    localStorage.setItem('tareas', JSON.stringify(tareas));

    console.log(tareas);

// localStorage no almacena objetos complejos
//solo numeros y strings
//localStorage.setItem('tareas', tareas); hay que pasar el tareas  a un string. "serializar" con json

}

//
//VISTA
//
const lista = document.getElementById('task-list');

function appendTaskDOM(tarea){
// se crea HTML extra para que se pueda modificar cada que el usuario
//interactúe con la lista de tarea

//CREACION DE LA NUEVA TAREA EN EL DOM
    //item de lista
    const item = document.createElement('li');
    item.className = 'list-item';

    //checkbox para la lista de tareas
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type','checkbox');
    checkbox.setAttribute('id',`tarea-${tarea.id}`);
    
    //se añade el elemento label

    const label = document.createElement('label');
    label.setAttribute('for',`tarea-${tarea.id}`);
    label.innerHTML = `${tarea.nombre} - ${tarea.fecha}`;


    //meter el label, input al li

    item.appendChild(checkbox);
    item.appendChild(label);
    lista.appendChild(item);
}

for (let i = 0; i < tareas.length; i++){
    appendTaskDOM(tareas[i]);
}

//
//CONTROLADOR
//

//form para añadir tareas
const formulario = document.getElementById('new-task-form');

//function

formulario.addEventListener('submit',(event)=> {

//se cancela el default del formulario

    event.preventDefault(); //evita que la pagina se refresque sin que se llene el formulario

//Agregs nuevo ítem(modelo)
    const tarea = addTarea(formulario.elements[0].value, formulario.elements[1].value, false);
    
    
    //resetear el formulario
    formulario.elements[0].value = '';
})

