import { useState, useEffect } from 'react';
import { GIFObject } from 'giphy-api';
import { fetchGifById } from '@services/giphyService';

export const useFetchGifById = (id?: string) => {
  const [gif, setGif] = useState<GIFObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadGif = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchGifById(id);
        setGif(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Failed to fetch GIF',
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadGif();
  }, [id]);

  return { gif, isLoading, error };
};
