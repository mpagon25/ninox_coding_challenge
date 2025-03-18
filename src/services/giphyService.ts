import { GIFObject } from 'giphy-api';

export const fetchGifs = async (
  apiUrl: string,
  apiKey: string,
): Promise<GIFObject[]> => {
  const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
