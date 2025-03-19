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

export const fetchGifs = async (
  apiUrl: string,
  apiKey: string,
): Promise<FetchGifsResults> => {
  const response = await fetch(`${apiUrl}?api_key=${apiKey}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
