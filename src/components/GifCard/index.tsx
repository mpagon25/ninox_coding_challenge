import { GIFObject } from 'giphy-api';
import { forwardRef } from 'react';
import { StyledGif } from './styles';

type GifCardProps = {
  gif: GIFObject;
  onClick: (gif: GIFObject) => void;
  onMouseEnter: () => void;
  isSelected?: boolean;
  tabIndex?: number;
};

export const GifCard = forwardRef<HTMLDivElement, GifCardProps>(
  ({ gif, onClick, onMouseEnter, isSelected = false, tabIndex = 0 }, ref) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick(gif);
      }
    };

    return (
      <StyledGif.Card
        ref={ref}
        onClick={() => onClick(gif)}
        onMouseEnter={onMouseEnter}
        onKeyDown={handleKeyDown}
        tabIndex={tabIndex}
        role="gridcell"
        aria-selected={isSelected}
        aria-label={`View ${gif.title || 'GIF'}`}
      >
        <StyledGif.Image
          src={gif.images.original.url}
          alt={gif.title || 'GIF image'}
          loading="lazy"
        />
        <StyledGif.TitleContainer>
          <StyledGif.Title>{gif.title}</StyledGif.Title>
        </StyledGif.TitleContainer>
      </StyledGif.Card>
    );
  },
);

GifCard.displayName = 'GifCard';

export default GifCard;
