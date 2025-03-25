import { GIFObject } from 'giphy-api';

export interface FetchGifsResults {
  data: GIFObject[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const API_URL = import.meta.env.VITE_GIPHY_API_URL;

export const fetchGifs = async (
  offset: number = 0,
  limit: number = 25,
): Promise<FetchGifsResults> => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    offset: offset.toString(),
    limit: limit.toString(),
    rating: 'g',
    bundle: 'messaging_non_clips',
  });

  const response = await fetch(`${API_URL}/trending?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const fetchGifById = async (id: string): Promise<GIFObject> => {
  const response = await fetch(`${API_URL}/${id}?api_key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};
