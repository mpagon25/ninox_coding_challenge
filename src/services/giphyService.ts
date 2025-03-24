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
  offset: number = 0,
  limit: number = 25,
): Promise<FetchGifsResults> => {
  const response = await fetch(
    `${apiUrl}?api_key=${apiKey}&offset=${offset}&limit=${limit}&rating=g&bundle=messaging_non_clips`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
