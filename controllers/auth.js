
const bcrypt = require("bcryptjs");
const Usuario = require("../models/usuarios");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res) => {

    const {email, password}=req.body;
  try {
    //verificar email
    const usuarioDB= await Usuario.findOne({email});
    if(!usuarioDB){return res.status(404).json({msg:'Email no encontrado'})}
    //Verificar contraseña
    const validPassword= bcrypt.compareSync(password, usuarioDB.password);
    if(!validPassword){return res.status(400).json({msg:'Contraseña no valida'})}

    //Generar el token
    const token= await generarJWT(usuarioDB.id, usuarioDB.name);
    res.json({
        msg:'Login ok',
        token
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en el servidor",
    });
  }
};


module.exports = {
    login
};