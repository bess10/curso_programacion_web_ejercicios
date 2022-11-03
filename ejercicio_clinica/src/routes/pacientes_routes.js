import {Router} from 'express';//importamos el Router de express
import { deletePaciente, generoPacientes, getPaciente, insertPaciente, ordenarPacientes, selectPacientes, updatePaciente } from '../controllers/pacientes_controllers.js';

const router = Router();

//para mostrar pacientes
router.get("/api/pacientes", selectPacientes);
//para obtener paciente por nif
router.get("/api/pacientes/:nif", getPaciente);
//para agregar paciente
router.post("/api/pacientes", insertPaciente);
//para modificar valores de pacientes
router.patch("/api/pacientes/:nif", updatePaciente);
//para borrar paiente
router.delete("/api/pacientes/:nif", deletePaciente);
//para obtener numero de pacientes femeninas y masculinos
router.get("/api/genero", generoPacientes);
//para obtener pacientes ordenados por apellido
router.get("/api/apellidos", ordenarPacientes);

//se exporta el router por defecto
export default router;