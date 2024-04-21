import { deviceModel } from "../models/index.js";

export const createDevice = async (req, res) => {
  try {
    const { line, brand, commissioning_date, site_id, state } = req.body;

    let device = await deviceModel.findOne({ line });
    if (device) {
      return res.status(400).send("Device already exists");
    }

    device = new deviceModel({
      line,
      brand,
      commissioning_date,
      site_id,
      state
    });

    await device.save();

    res.status(201).send("Device created successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const { deviceId } = req.params;

    const deletedDevice = await deviceModel.findByIdAndDelete(deviceId);

    if (!deletedDevice) {
      return res.status(404).send("Device not found");
    }

    res.status(200).send("Device deleted successfully");
  } catch (error) {
    res.status(500).send("Internal Server Error: ");
  }
};

export const getAll = async (req, res) => {
  try{
    const device = await deviceModel.find();
    if(!device)
      res.status(404).send("Device not found")

    res.status(200).send(device);
  }catch (e) {

  }
}


export const updateDevice = async (req, res) => {
  try {
    const { id } = req.params;
    const { line, brand, commissioning_date, site_id, state } = req.body;

    const updatedDevice = await deviceModel.findByIdAndUpdate(
      id,
      { line, brand, commissioning_date, site_id, state },
      { new: true }
    );

    if (!updatedDevice) {
      return res.status(404).send("Device not found");
    }

    res.status(200).send("Device updated successfully");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error: " + error.message);
  }
};
