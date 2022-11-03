//se importan los modúlos necesarios
import express from 'express';
import routerPacientes from "./routes/pacientes_routes.js"

const app = express();
app.use(express.json());
app.use(routerPacientes);

app.use((req, res) => {
    res.send("no se ha encontrado este recurso");
});
app.listen(3000);