const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, "nombre email password google");
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const createUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email: email });
    if (existeEmail) {
      return res.status(500).json({
        ok: false,
        mgs: "El correo ya esta registrado",
      });
    }

    const usuario = new Usuario(req.body);
    //enciptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //guardar usuario
    await usuario.save();
    res.status(201).json({
      usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const updateUsuario = async (req, res) => { 
  
}

module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario
};
