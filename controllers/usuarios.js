const Usuario = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
  const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
            .find({}, 'nombre email role google img')
            .skip( desde )
            .limit( 5 ),

        Usuario.countDocuments()
    ]);


    res.json({
        ok: true,
        usuarios,
        total
    });

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
    //generar jwt
    const token= await generarJWT(usuario.id);
    //guardar usuario
    await usuario.save();
    res.status(201).json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};

const updateUsuario = async (req, res) => {
  //TODO: validar token y comprobar si es el usuario correcto
  const uid = req.params.id;
  try {
    const existedb = await Usuario.findById(uid);
    if (!existedb) {
      return res.json({ msg: "No existe el usuario con ese id" });
    }
    const { password, google, email, ...campos } = req.body;
    if (existedb.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.json({ msg: "Ya existe un usuario con ese email" });
      }
    }
    //actualizaciones
    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });
  
    res.json({
      msg: "updateUsuario",
      usuarioActualizado: usuarioActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};


const deleteUsuario= async(req, res) => {	
  const uid = req.params.id;
  try {
    const existedb = await Usuario.findById(uid);
    if (!existedb) {
      return res.json({ msg: "No existe el usuario con ese id" });
    }
    await Usuario.findByIdAndDelete(uid);
    res.json({"msg": "el usuario ha sido eliminado"});
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
}

module.exports = {
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
