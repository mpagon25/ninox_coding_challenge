import { useState } from 'react';
import { GifCardList } from '@components/GifCardList';
import { GifModal } from '@components/GifModal';
import { Header } from '@components/Header';
import useFetchGifs from '@hooks/useFetchGifs';
import { GIFObject } from 'giphy-api';
import { LoadingSpinner } from '@components/LoadingSpinner';

const App = () => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const API_URL = import.meta.env.VITE_GIPHY_API_URL;

  const { data, isLoading, error, loadMore, hasMore } = useFetchGifs(
    API_URL,
    API_KEY,
  );
  const [selectedGif, setSelectedGif] = useState<GIFObject | null>(null);

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

  if (!data || (Array.isArray(data.data) && data.data.length === 0)) {
    return <p role="status">No results found.</p>;
  }

  return (
    <main>
      <Header />
      <GifCardList
        gifs={data.data}
        onGifSelect={(gif) => {
          return selectedGif ? closeGifModal() : openGifModal(gif);
        }}
        onLoadMore={loadMore}
        hasMore={hasMore}
        isLoading={isLoading}
      />
      {selectedGif && <GifModal onClose={closeGifModal} gif={selectedGif} />}
    </main>
  );
};

export default App;
