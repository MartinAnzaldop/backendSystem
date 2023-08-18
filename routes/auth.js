const { Router } = require("express");
const { login } = require("../controllers/auth");
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

//path: /api/auth

const router = Router();

router.post(
  "/",
  [
    body("email", "El email es obligatorio").isEmail(),
    body("password", "El password es obligatorio").not().isEmpty(),
    body("password", "El password debe tener al menos 6 caracteres").isLength({
      min: 6,
    }),validarCampos
  ],
  login
);

module.exports = router;
