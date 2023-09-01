const Medico = require("../models/medicos");


const getMedicos = async (req, res) => {
  try {
    const medicos=await Medico.find().populate('usuario','nombre img').populate('hospital','nombre img');
    res.json({
      medicos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const createMedico = async (req, res) => {
  const uid=req.uid;
  const medico = new Medico({usuario:uid, ...req.body});
  
  try {
   const medicoDB= await medico.save();
   res.json({
    medico: medicoDB,

    
  });
  } catch (error) {
    
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const updateMedico = async (req, res) => {
  try {
    res.json({
        msg: "putHospitales",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const deleteMedico = async (req, res) => {
    try {
        res.json({
            msg: "deleteHospitales",
          });
      } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "Hable con el administrador",
        });
      }
};

module.exports = {
  getMedicos,
  createMedico,
  updateMedico,
  deleteMedico,
};
