

class Tarea{
    constructor(id,tarea){
        this.id = id;
        this.tarea = tarea;
    }
}

let arrTarea = cargarDesdeLocalStorage();
let editTarea = null;

const formulario = document.querySelector('#formulario');
const inputTarea = document.querySelector('#tarea');
const btnAgregar = document.querySelector('#btnAgregar');
const tabla = document.querySelector('#tabla tbody');

formulario.addEventListener('submit',function(e){
    e.preventDefault();

    let tarea = inputTarea.value.trim();

    if(!tarea){
        alert('Ingresar tarea');
        return;
    }

    if(editTarea !== null){
        let reg = arrTarea.find(r => r.id === editTarea);
        if(reg){
            reg.tarea = inputTarea.value;
        }
        if(btnAgregar) btnAgregar.textContent = "Agregar";
        editTarea = null;
    }else{
        let id = generadorId();
        let registro = new Tarea(id,tarea);
        arrTarea.push(registro);
    }

    formulario.reset();
    inputTarea.focus();
    mostrarTareas();
    guardarEnLocalStorage();
})

tabla.addEventListener('click',function(e){
    if(e.target.classList.contains('btnModificar')){
        let id = parseInt(e.target.getAttribute('data-id'),10);
        modificarTarea(id);
    }

    if(e.target.classList.contains('btnEliminar')){
        let id = parseInt(e.target.getAttribute('data-id'),10);
        eliminarTarea(id);
    }

})


function mostrarTareas(){
    
    tabla.innerHTML = "";

    arrTarea.forEach(function(arr){
        const tr = document.createElement('TR');
        const td1 = document.createElement('TD');
        const td2 = document.createElement('TD');
        const td3 = document.createElement('TD');
        const btnModificar = document.createElement('BUTTON');
        const btnEliminar = document.createElement('BUTTON');

        td1.textContent = arr.id;
        td2.textContent = arr.tarea

        btnModificar.textContent = "Modificar";
        btnEliminar.textContent = "Eliminar";

        btnModificar.setAttribute('data-id',arr.id);
        btnModificar.classList.add('boton', 'btnModificar');

        btnEliminar.setAttribute('data-id', arr.id);
        btnEliminar.classList.add('boton', 'btnEliminar');
        
        td3.appendChild(btnModificar);
        td3.appendChild(btnEliminar);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tabla.appendChild(tr);


    })

}


function generadorId(){
    return arrTarea.length ? Math.max(...arrTarea.map(r => r.id))+1 :1;
}

function guardarEnLocalStorage(){
    try{
        localStorage.setItem('datos',JSON.stringify(arrTarea));        
    }catch(error){  
        console.error('No se pudo guardar',error.message)
    }
}

function cargarDesdeLocalStorage(){
    try{
        let guardar = localStorage.getItem('datos');
        return  guardar ? JSON.parse(guardar) : [];
    }catch(error){
        console.error('No se pudo cargar',error.message)
        return [];
    }
}


function modificarTarea(id){

    let reg = arrTarea.find(r => r.id === id);
    if(!reg) return;

    inputTarea.value = reg.tarea;
    if(btnAgregar) btnAgregar.textContent = "Modificar";
    editTarea = id;
}

function eliminarTarea(id){
    if(editTarea !== null){
        // editTarea = null;
        alert('no puedes eliminar');
        formulario.reset();
        // if(btnAgregar) btnAgregar.textContent = "Agregar";
        return;
    }
    arrTarea = arrTarea.filter(r => r.id !== id);
    guardarEnLocalStorage();
    mostrarTareas();
}


mostrarTareas();