import { LandingPage } from '@pages/LandingPage';
import { Header } from '@components/Header';
import { useCallback } from 'react';
import { Routes, Route, useSearchParams } from 'react-router';
import GifRoute from '@routes/gif';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    (query: string) => {
      // Update URL with search query, but only if it's not empty
      if (query) {
        setSearchParams({ q: query });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams],
  );

  return (
    <>
      <Header
        onSearch={handleSearch}
        initialQuery={searchParams.get('q') || ''}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<LandingPage searchQuery={searchParams.get('q') || ''} />}
          />
          <Route path="/gif/:id" element={<GifRoute />} />
          <Route path="/gif/:id/details" element={<GifRoute showDetails />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
