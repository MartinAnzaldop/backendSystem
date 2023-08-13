const express = require("express");
const {dbConnection} = require("./database/config");
const cors = require("cors");
require("dotenv").config();

//sercidor de express
const app = express();
dbConnection();
app.use(cors());

//rutas
app.get("/", (req, res) => {
  res.json({
    ok: true,  
    msg: "Hola mundo",
  });
});

app.listen(process.env.PORT, () => {
  console.log("servidor4 corriendo en puerto: "+process.env.PORT);
});
