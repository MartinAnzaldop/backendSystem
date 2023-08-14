const Usuario=require('../models/usuarios');

const getUsuarios = async (req, res) => {
    res.json({
        ok: true,
        msg: "get API",
  });
}

const createUsuario = async (req, res) => {
console.log(req.body);
const {nombre, email, password} = req.body;
const usuario=new Usuario(req.body);
await usuario.save();
}


module.exports = {
    getUsuarios,
    createUsuario,
}