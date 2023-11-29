import dotenv from "dotenv";
dotenv.config();

//Con las llaves, estoy creando un objeto.
const db = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DIALECT,
};



//El default se usa cuando tengo que importar uno solo, me permite ponerle un nombre diferente afuera.
// Opcionalmente, puedo usar las llaves sea para uno o para más de una método.

export default db;
