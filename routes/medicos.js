const { Router } = require("express");
const { body } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");


const {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
} = require("../controllers/medicos");
const router = Router();

//routas /api/medicos
router.get("/", validarJWT, getMedicos);
router.post("/",  [
  validarJWT,
  body("nombre", "El nombre del medico es necesario").not().isEmpty(),
  body("hospital", "El id del hospital debe ser valido").isMongoId(),
  validarCampos,
], createMedico);
router.put("/:id", updateMedico);
router.delete("/:id", deleteMedico);

module.exports = router;