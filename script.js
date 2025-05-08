const date = document.querySelector('#date');
const sumarTarea = document.querySelector('#enviar');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');

//Fecha
const fecha = new Date ()
date.innerHTML = fecha.toLocaleDateString('es-AR',{weekday: 'long', month: 'short', day:'numeric'})

// Agregar tarea
function agregarTarea(tarea) {
    const realizado = ""; // ícono sin check
    const line = ""; // sin tachado
    const id = Date.now(); // genera un ID único

    const elemento = `
        <li id="elemento">
            <i class="far fa-circle co" data-action="realizado" id="${id}"></i>
            <p class="text ${line}">${tarea}</p>
            <i class="fas fa-trash de" data-action="eliminado" id="${id}"></i> 
        </li>
    `;
    lista.insertAdjacentHTML("beforeend", elemento);
}

sumarTarea.addEventListener('click',()=> {
    const tarea = input.value
    if(tarea) {
        agregarTarea(tarea)
    }
    input.value=''
})

// // Marcar tareas como realizadas 

// function tareaRealizada(elemento) {
//     elemento.classList.toggle('fa-check-circle');
//     elemento.classList.toggle('fa-circle');
//     elemento.parentNode.querySelector('p').classList.toggle('line-trough');
// }

// //Eliminar tareas

// function tareaEliminada(elemento) {
//     elemento.parentNode.remove();
// }

//Otra opcion para TACHAR y ELIMINAR tareas

// lista.addEventListener('click', function(e) {
//     const elemento = e.target;
//     const accion = elemento.dataset.action;

//     if (accion === 'realizado') {
//         elemento.classList.toggle('fa-check-circle');
//         elemento.classList.toggle('fa-circle');
//         elemento.parentNode.querySelector('p').classList.toggle('line-through');
//     }

//     if (accion === 'eliminado') {
//         elemento.parentNode.remove();
//     }
// });


//localStorage

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

function renderTareas() {
    lista.innerHTML = "";
    tareas.forEach(tarea => {
        const icono = tarea.realizada ? "fa-check-circle" : "fa-circle";
        const line = tarea.realizada ? "line-trough" : "";
        const elemento = `
            <li>
                <i class="far ${icono} co" data-action="realizado" id="${tarea.id}"></i>
                <p class="text ${line}">${tarea.nombre}</p>
                <i class="fas fa-trash de" data-action="eliminado" id="${tarea.id}"></i> 
            </li>
        `;
        lista.insertAdjacentHTML("beforeend", elemento);
    });
}

function agregarTarea(nombre) {
    const nuevaTarea = {
        id: Date.now(),
        nombre,
        realizada: false
    };
    tareas.push(nuevaTarea);
    guardarTareas();
    renderTareas();
}

sumarTarea.addEventListener('click', () => {
    const tarea = input.value.trim();
    if (tarea) {
        agregarTarea(tarea);
        input.value = '';
    }
});

lista.addEventListener('click', function(e) {
    const elemento = e.target;
    const accion = elemento.dataset.action;
    const id = parseInt(elemento.id);

    if (accion === 'realizado') {
        tareas = tareas.map(tarea => {
            if (tarea.id === id) tarea.realizada = !tarea.realizada;
            return tarea;
        });
    }

    if (accion === 'eliminado') {
        tareas = tareas.filter(tarea => tarea.id !== id);
    }

    guardarTareas();
    renderTareas();
});

renderTareas();
