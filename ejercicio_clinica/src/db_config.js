//importamos el createPool
import {createPool} from 'mysql2/promise';

//creamos el pool y lo exportamos
export const pool = createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "clinica"
});