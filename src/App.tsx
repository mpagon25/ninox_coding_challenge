import styled from 'styled-components';
import { GifCard } from './components/GifCard';
import useFetchGifs from './hooks/useFetchGifs';
import { GIFObject } from 'giphy-api';
import { useState } from 'react';
import { GifModal } from './components/GifModal';

const App = () => {
  const API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const API_URL = import.meta.env.VITE_GIPHY_API_URL;

  const { data, isLoading, error } = useFetchGifs(API_URL, API_KEY);

  const [selectedGif, setSelectedGif] = useState<GIFObject | null>(null);

  const openGifModal = (gif: GIFObject) => {
    setSelectedGif(gif);
  };

  const closeGifModal = () => {
    setSelectedGif(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || (Array.isArray(data.data) && data.data.length === 0)) {
    return <p>No results found.</p>;
  }

  return (
    <>
      <StyledGridLayout>
        {data?.data.map((item) => (
          <GifCard
            onClick={(gif) => {
              return selectedGif ? closeGifModal() : openGifModal(gif);
            }}
            gif={item}
          />
        ))}
      </StyledGridLayout>
      {selectedGif ? (
        <GifModal onClose={closeGifModal} gif={selectedGif} />
      ) : null}
    </>
  );
};

export default App;

const StyledGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
`;
