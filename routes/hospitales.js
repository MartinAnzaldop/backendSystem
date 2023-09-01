const { Router } = require("express");
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
} = require("../controllers/hospitales");
const router = Router();

//routas /api/usuarios
router.get("/", getHospitales);
router.post(
  "/",
  [
    validarJWT,
    body("nombre", "El nombre del hospital es necesario").not().isEmpty(),
    validarCampos,
  ],
  createHospital
);
router.put("/:id", updateHospital);
router.delete("/:id", deleteHospital);

module.exports = router;
