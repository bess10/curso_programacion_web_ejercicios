const argv = require('yargs')
.option('n', {
    alias: 'nombre',
    //demandOption: true,
    default: 'false',
    describe: 'Nombre del alumno',
    type: 'string'
})
.option('c', {
    alias: 'calificacion',
    //demandOption: false,
    default: 'false',
    describe: 'Calificación del alumno',
    type: 'number'
})
.option('p', {
    alias: 'ponfalta',
    //demandOption: false,
    default: 'false',
    describe: 'Fecha de falta de asistencia del alumno',
    type: 'string'
})
.option('q', {
    alias: 'quitafalta',
    //demandOption: true,
    default: 'false',
    describe: 'Quitar falta de asistencia del alumno',
    type: 'string'
})
.option('i', {
    alias: 'informe',
    //demandOption: true,
    default: 'true',
    describe: 'Crear fichero txt con información de alumnos',
    type: 'boolean'
})
.option('e', {
    alias: 'expediente',
    //demandOption: true,
    default: 'true',
    describe: 'Crear fichero json con información de alumnos',
    type: 'boolean'
})
.argv;

module.exports = argv;