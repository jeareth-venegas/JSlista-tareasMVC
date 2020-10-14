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

    function taskStatus (taskId, status){

        for (let i = 0; i < tareas.length; i++){
            if (tareas[i].id === taskId){
                tareas[i].completo = status;

                break; //funciona en lazos: while y for. Hasta que se encuentra algo 
                //se sale y deja de buscar en el lazo
            }
        }
    }


    function deleteTask (taskId){
        for (let i = 0; i < tareas.length; i++){
            if (tareas[i].id === taskId){
                tareas.splice(i, 1);
                break;
            }
        }
    }
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
    checkbox.checked = tarea.completo;
    //se añade el elemento label

    const label = document.createElement('label');
    label.setAttribute('for',`tarea-${tarea.id}`);
    label.innerHTML = `${tarea.nombre} - ${tarea.fecha}`;

    //meter el label, input al li

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(buttonDelete);
    lista.appendChild(item);

    //MANEJADOR DE EVENTOS PARA CHECKBOX

    checkbox.addEventListener('click',(event)=>{
    const complete = event.currentTarget.checked;
    const idDom =event.currentTarget.getAttribute('id');
    const id = parseInt(idDom.substring(6));
    console.log(id);
    taskStatus(id, complete);
    });
}


    //MANEJADOR DE EVENTOS PARA DELETE-----

    buttonDelete.addEventListener('click',(event)=>{
        const idDom =event.currentTarget.getAttribute('id');
        console.log(idDom);
        const id = parseInt(idDom.substring(7));
        console.log(id);
        deleteTask(id);
        event.currentTarget.parentNode.remove();
    })


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

