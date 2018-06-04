const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de una tarea por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    desc: 'Marca uan tarea como completada'
}

const argv = require('yargs')
    .command('crear', 'Crear nueva tarea por hacer (TODO).', {descripcion})
    .command('listar', 'Muestra todas las tareas por hacer (TODO).', {})
    .command('actualizar', 'Actualiza una tarea en especifico.', {descripcion, completado})
    .command('borrar', 'Eliminar una tarea especificada por el usuario', {descripcion})
    .help()
    .argv;
    
module.exports = {
    argv
}