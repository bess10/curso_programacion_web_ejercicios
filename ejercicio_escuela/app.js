const fs = require('fs');
const argv = require('./config/yargs.js');
// fs.writeFileSync('./config/faltas.json', "[]", 'utf-8');
// fs.writeFileSync('./config/calificaciones.json', "[]", 'utf-8');
//fs.writeFileSync('./config/expedientes.json', '[]', 'utf-8');

const alumnos_json = fs.readFileSync('./config/alumnos.json', 'utf-8');
const alumnosObj = JSON.parse(alumnos_json);

const calificaciones_json = fs.readFileSync('./config/calificaciones.json', 'utf-8');
const calificaciones = JSON.parse(calificaciones_json);

const faltas_json = fs.readFileSync('./config/faltas.json', 'utf-8');
const faltas = JSON.parse(faltas_json);

// const expediente_json = fs.readFileSync('./config/expedientes.json', 'utf-8');
// const expedientes = JSON.parse(expediente_json);

//si se introduce un valor para nombre de alumno se verificar si este existe
if(argv.nombre != 'false'){
    var alumno = verificarAlumno(argv.nombre);
    let nombre = `${alumno.nombre} ${alumno.apellido}`;
    // si se introduce nombre del alumno y una calificacion
    if(argv.calificacion != 'false'){
        //se verifica que el alumno tiene registro de calificaciones
        //se devuelve el elemento que contenga una propiedad con el nombre del alumno 
        var calificacion_alumno = calificaciones.find( calificacion => calificacion.hasOwnProperty(nombre));
        //al no tenerlo se crea uno
        if(calificacion_alumno == undefined){
            crearCalificacion(argv.nombre, argv.calificacion);
        }else{
            //si ya tiene se actualiza la calificacion
            calificacion_alumno[nombre] = argv.calificacion;
            let calificacionActualizada = JSON.stringify(calificaciones);
            //se actualiza el json
            fs.writeFileSync('./config/calificaciones.json', calificacionActualizada, 'utf-8');  
        }
    }
    // si se introduce nombre del alumno y una falta
    if(argv.ponfalta != 'false'){
        //Verificar si existe registro de faltas de asistencia del alumno
        //se devuelve el elemento que contenga una propiedad con el nombre del alumno 
        var faltas_alumno = faltas.find( falta => falta.hasOwnProperty(nombre));
        if(faltas_alumno == undefined){
            //si no hay registro se crea uno
            crearFalta(argv.nombre, argv.ponfalta);
        }else{
            // si hay registro se agrega otra falta
            let fechasArray = faltas_alumno[nombre] ;
            fechasArray.push(argv.ponfalta);
            faltas_alumno[nombre] = fechasArray;
            //se actualiza el json
            let faltaActualizada = JSON.stringify(faltas);
            fs.writeFileSync('./config/faltas.json', faltaActualizada, 'utf-8');
        }
    }
    // si se introduce nombre de alumno y un valor para quitar fecha 
    if(argv.quitafalta != 'false'){
        //Verificar si existe registro de faltas de asistencia del alumno
        // devuelve el elemento que contenga una propiedad con el nombre del alumno 
        var faltas_alumno = faltas.find( falta => falta.hasOwnProperty(nombre));
        if(faltas_alumno == undefined){//si existe registro se avisa del error
            console.log('El alumno no tiene registro de faltas');
        }else{
            // si hay registro se quita la falta especificada
            let fechaArray = faltas_alumno[nombre] ;
            let fechaArrayActu = fechaArray.filter((fecha) => fecha != argv.quitafalta);
            faltas_alumno[nombre] = fechaArrayActu;
            //se actualiza el json
            let falta_Actualizada = JSON.stringify(faltas);
            fs.writeFileSync('./config/faltas.json', falta_Actualizada, 'utf-8');
        }
}
}
// si se introduce la bandera --informe o -i por defecto su valor es true por tanto se llama a la función para crear informe
if(argv.informe == true){
    crearInforme();
}
// si se introduce la bandera --expediente o -e por defecto su valor es true por tanto se llama a la función para crear expediente
if(argv.expediente == true){
    crearExpediente();
}

