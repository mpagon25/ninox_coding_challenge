import { LandingPage } from '@pages/LandingPage';
import { Header } from '@components/Header';
import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router';
import GifRoute from '@routes/gif';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage searchQuery={searchQuery} />} />
          <Route path="/gif/:id" element={<GifRoute />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
