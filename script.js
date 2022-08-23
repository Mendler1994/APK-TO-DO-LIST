const fecha = document.querySelector('#date');
const lista = document.querySelector('#lista');
const sumarTarea = document.querySelector('#input');
const botonEnter = document.querySelector('#boton');
const tachar = document.querySelector('#');
const eliminar = document.querySelector('#');

// Agregar tarea
function agregarTarea (tarea) {
    const elemento =    '<i id="0" class="far fa-circle co" data-="realizado"></i> 
                        '<p class="text">' ${tarea} '</p>'
                        '<i id="0" class="fas fa-trash de" data-="eliminado"></i>'

    lista.insertAdjacentHTML("beforeend",elemento)
}

