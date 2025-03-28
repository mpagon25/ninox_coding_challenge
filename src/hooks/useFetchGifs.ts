import { useState, useEffect, useCallback } from 'react';
import { GIFObject } from 'giphy-api';
import { fetchGifs, FetchGifsResults } from '@services/giphyService';

interface UseFetchGifsResult {
  data: FetchGifsResults | null;
  isLoading: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  hasMore: boolean;
}

const useFetchGifs = (searchQuery: string = ''): UseFetchGifsResult => {
  const [allGifs, setAllGifs] = useState<GIFObject[]>([]);
  const [paginationData, setPaginationData] = useState<
    FetchGifsResults['pagination'] | null
  >(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 25;

  const fetchData = useCallback(async (currentOffset: number) => {
    try {
      setIsLoading(true);
      const result = await fetchGifs(currentOffset, limit);

      setAllGifs((prevGifs) =>
        currentOffset === 0 ? result.data : [...prevGifs, ...result.data],
      );
      setPaginationData(result.pagination);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || !paginationData) return;
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    await fetchData(nextOffset);
  }, [isLoading, paginationData, offset, limit, fetchData]);

  useEffect(() => {
    setOffset(0);
    fetchData(0);
  }, [fetchData]);

  const hasMore =
    !searchQuery.trim() && paginationData
      ? offset < paginationData.total_count
      : false;

  const data: FetchGifsResults | null =
    allGifs.length > 0
      ? {
          data: searchQuery.trim()
            ? allGifs.filter((gif) =>
                gif.title.toLowerCase().includes(searchQuery.toLowerCase()),
              )
            : allGifs,
          pagination: paginationData!,
          meta: {
            status: 200,
            msg: 'OK',
            response_id: '',
          },
        }
      : null;

  return { data, isLoading, error, loadMore, hasMore };
};

export default useFetchGifs;
