import {pool} from '../db_config.js';

//creación y exportación de las funciones necesarias

//función para seleccionar todos los pacientes
export const selectPacientes = async(req, res) => {
    try{
        const [result] = await pool.query("SELECT * FROM pacientes");
        res.json(result);
    }catch(err){
        res.status(500).send('Ha habido un error...\nIntentelo más tarde');
    }
}
//Función para obtener paciente por nif
export const getPaciente = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pacientes WHERE nif = ?", [req.params.nif]);
        if(result.affectedRows == 0) return res.send('Paciente no encontrado');
        res.json(result); 
    }catch(err){
        res.send('Registro no encontrado');
    }
}
//Función para agregar paciente 
export const insertPaciente = async(req, res) => {
    const {nif, nombre, apellido, ciudad, fecha_nacimiento, sexo} = req.body;
    try {
        const [result] = await pool.query("INSERT INTO pacientes(nif, nombre, apellido, ciudad, fecha_nacimiento, sexo) VALUES (?, ?, ?, ?, ?, ?)", [nif, nombre, apellido, ciudad, fecha_nacimiento, sexo]);
        res.send('Paciente añadido')
    } catch (err) {
        return res.status(404).send('Ha habido un error...\nintentelo màs tarde');
    }
}
//Función para modificar paciente
export const updatePaciente = async(req, res) => {
    const {nif} = req.params;
    const {nombre, apellido, ciudad, fecha_nacimiento, sexo} = req.body;

    try {
        const [result] = await pool.query("UPDATE pacientes SET nombre = IFNULL(?, nombre), apellido = IFNULL(?, apellido), ciudad = IFNULL(?, ciudad), fecha_nacimiento = IFNULL(?, fecha_nacimiento), sexo = IFNULL(?, sexo) WHERE nif = ?", [nombre, apellido, ciudad, fecha_nacimiento, sexo, nif]);
        if(result.affectedRows == 0) return res.send('no se ha podido actualizar');
        res.send('Paciente actualizado');
    } catch (err) {
        return res.status(404).send('Ha habido un error...\nintentelo màs tarde');
    }
}

//Función para borrar paciente
export const deletePaciente = async(req, res) => {
    const {nif} = req.params;
    try{
        const [result] = await pool.query("DELETE FROM pacientes WHERE nif = ?", [nif])
        if(result.affectedRows == 0) return res.send(`No se ha podido eliminar el paciente ${nif}`);
        res.send('se ha eliminado el paciente');
    }catch(err){
        return res.status(404).send('Ha habido un error...\nintentelo màs tarde');
    }
}
//Función para mostrar cantidad de pacientes hombres y de mujeres
export const generoPacientes = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT COUNT(nif) as sexo FROM pacientes WHERE sexo = 'H' UNION SELECT COUNT(nif) FROM pacientes WHERE sexo = 'M' ");
        res.send(`Hay ${result[1].sexo} mujeres y ${result[0].sexo} hombres`); 
    }catch(err){
        res.status(500).send('Ha habido un error...\nIntentelo más tarde');
    }
}
//Función para odenar pacientes por apellido
export const ordenarPacientes = async(req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM pacientes ORDER BY apellido ASC");
        //const resultOrdenado = result.sort((a,b) => a.apellido - b.apellido);
        res.json(result); 
    }catch(err){
        res.status(500).send('Ha habido un error...\nIntentelo más tarde');
    }
}