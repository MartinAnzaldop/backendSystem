const { Router } = require("express");
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

const {getUsuarios, createUsuario, updateUsuario} = require("../controllers/usuarios");
const router = Router();

//routas /api/usuarios
router.get("/", getUsuarios);
router.post("/", [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    body('password', 'El password debe de ser de 6 caracteres').isLength({min:6, max:12}),
    validarCampos
],createUsuario); 
router.put("/:id", updateUsuario);

module.exports = router;
 