function crearInforme(){
    //se inicializa la variable que se le concatenara toda la información del alumno
    let texto = "Alumnado del curso";
    //se recorre el array de alumnos
    alumnosObj.map(alumno => {
        //se captura el nombre del alumno
        let nombre = `${alumno.nombre} ${alumno.apellido}`;
        texto += `\n${nombre}`;
            //se verifica que el alumno tiene calificacion 
            //se devuelve el elemento que contenga una propiedad con el nombre del alumno 
            let cal = calificaciones.find( calificacion => calificacion.hasOwnProperty(nombre));
            if(cal == undefined){ // si no existe la calificacion con el nombre del alumno 
                texto += '\ncalificación: pendiente\n';
            }else{ //si existe se concatena a texto el valor de la propiedad con el nombre del alumno
                texto += '\ncalificación: ' + cal[nombre] + '\n';
            }
            let fal = faltas.find( falta => falta.hasOwnProperty(nombre));//se devuelve el elemento que contenga una propiedad con el nombre del alumno 
            if(fal == undefined){
                texto += 'Faltas de asistencia: ninguna\n';
            }else{
                let arrayF = fal[nombre];
                texto += `Faltas de asistencia: ${arrayF.join(', ')}\n`;
            }
    });
    fs.writeFileSync(`informe.txt`, texto, 'utf-8');//se crea un fichero txt con los datos del alumno guardados en la variable texto
}

function crearExpediente(){
    let expedientes = [];
    alumnosObj.map(alumno => { //se recorre el array de alumnos 
        //creacion de objetos: expediente tiene como propiedad el objeto contenido y este tiene como propiedades la calificacion del alumno y un array de faltas 
        let expediente = new Object();
        let contenido = new Object();
        let nombre = `${alumno.nombre} ${alumno.apellido}`;        //se guarda nombre completo del alumno
        expediente[nombre] = contenido;//contenido propiedad de expediente

        //se devuelve el elemento que contenga una propiedad con el nombre del alumno
        let cal = calificaciones.find( calificacion => calificacion.hasOwnProperty(nombre));
        //si existe la calificación se añade pendiente en el atributo calificacion
        if(cal == undefined){
            contenido['calificacion'] = ' pendiente';
        }else{      //en caso de no existir se añade el valor al atributo calificacion
            contenido['calificacion'] = cal[nombre];
        }
        //se devuelve el elemento que contenga una propiedad con el nombre del alumno 
        let fal = faltas.find( falta => falta.hasOwnProperty(nombre));
        if(fal == undefined){       //si existe la falta se guarda ninguna en la propiedad faltas de contenido
            contenido['faltas'] = 'ninguna';
        }else{                     //si existe se guarda el array en la propiedad
            let arrayFal = fal[nombre];
            contenido['faltas'] = arrayFal;
        }
        
        expedientes.push(expediente);        //se agrega el objeto expediente al array de expedientes
    });
    let expedientes_json = JSON.stringify(expedientes);    //se parsea a json el array de expedientes
    fs.writeFileSync('./config/expedientes.json', expedientes_json, 'utf-8');//se crea el archivo json
}

function verificarAlumno(name){//verifica que verifica si existe un alumno por su nombre
    let result = alumnosObj.find(alumno => `${alumno.nombre} ${alumno.apellido}` == name);// se busca el alumno 
    if(result == undefined){
        // si el alumno no existe se termina el programa
        console.log('el alumno no esta en la lista');   
        process.exit();
    } 
    return result;// si existe el alumno se guarda en result y este es el objeto que devuelve
}

function crearCalificacion(name, nota){
    const calificacionObj = new Object();    //se crea el objeto calificación
    calificacionObj[`${name}`] = nota;//con nombre como propiedad y nota como valor de esta
    calificaciones.push(calificacionObj);//se añade el objeto al array de calificaciones

    let calificaciones_json = JSON.stringify(calificaciones);//se parsea a json 
    fs.writeFileSync('./config/calificaciones.json', calificaciones_json, 'utf-8');// se crea el fichero json
}

function crearFalta(name, fecha){
    const faltaAlumno = new Object(); //se crea el objeto
    let fecha_falta = [fecha]; // se crea un array que contendra la fecha que se introduce
    faltaAlumno[`${name}`] = fecha_falta; //se asigna este array a la propiedad del objeto faltaAlumno
    faltas.push(faltaAlumno); // se agrega el objeto al array faltas

    let faltasjson = JSON.stringify(faltas);//se parsea el array 
    fs.writeFileSync('./config/faltas.json', faltasjson, 'utf-8');//y se crea el archivo json 

}








