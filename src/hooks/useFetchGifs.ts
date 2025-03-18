import { useState, useEffect } from 'react';
import { fetchGifs } from '../services/giphyService';

const useFetchGifs = (apiUrl: string, apiKey: string) => {
  const [data, setData] = useState(null);
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
