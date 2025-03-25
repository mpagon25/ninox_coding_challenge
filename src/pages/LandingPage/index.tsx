import { useState, useCallback, useMemo, useEffect } from 'react';
import { GifCardList } from '@components/GifCardList';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { GifModal } from '@components/GifModal';
import { GIFObject } from 'giphy-api';
import useFetchGifs from '@hooks/useFetchGifs';
import { StyledLandingPageContent } from './styles';

interface LandingPageProps {
  searchQuery: string;
}

export const LandingPage = ({ searchQuery }: LandingPageProps) => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const API_URL = import.meta.env.VITE_GIPHY_API_URL;

  const [selectedGif, setSelectedGif] = useState<GIFObject | null>(null);
  const { data, isLoading, error, loadMore, hasMore, loadAllForSearch } =
    useFetchGifs(API_URL, API_KEY);

  const filteredGifs = useMemo(() => {
    if (!data) return [];
    const query = searchQuery.toLowerCase().trim();
    return query
      ? data.data.filter((gif) => gif.title.toLowerCase().includes(query))
      : data.data;
  }, [data, searchQuery]);

  const handleLoadMore = useCallback(() => {
    if (!searchQuery) {
      return loadMore();
    }
    return Promise.resolve();
  }, [searchQuery, loadMore]);

  useEffect(() => {
    if (searchQuery.trim() && hasMore) {
      loadAllForSearch();
    }
  }, [searchQuery, hasMore, loadAllForSearch]);

  const openGifModal = (gif: GIFObject) => {
    setSelectedGif(gif);
  };

  const closeGifModal = () => {
    setSelectedGif(null);
  };

  if (isLoading && !data) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  if (searchQuery.trim() && !filteredGifs.length) {
    return <p role="status">No matching GIFs found.</p>;
  }

  return (
    <StyledLandingPageContent>
      <GifCardList
        gifs={filteredGifs}
        onGifSelect={(gif) => {
          return selectedGif ? closeGifModal() : openGifModal(gif);
        }}
        onLoadMore={handleLoadMore}
        hasMore={!searchQuery && hasMore}
        isLoading={isLoading}
      />
      {selectedGif && <GifModal onClose={closeGifModal} gif={selectedGif} />}
    </StyledLandingPageContent>
  );
};

export default LandingPage;
