import multer from 'multer'
import {  Router } from 'express'
import {imageToWebP} from "../helpers/image.js";
import { Image  } from '../models/index.js'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
export const fileRouter = Router()
fileRouter.post('/', upload.single('file'), async  (req, res) =>{
  try {
    const webPBuffer = await imageToWebP(req.file.buffer);

    const newImage = new Image({
      data: webPBuffer,
      contentType: 'image/webp',
      filename: req.file.originalname
    });

    await newImage.save();

    res.status(201).send({ message: 'Image uploaded successfully', data : newImage });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }});

fileRouter.get('/', async (req, res) => {
  try {
    const image = await Image.find()

    res.set('Content-Type', image.contentType);
    res.send(image[0].data)
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
})
