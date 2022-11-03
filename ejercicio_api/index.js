const express = require('express');//cargar el package ene memoria
const estudiantes = require('./datos/estudiantes.json');

const app = express(); //asiganar la función a una variable

const PUERTO = process.env.PORT || process.argv[2]; //asiganación del puerto de conexión
const dirHTML = 'public';//directorio de fichero index

//obtenemos el directorio de los ficheros estáticos
app.use(express.static(dirHTML));


app.get('/api/estudiantes', (req, res) => {
//1. localhost:3000/api/estudiantes
    
    //3. localhost:3000/api/estudiantes?mayor=5
    if(req.query.mayor){
        const notaEstudiante = req.query.mayor;// se asigna a una variable el valor que retorna el query
        const resultado = estudiantes.filter(estudiante => estudiante.nota == notaEstudiante);//filtrar estudiantes con nota igual a notaEstudiante
        const resultado2 = estudiantes.filter(estudiante => estudiante.nota > notaEstudiante);//filtrar estudiante por nota mayor a notaEstudiante 
 
        console.log(`el numero ${resultado.length} de personas que tienen esta nota(${notaEstudiante}): ${resultado2.length} tienen una nota superior a ${notaEstudiante}.`);
        res.json(resultado);  
    }
    // 4.	Mostrar los estudiantes que ha suspendido ordenados por edad de mayor a menor. La nota de corte se establece por parámetro.  aprobado
    if(req.query.aprobado){
        const notaAprobado = req.query.aprobado;//asignar a variable el valor que retorna el query

        const resultado = estudiantes.filter(estudiante => estudiante.nota < notaAprobado);//filtrar estudiantes que tengan una nota menor qu el valor de notaAprobado
        const resultadoOrdenado2 = resultado.sort((a,b) => a.edad - b.edad);// se ordenan los estudiantes de resultado por edad
        res.json(resultadoOrdenado2);  
    }
    //sort devolvera todos los estudiantes ordenados por apellido 
    const estudiantesOrdenado = estudiantes.sort((a,b) => a.apellidos.localeCompare(b.apellidos));
    res.json(estudiantesOrdenado); //devueleve los estudiantes ordenados por apellido a - z

 });
//5. Mostrar todos los estudiantes ordenados por nota. En caso de empate, también por edad. En ambos casos de mayor a menor.
 app.get('/api/estudiantes/ordenados', (req, res) => {
    const estudiantesOrdenado= estudiantes.sort((a, b) => b.nota - a.nota || b.edad - a.edad);//ordena estudiantes por nota y por edad
    res.send(estudiantesOrdenado); 
    
});
//2.localhost:3000/IreneyNicolas@gmail.com
app.get('/api/estudiantes/:emailParam/', (req, res) => { 
    if(req.params.emailParam){
        const emailEstudiante = req.params.emailParam;//se asigna a una variable el parametro devuelto por el request
  
        const resultado = estudiantes.filter(estudiante => estudiante.email == emailEstudiante);//se filtra el estudiante que contenga el parametro enviado por el request
        if(resultado == undefined){// si existe el estudiante entonces:
            res.send('No existe ningun estudiante con ese email');
        }
        res.send(resultado);
    }  
    
});

app.use((req, res) => {//cuando hay error 404 se redireciona al 404.html
    res.status(404).sendFile('./public/404.html', { root:__dirname});
})

app.listen(PUERTO, () => {console.log(`Escuchando en http://localhost:${PUERTO}...`)});


