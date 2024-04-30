import sharp from 'sharp';

export const imageToWebP = async (buffer) => {
  return await sharp(buffer).webp().toBuffer();
};

export const resizeImage = async (buffer, width, height) => {
  return await sharp(buffer).resize({ width, height, fit: 'inside' }).toBuffer();
};
