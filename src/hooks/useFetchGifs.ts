import { useState, useEffect } from 'react';
import { fetchGifs } from '../services/giphyService';
import { GIFObject } from 'giphy-api';

interface FetchGifsHookResult {
  data: GIFObject[] | null;
  isLoading: boolean;
  error: string | null;
}
const useFetchGifs = (apiUrl: string, apiKey: string): FetchGifsHookResult => {
  const [data, setData] = useState<GIFObject[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); // Reset error before fetching
      try {
        const result = await fetchGifs(apiUrl, apiKey);
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl, apiKey]);

  return { data, isLoading, error };
};

export default useFetchGifs;
