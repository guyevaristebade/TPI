import mongoose from "mongoose";
import {SiteDeviceMapping} from "../models/siteDeviceMapping.js";
import {deviceModel} from "../models/index.js";

export const AttributeDevice = async (site_id, device_id) => {
  let response = {
    status: 200
  };

  if (!mongoose.isValidObjectId(site_id) || !mongoose.isValidObjectId(device_id)) {
    response.status = 400;
    response.error = "ID is Invalid";
    return response;
  }

  try {
    // Vérification si le device est déjà attribué à un site
    const attribution = await SiteDeviceMapping.find({ site_id, device_id });
    if (attribution.length > 0) {
      response.status = 400;
      response.error = "Device already attributed to this site";
      return response;
    }

    // Mise à jour de l'état de l'appareil
    const updatedDevice = await deviceModel.findByIdAndUpdate(device_id, { state: "En service" }, { new: true });
    if (!updatedDevice) {
      response.status = 404;
      response.error = "Device not found";
      return response;
    }

    // Création de l'attribution de l'appareil au site
    const devicemapping = new SiteDeviceMapping({
      site_id,
      device_id,
      state: "En service"
    });

    await devicemapping.save();

    response.data = { devicemapping };
  } catch (e) {
    console.error(e);
    response.status = 500;
    response.error = "Internal Server error => " + e.message;
  }

  return response;
};
