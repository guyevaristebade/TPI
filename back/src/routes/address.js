import axios from "axios";
import express from "express";

export const addressRouter = express.Router();

addressRouter.get('/', async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${query}`, {
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
