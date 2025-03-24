import styled from 'styled-components';
import { GifCardList } from './components/GifCardList';
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
    return <p role="status">Loading...</p>;
  }

  if (error) {
    return <p role="alert">Error: {error}</p>;
  }

  if (!data || (Array.isArray(data.data) && data.data.length === 0)) {
    return <p role="status">No results found.</p>;
  }

  return (
    <main>
      <StyledHeader>
        <h1>GIF Gallery</h1>
      </StyledHeader>
      <GifCardList
        gifs={data.data}
        onGifSelect={(gif) => {
          return selectedGif ? closeGifModal() : openGifModal(gif);
        }}
      />
      {selectedGif && <GifModal onClose={closeGifModal} gif={selectedGif} />}
    </main>
  );
};

const StyledHeader = styled.header`
  background-color: #272727;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
`;

export default App;
