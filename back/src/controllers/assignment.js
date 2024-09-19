import {isValidObjectId} from "mongoose";
import {Assignment, Device, History, Site} from "../models/index.js";


export const assignDevice = async (deviceId, siteId) =>{
  let response ={
    status : 201,
    success : true
  }


  try {
    if(!isValidObjectId(deviceId) || !isValidObjectId(siteId)){
      response.status = 400;
      response.success = false;
      response.msg = 'Identifiant invalide ';
      return response;
    }

    const device = await Device.findById(deviceId);
    if(device.state === 'Attribué'){
      response.status = 400;
      response.success = false;
      response.msg = 'Cet appareil est déjà attribué ';
      return response;
    }


    const site = await Site.findById(siteId);

    if(!device) {
      response.status = 400;
      response.success = false
      response.msg = 'Appareil introuvable';
      return response;
    }

    if(device.state === "Assigné"){
      response.status = 400;
      response.success = false
      response.msg = 'Cette appareil est déjà assigné à un site';
      return response;
    }

    const assignment = new Assignment({
      device: deviceId,
      site: siteId
    })

    site.devices.push(deviceId)

    const history = new History({
      device: deviceId,
      site: siteId,
      action : "Attribué"
    })

    await Device.findByIdAndUpdate(deviceId, {
      state : "Attribué"
    },{ new : true})

    await assignment.save();
    await history.save();
    await site.save();

    response.msg = "Appareil Attribué avec succès"

  } catch (error) {
    response.msg = `Internal server Error : ${error.message}`;
    response.success = false
    response.status = 500;
  }
  return response;
}

// TODO trouver de mettre l'historique
export const unassignDevice = async (deviceId, siteId) =>{
  let response ={
    status : 201,
    success : true
  }


  try{

    if(!isValidObjectId(deviceId)){
      response.status = 400;
      response.success = false;
      response.msg = 'Identifiant invalide';
      return response;
    }
    const assignment = await Assignment.findOne({ device : deviceId})
    if(!assignment){
      response.status = 404;
      response.success = false;
      response.msg = 'Cette requête a déjà été traitée';
      return response;
    }

    const device = await Device.findById(deviceId);
    const site = await Site.findById(siteId);

    site.devices = site.devices.filter((el) => el != deviceId)

    if(!device ) {
      response.status = 404;
      response.success = false
      response.msg = 'Appareil introuvable';
      return response;
    }

    const history = new History({
      device: deviceId,
      site: siteId,
      action : "Désattribué"
    })

    await Assignment.findOneAndDelete({ device : deviceId })
    await Device.findByIdAndUpdate(deviceId, {
      state : 'Disponible'
    })

    await site.save();
    await history.save();
    response.msg = "Device Libéré avec succès"

  } catch (error) {
    response.msg = `Internal server Error : ${error.message}`;
    response.status = 500;
  }
  return response;
}

export const getDeviceAssigned = async () =>{

  let response ={
    status : 201,
    success : true
  }

  try {
    const assignments = await Assignment.find().populate("device").populate("site");
    response.data = assignments
  } catch (error) {
    response.msg = `Internal server Error : ${error.message}`;
    response.status = 500;
  }
  return response;
}

export const deleteAssignments = async () => {
  let response = {
    status: 201,
    success: true,
  };

  try {
    // Récupère toutes les attributions
    const assignments = await Assignment.find();

    // Crée un ensemble pour stocker les IDs des appareils déjà mis à jour
    const updatedDevices = new Set();

    // Utilise une boucle for...of pour traiter chaque attribution de manière asynchrone
    for (const assignment of assignments) {
      // Vérifie si l'appareil a déjà été mis à jour
      const device = await Device.findById(assignment.device);
      const site = await Site.findById(assignment.site)
      // Si l'appareil existe et n'a pas encore été mis à jour
      if (device) {
        device.state = "Disponible";
        await device.save();
      }

      if(site){
        site.devices = site.devices.filter(el => el != assignment.device )
        await site.save();
      }
    }

    // Supprime toutes les attributions
    await Assignment.deleteMany();

    response.msg = "Attributions supprimées avec succès";

  } catch (error) {
    response.msg = `Erreur interne du serveur : ${error.message}`;
    response.success = false;
    response.status = 500;
  }

  return response;
};
