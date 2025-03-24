import { GIFObject } from 'giphy-api';
import { GifCard } from '../GifCard';
import { useRef, useState, KeyboardEvent, useEffect } from 'react';
import { StyledGridLayout } from './styles';

type GifCardListProps = {
  gifs: GIFObject[];
  onGifSelect: (gif: GIFObject) => void;
};

export const GifCardList = ({ gifs, onGifSelect }: GifCardListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getNumColumns = () => {
    if (!gridRef.current) return 1;
    const gridWidth = gridRef.current.clientWidth;
    const cardWidth = 160; // min-width of card
    const gap = 16; // 1rem gap
    return Math.floor((gridWidth + gap) / (cardWidth + gap));
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, gifs.length);
  }, [gifs]);

  useEffect(() => {
    if (selectedIndex >= 0) {
      cardRefs.current[selectedIndex]?.focus();
    }
  }, [selectedIndex]);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    // If no card is selected, select the first one on any arrow key
    if (selectedIndex === -1) {
      if (
        ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(event.key)
      ) {
        event.preventDefault();
        setSelectedIndex(0);
        return;
      }
    }

    const numCols = getNumColumns();

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
    <StyledGridLayout
      ref={gridRef}
      role="grid"
      aria-label="Grid of GIF images"
      onKeyDown={handleKeyDown}
      tabIndex={-1}
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
    </StyledGridLayout>
  );
};

export default GifCardList;
