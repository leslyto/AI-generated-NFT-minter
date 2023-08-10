import { Buffer } from 'buffer';
import axios from 'axios';
import { NFTStorage, File } from 'nft.storage';

const createImage = async (description) => {
  const URL =
    'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

  try {
    const response = await axios.post(
      URL,
      {
        inputs: description,
        options: { wait_for_model: true },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      },
    );

    const type = response.headers['content-type'];
    const data = response.data;
    const base64data = Buffer.from(data).toString('base64');
    const image = `data:${type};base64,${base64data}`;

    return { data, image };
  } catch (e) {
    throw new Error('Failed to create image - ', e);
  }
};

const uploadImage = async (imageData, name, description) => {
  try {
    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });

    const { ipnft } = await nftstorage.store({
      image: new File([imageData], 'image.jpeg', { type: 'image/jpeg' }),
      name,
      description,
    });

    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;

    return { url };
  } catch (e) {
    throw new Error('Failed to upload image - ', e);
  }
};

export { createImage, uploadImage };
