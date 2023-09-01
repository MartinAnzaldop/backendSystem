const Usuario = require("../models/usuarios");
const Medico = require("../models/medicos");
const Hospital = require("../models/hospitales");
const fs = require("fs");

const borrarImagen = async (path) => {
  if (fs.existsSync(path)) {
    //borrar la imagen anterior
    fs.unlinkSync(path);
  }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
  switch (tipo) {
    case "medicos":
      const medico = await Medico.findById(id);

      if (!medico) {
        console.log("No se encontro un medico por id");
        return false;
      }
      const pathViejo = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathViejo);

      console.log("medico modificado");
      medico.img = nombreArchivo;
      await medico.save();
      return true;
      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);

      if (!hospital) {
        console.log("No se encontro un hospital por id");
        return false;
      }
      const pathViejo2 = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathViejo2);

      
      hospital.img = nombreArchivo;
      await hospital.save();
      return true;
      break;
    case "usuarios":
      const usuario = await Usuario.findById(id);

      if (!usuario) {
        console.log("No se encontro un usuario por id");
        return false;
      }
      const pathViejo3 = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathViejo3);

      
      usuario.img = nombreArchivo;
      await usuario.save();
      return true;
      break;
    default:
      return false;
  }
};

module.exports = {
  actualizarImagen,
};
