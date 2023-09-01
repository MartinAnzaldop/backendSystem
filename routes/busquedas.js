const { Router } = require("express");
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const {
     getTodo,
     getDocumentosColeccion
} = require("../controllers/busquedas");
const router = Router();

//routas /api/todo
router.get("/:busqueda", validarJWT, getTodo);
router.get("/coleccion/:tabla/:busqueda", validarJWT, getDocumentosColeccion);


module.exports = router;