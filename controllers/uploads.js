const {v4: uuidv4} = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');
const fileUpload = async (req, res = response) => {
  const tipo = req.params.tipo;
  const id = req.params.id;

  //validar tipo
  const tiposValidos = ["usuarios", "medicos", "hospitales"];
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "No es un medico, usuario u hospital (tipo)",
    });
  }
  //validacion de un archivo en la peticion
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No hay ningun archivo",
    });
  }

  //procesar la imagen
  const file = req.files.imagen;
  const nombreCortado = file.name.split('.'); //nombre del archivo
  const extencionArchivo = nombreCortado[nombreCortado.length - 1];

  //validar extencion
  const extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
  if(!extencionesValidas.includes(extencionArchivo)){
    return res.status(400).json({
      ok: false,
      msg: "No es una extencion permitida",
    });
  }
    //generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //mover la imagen
    file.mv(path, (err)=>{
        if (err){
          return res.json({
            ok: false,
            msg: "Error al mover la imagen",
            });
    }
        //actualizar base de datos
        actualizarImagen(tipo, id, nombreArchivo);
        res.json({
          ok: true,
          msg: "Archivo subido",
          nombreArchivo
        });
        
});
};

module.exports = {
  fileUpload,
};
