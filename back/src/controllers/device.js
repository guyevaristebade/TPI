import { deviceModel } from "../models/index.js";
import mongoose, { sanitizeFilter }  from "mongoose";
import { lineRegex } from "../helpers/index.js";


export const createDevice = async (deviceData) => {
  let response = {
    status : 200
  }

  try {

    if (!lineRegex.test(deviceData.line)) {
      response.status = 400;
      response.error = "Invalid phone number format for line"
      return response;
    }

    const existingDevice = await deviceModel.findOne(sanitizeFilter({ line: deviceData.line })).exec();

    if (existingDevice) {
      response.status = 400;
      response.error = "A device with the same line already exists"
      return response;
    }

    const device = new deviceModel({
      line: deviceData.line,
      brand: deviceData.brand,
      date: deviceData.date,
      site_id: deviceData.site_id,
      state: deviceData.state
    });

    await device.save();

    response.data = device;
  } catch (error) {
    response.status = 500;
    response.error = "Internal Server error "
  }

  return response;
};



export const deleteDevice = async (deviceId) => {
  let response = {
    status: 200
  };

  try {
    const deletedDevice = await deviceModel.findByIdAndDelete(sanitizeFilter(deviceId));

    if (!deletedDevice) {
      response.status = 404;
      response.error = 'Device not found'
      return response;
    }

    response.data = deletedDevice

  } catch (error) {
    response.error = "Internal server error => " + error.message;
    response.status = 500;
  }

  return response;
};

export const getDevices = async () => {

  let response = {
    status: 200
  };


  try{
    const devices = await deviceModel.find().populate("site_id");

    if(!devices){
      response.status = 404;
      response.error = 'Device not found';
      return response;
    }

    response.data = devices;

  } catch (error) {
    response.error = "Internal server error => " + error.message;
    response.status = 500;
  }

  return response;
}


export const updateDevice = async (id, deviceData) => {

  let response = {
    status: 200
  };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    response.error = "Invalid or missing device ID";
    response.status = 400;
    return response;
  }

  try {

    const updatedDevice = await deviceModel.findByIdAndUpdate(
      id,
      deviceData,
      { new: true }
    );

    if (!updatedDevice) {
      response.error = "Bad request device not updated";
      response.status = 400;
      return response;
    }

    response.data = updatedDevice;

  } catch (error) {
    response.error = "Internal server error => " + error.message;
    response.status = 500;
  }

  return response;
};
