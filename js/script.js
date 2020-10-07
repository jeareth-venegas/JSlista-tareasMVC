//LISTA DE TAREAS

//
//MODELO
//


//se añade un contador de tareas para asignar un id único a cada tarea
let contador = 0;
//lista de tareas (array)
let tareas = []
const datosLocalStorage = localStorage.getItem('tareas');

if(datosLocalStorage){
    tareas = JSON.parse(datosLocalStorage);
}

// Se lee el contador de tareas del localStorage.
const contadorLocalStorage = localStorage.getItem('contador');
console.log(contadorLocalStorage);

console.log(tareas);

if (contadorLocalStorage) {
    contador = parseInt(contadorLocalStorage);
}

// addTarea(): Agrega una tarea en la lista.
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

//----- FUNCION DELETE -----//
    const buttonDelete = document.createElement('button');
    buttonDelete.className = 'task-list__delete';
    buttonDelete.setAttribute('id', `delete-${tarea.id}`);
    buttonDelete.innerHTML = 'Borrar';


    let taskList = document.getElementById('taks-list');
    let trash = getElementByName(buttonDelete);

    for (let i = 0; i < taskList.children.length; i++) {
        trash[i].addEventListener('click', function(){
            let taskList = document.getElementById('taks-list');
            taskList.removeChild(list.childNodes[0]);
        });
    }

    //let trash = getElementByName(buttonDelete);

    //for(let i = 0; trash.length; i++){
    //    trash[i].addEventListener('click', function())
    //}

//----------

    //meter el label, input al li

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(buttonDelete);
    lista.appendChild(item);
}

// Inicialización de la lista del DOM, a partir de las tareas existentes.
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

//Agrega nuevo ítem(modelo)
    const tarea = addTarea(formulario.elements[0].value, formulario.elements[1].value, false);
    
    
    //resetear el formulario
    formulario.elements[0].value = '';
    formulario.elements[1].value = '';
})

