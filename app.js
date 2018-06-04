const argv = require('./config/yargs').argv;
const colors = require('colors/safe');
const todo = require('./TODO/todo');

let comando = argv._[0]

switch (comando) {
    case 'crear':
        let tarea = todo.crear(argv.descripcion);
        console.log(`Tarea ${tarea.descripcion} ha sido registrada exitosamente.`);
        break;
    case 'listar':
        let listato = todo.getListado();
        let contador = 0;
        if (listato.length > 0) {
            for (let tarea of listato) {
                contador ++;
                console.log(colors.green('============== TO DO =============='));
                console.log(`Tarea: ${tarea.descripcion}`);
                console.log(`Estado: ${tarea.completado}`);
                if(contador == listato.length){
                    console.log(colors.green('=================================='));
                }
            }
        } else {
            console.log(colors.red('No hay información que mostrar'));
        }
        break;

    case 'actualizar':
        if (todo.actualizar(argv.descripcion, argv.completado)) {
            console.log(colors.green('Tarea actualizada con éxito'));
        } else {
            console.log(colors.red('No se encontro tarea para actualizar.'));
        }
        break;
    case 'borrar':
        if(todo.borrar(argv.descripcion)){
            console.log(colors.bgBlue(`Tarea ${argv.descripcion} ha sido eliminada con exito`));
        } else {
            console.log(colors.bgRed(`No se encontró tarea para borrar`));
        }

        break;
    default:
        console.log('Comando no reconocido'.red);
        break;
}