const Usuario = require("../models/usuarios");
const Hospital = require("../models/hospitales");
const Medico = require("../models/medicos");

const getTodo = async (req, res) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.json({
    msg: busqueda,
    usuarios: usuarios,
    medicos: medicos,
    hospitales: hospitales,
  });
}; 

const getDocumentosColeccion = async (req, res) => {
  const tabla = req.params.tabla;
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i");
  
  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img").populate("hospital", "nombre img");
      break; 
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate("usuario", "nombre img");

      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex });

      break;
    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser usuarios/medicos/hospitales",
      });
  }
  res.json({
    ok: true,
    data,
  });
};

module.exports = {
  getTodo,
  getDocumentosColeccion,
};
