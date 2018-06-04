const fs = require('fs');
const colors = require('colors/safe');

let listadoTODO = [];

const crear = (descripcion) => {
    cargarDB();
    let todo = {
        descripcion,
        completado: false
    }
    listadoTODO.push(todo);
    guardarDB();
    return todo; // Regresa solo el nuevo registro guardado!!
}

const guardarDB = () => {
    let data = JSON.stringify(listadoTODO); // convierte un objeto en un JSON valido.

    fs.writeFile(`DB/data.json`, data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {
    // Valida si el archivo data.json esta vacio para trabajar con un arreglo vacio.!!
    try {
        listadoTODO = require('../DB/data.json');
    } catch (err) {
        listadoTODO = [];
    }
}

const getListado = () => {
    cargarDB();
    return listadoTODO;

}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoTODO.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoTODO[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar=  (descripcion) => {
    cargarDB();
    /*
    // Forma #1 (Hizo Paho)
    let index = listadoTODO.findIndex(tarea => tarea.descripcion === descripcion);
    if(index >= 0){        
        var x = listadoTODO.splice(index,1); // Elimina el elemento que se encuentre en la posición index.
        guardarDB();
        return true;
    } else {
        return false;
    }*/

    //Forma #2 (Hizo profesor del curso)
    let nuevoListado = listadoTODO.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listadoTODO.length === nuevoListado.length){
        return false;
    } else {
        listadoTODO = nuevoListado;
        guardarDB();
        return true;
    }
    
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}