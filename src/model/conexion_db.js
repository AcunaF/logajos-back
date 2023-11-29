import { Sequelize, DataTypes } from "sequelize";
import db from "../config/db_config.js";


// Testear la conexión a la base de datos

async function TestConnection() {
  try {
    await sequelize.authenticate();
    await PuntoLimpio.sync();

    console.log("Connection has been established successfully."); 
  }
   catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// Crea una nueva  instancia a la base de datos
const sequelize = new Sequelize(db.database, db.user, db.password, {
  host: db.host,
  dialect: db.dialect,
  dialectOptions: {
  multipleStatements: true,
  },
  logging: false,
});

//Creo el objeto
const PuntoLimpio = sequelize.define(
  "PuntoLimpio",
  {
    // Model attributes are defined here
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    CUENTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    KILOS: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    FECHA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    USUARIO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "PUNTO_LIMPIO", //Tip:Ponerlo con mayúscula.
    //timestamps : false, //Para que no busque los campos de timestamp
     timestamps: false,
  }
);

export {TestConnection,sequelize,PuntoLimpio}
