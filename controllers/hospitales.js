const Hospital = require("../models/hospitales");
const bcrypt = require("bcryptjs");

const getHospitales = async (req, res) => {
  try {
      const hospitales= await Hospital.find().populate('usuario','nombre img');
    res.json({
      hospitales
    }); 
  } catch (error) {
    
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const createHospital = async (req, res) => {
  const uid=req.uid;
  const hospital = new Hospital({usuario:uid, ...req.body});
  
  try {
   const hospitalDB= await hospital.save();
   res.json({
    hospital: hospitalDB,
    
  });
  } catch (error) {
    
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const updateHospital = async (req, res) => {
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

const deleteHospital = async (req, res) => {
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
  getHospitales,
  createHospital,
  updateHospital,
  deleteHospital,
};
