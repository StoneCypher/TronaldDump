import { getRandomQuoteAsync } from './quoteActions';
import { IQuote } from './types';

const memes = [
  91545132, // Bill Signing
  40181531, // Finger Up
  18652674, // Crazy Hair
  39655660, // Weird Mic Grab
  41137093, // Crazy Hair 2
  53702014, // Chinz
  54586374, // More Chinz
  42405022, // Minicing
  104625245, // Truck
];

export const getRandomMeme = async (): Promise<IQuote | undefined> => {
  const index = Math.floor(Math.random() * memes.length);
  try {
    const quote = await getRandomQuoteAsync();
    const imageResult = await fetch(
      `https://api.imgflip.com/caption_image?template_id=${memes[index]}&text1=${quote.body}&username=&password=`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/hal+json',
        },
      }).then((response) => response.json());
    if (imageResult.success) {
      return { ...quote, key: `${quote.key}/${memes[index]}`, image: imageResult.data.url };
    }
  }
  finally { }
  return undefined;
};