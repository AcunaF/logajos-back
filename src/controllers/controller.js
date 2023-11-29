import { sequelize, PuntoLimpio } from "../model/conexion_db.js";
import { QueryTypes } from "sequelize";


// crear registro OK
async function Create(req, res) {
  try {
    const { cuenta, kilos, usuario, fecha } = req.body;

    // Validar que los campos no sea undefined ni null
    if (
      cuenta === undefined ||
      cuenta === null ||
      kilos === undefined ||
      kilos === null ||
      usuario === undefined ||
      usuario === null ||
      fecha === undefined ||
      fecha === null
    ) {
      return res
        .status(400)
        .json({
          error:
            "El campo 'cuenta' es obligatorio y no puede ser undefined ni null.",
        });
    }

    // Realizar la inserción en la base de datos
    const transaction = await sequelize.transaction();

    try {
      // Realizar la inserción utilizando el modelo Sequelize
      const puntoLimpio = await PuntoLimpio.create(
        {
          CUENTA: cuenta,
          KILOS: kilos,
          USUARIO: usuario,
          FECHA: fecha,
        },
        { transaction }
      );

      // Commit la transacción si todo está bien
      await transaction.commit();

      // Verificar si se insertó algún registro
      if (puntoLimpio) {
        return res
          .status(200)
          .json({ message: "Inserción exitosa.", puntoLimpio });
      } else {
        return res
          .status(404)
          .json({ error: "No se pudo insertar el registro." });
      }
    } catch (error) {
      // Rollback la transacción en caso de error
      await transaction.rollback();
      console.error("Error en la inserción:", error);
      return res.status(500).json({ error: "Error interno del servidor." });
    }
  } catch (error) {
    console.error("Error en la validación de la solicitud:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
}

//borrar registro OK
async function Delete(req, res) {
  try {
    const { id } = req.params;

    // Realizar la eliminación en la base de datos
    const [result] = await sequelize.query(
      "DELETE FROM PUNTO_LIMPIO WHERE ID = ?",
      {
        replacements: [id],
      }
    );

    console.log(result);
    // Verificar si se eliminó algún registro
    if (result && result.rowsAffected > 0) {
      return res.status(200).send("Eliminación exitosa.");
    } else {
      return res.status(404).send("No se encontró el registro para eliminar.");
    }
  } catch (error) {
    console.error("Error en la eliminación:", error);
    return res.status(500).send("Error interno del servidor.");
  }
}

//muestras todos los modelos de la base de datos OK
async function GetDataModel(req, res) {
  const result1 = await PuntoLimpio.findAll({ attributes: ["CUENTA"] });
  res.status(200).send(result1);
}
//obtener todos los datos OK
async function GetData(req, res) {
  const result = await sequelize.query("SELECT * FROM PUNTO_LIMPIO ");
  res.status(200).send(result);
}

//obtener datos por id (id, cuentas, kilos, usuario, fecha) OK
async function GetbyId(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await sequelize.query(
      "SELECT * FROM PUNTO_LIMPIO WHERE ID = ?",
      {
        replacements: [id],
        type: QueryTypes.SELECT,
      }
    );

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.error("Error en la consulta:", error);
    return res.status(500).send("Error interno del servidor.");
  }
}




// Actualizar por ID y mostrar resultados por consola ----revisar----revisar----
async function UpdatebyId(req, res) {

  console.log("req.params", req.params);
  console.log("req.body cuenta actualizada", req.body);
  try {
    const { id } = req.params;
    const { cuenta, kilos, fecha, usuario } = req.body;
    
    // Realizar la actualización en la base de datos
    const result = await sequelize.query(
      "UPDATE PUNTO_LIMPIO SET CUENTA = :cuenta, KILOS = :kilos, FECHA = to_date(:fecha,'DD/MM/YYYY'), USUARIO = :usuario WHERE ID = :id",
      {
        replacements: {
          cuenta: cuenta, 
          kilos: kilos, 
          fecha: fecha, 
          usuario: usuario, 
          id: id
        },
        type: QueryTypes.UPDATE,

      }
    );
    ;
    // Verificar si se actualizó algún registro
    if (result && result[1] > 0) {
      return res.status(200).send("Actualización exitosa.");
    } else {
      return res
        .status(404)
        .send("No se encontró el registro para actualizar.");
    }
    

  } catch (error) {
    console.error("Error en la actualización:", error);
    return res.status(500).send("Error interno del servidor.");
  }

}

export { GetData, GetDataModel, GetbyId, UpdatebyId, Create, Delete };
