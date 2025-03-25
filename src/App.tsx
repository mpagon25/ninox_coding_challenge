import { LandingPage } from '@pages/LandingPage';
import { Header } from '@components/Header';
import { useState, useCallback } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <>
      <Header onSearch={handleSearch} />
      <main>
        <LandingPage searchQuery={searchQuery} />
      </main>
    </>
  );
};

export default App;
