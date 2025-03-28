import { useRef, useState, KeyboardEvent, useEffect } from 'react';
import { GIFObject } from 'giphy-api';
import { GifCard } from '../GifCard';
import { StyledGrifCardList } from './styles';

type GifCardListProps = {
  gifs: GIFObject[];
  onGifSelect: (gif: GIFObject) => void;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
};

export const GifCardList = ({
  gifs,
  onGifSelect,
  onLoadMore,
  hasMore,
  isLoading,
}: GifCardListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [numCols, setNumCols] = useState<number>(1);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastCardRef = useRef<HTMLDivElement | null>(null);

  const calculateNumColumns = () => {
    if (!gridRef.current) return;
    const gridStyles = window.getComputedStyle(gridRef.current);
    const gridColumnCount = gridStyles
      .getPropertyValue('grid-template-columns')
      .split(' ').length;
    setNumCols(gridColumnCount);
  };

  useEffect(() => {
    calculateNumColumns();
    window.addEventListener('resize', calculateNumColumns);
    return () => window.removeEventListener('resize', calculateNumColumns);
  }, []);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, gifs.length);
  }, [gifs]);

  useEffect(() => {
    if (selectedIndex >= 0) {
      cardRefs.current[selectedIndex]?.focus();
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (isLoading || !hasMore) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 },
    );

    if (lastCardRef.current) {
      observerRef.current.observe(lastCardRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, hasMore, onLoadMore]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
    if (index === gifs.length - 1) {
      lastCardRef.current = el;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (selectedIndex === -1) {
      if (
        ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key)
      ) {
        event.preventDefault();
        setSelectedIndex(0);
        return;
      }
    }

    switch (event.key) {
      case 'ArrowRight': {
        event.preventDefault();
        const newIndex = selectedIndex + 1;
        if (newIndex < gifs.length) {
          setSelectedIndex(newIndex);
        }
        break;
      }
      case 'ArrowLeft': {
        event.preventDefault();
        const newIndex = selectedIndex - 1;
        if (newIndex >= 0) {
          setSelectedIndex(newIndex);
        }
        break;
      }
      case 'ArrowDown': {
        event.preventDefault();
        const newIndex = selectedIndex + numCols;
        if (newIndex < gifs.length) {
          setSelectedIndex(newIndex);
        }
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const newIndex = selectedIndex - numCols;
        if (newIndex >= 0) {
          setSelectedIndex(newIndex);
        }
        break;
      }
      case 'Enter':
      case ' ': {
        event.preventDefault();
        if (selectedIndex >= 0) {
          onGifSelect(gifs[selectedIndex]);
        }
        break;
      }
    }
  };

  return (
    <StyledGrifCardList
      ref={gridRef}
      role="grid"
      aria-label="Grid of GIF images"
      onKeyDown={handleKeyDown}
      tabIndex={selectedIndex === -1 ? 0 : -1}
    >
      {gifs.map((gif, index) => (
        <GifCard
          key={gif.id}
          ref={setCardRef(index)}
          onClick={() => {
            setSelectedIndex(index);
            onGifSelect(gif);
          }}
          onMouseEnter={() => setSelectedIndex(index)}
          gif={gif}
          isSelected={index === selectedIndex}
          tabIndex={index === selectedIndex ? 0 : -1}
        />
      ))}
    </StyledGrifCardList>
  );
};
