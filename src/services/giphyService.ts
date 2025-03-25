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
  searchQuery?: string,
): Promise<FetchGifsResults> => {
  const params = new URLSearchParams({
    api_key: apiKey,
    offset: offset.toString(),
    limit: limit.toString(),
    rating: 'g',
    bundle: 'messaging_non_clips',
  });

  if (searchQuery) {
    params.append('q', searchQuery);
  }

  const response = await fetch(`${apiUrl}?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
