const express = require("express");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

//servidor de express
const app = express();
//Conexion a la base de datos
dbConnection();
//cors
app.use(cors());
//lectura y parseo del body
app.use(express.json());

//rutas
app.use("/api/usuarios", require("./routes/usuarios"));

app.listen(process.env.PORT, () => {
  console.log("servidor4 corriendo en puerto: " + process.env.PORT);
});
