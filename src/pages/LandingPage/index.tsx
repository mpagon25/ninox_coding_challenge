import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { GifCardList } from '@components/GifCardList';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { GIFObject } from 'giphy-api';
import useFetchGifs from '@hooks/useFetchGifs';
import { StyledLandingPageContent } from './styles';

type LandingPageProps = {
  searchQuery: string;
};

export const LandingPage = ({ searchQuery }: LandingPageProps) => {
  const navigate = useNavigate();
  const { data, isLoading, error, loadMore, hasMore } =
    useFetchGifs(searchQuery);

  const filteredGifs = useMemo(() => {
    if (!data) return [];
    return data.data;
  }, [data]);

  const handleLoadMore = useCallback(() => {
    if (!searchQuery) {
      return loadMore();
    }
    return Promise.resolve();
  }, [searchQuery, loadMore]);

  const handleGifSelect = (gif: GIFObject) => {
    navigate(`/gif/${gif.id}`);
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
        onGifSelect={handleGifSelect}
        onLoadMore={handleLoadMore}
        hasMore={!searchQuery && hasMore}
        isLoading={isLoading}
      />
    </StyledLandingPageContent>
  );
};

export default LandingPage;
