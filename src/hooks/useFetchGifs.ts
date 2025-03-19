import { useState, useEffect } from 'react';
import { fetchGifs, FetchGifsResults } from '../services/giphyService';

interface UseFetchGifsResult {
  data: FetchGifsResults | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchGifs = (apiUrl: string, apiKey: string): UseFetchGifsResult => {
  const [data, setData] = useState<FetchGifsResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
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
