import { deviceModel } from "../models/index.js";
import { sanitizeFilter } from "mongoose";

export const createDevice = async (deviceData) => {
  try {
    const existingDevice = await deviceModel.findOne(sanitizeFilter(deviceData.line)).exec()

    if (existingDevice) {
      return { status : 400, message : "A device with the same date already exists" }
    }

    const device = new deviceModel({
      line : deviceData.line,
      brand : deviceData.brand,
      date : deviceData.date,
      site_id : deviceData.site_id,
      state : deviceData.state
    });

    await device.save();

    return { status : 200, message : "Device created successfully" , device}
  } catch (error) {
    console.error(error.message);
    return { status : 500 , message : "Internal Server error" };
  }
};


export const deleteDevice = async (deviceId) => {
  try {
    const deletedDevice = await deviceModel.findByIdAndDelete(sanitizeFilter(deviceId));

    if (!deletedDevice) {
      return { status : 404, message : "Device not found"};
    }

    return { status : 200, message : "Device deleted successfully", deletedDevice};

  } catch (error) {
    console.log(error)
    return { status : 500, message : "Internal Server Error "};
  }
};

export const getAll = async () => {
  try{
    const device = await deviceModel.find().populate("site_id");
    if(!device){
      return { status : 404, message : "Device not found "};
    }

    return { status : 200, devices : device };
  }catch (e) {
    console.log(e.message)
    return { status : 500, message : "Internal Server Error "};
  }
}


export const updateDevice = async (deviceId, deviceData) => {
  try {


    const updatedDevice = await deviceModel.findByIdAndUpdate(
      deviceId,
      {
        line : deviceData.line,
        brand : deviceData.brand,
        date : deviceData.date,
        site_id : deviceData.site_id,
        state : deviceData.state
      },
      { new: true }
    );

    if (!updatedDevice) {
      return { status : 404, message : "Device not found "};
    }

    res.status(200).send("Device updated successfully");
    return { status : 200, message : "Device updated successfully", updatedDevice };

  } catch (error) {
    console.error(error.message);
    return { status : 500, message : "Internal server error" };
  }
};
