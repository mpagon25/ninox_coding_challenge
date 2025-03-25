import { GIFObject } from 'giphy-api';
import { useEffect, useRef, useState } from 'react';
import { StyledGif } from './styles';
import { IoCloseSharp, IoInformationCircleOutline } from 'react-icons/io5';
import GifModalDetails from '@components/GifModalDetails';

type GifModalProps = {
  onClose: () => void;
  gif: GIFObject;
};

export const GifModal = ({ onClose, gif }: GifModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showDetails) {
          setShowDetails(false); // Close details overlay first
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [onClose, showDetails]);

  const openDetails = () => {
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  return (
    <StyledGif.Backdrop
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <StyledGif.Modal
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
        tabIndex={-1}
      >
        <StyledGif.TopMenu>
          <StyledGif.TopMenuTitle id="modal-title">
            {gif.title || 'GIF Preview'}
          </StyledGif.TopMenuTitle>
          <StyledGif.ButtonContainer>
            <StyledGif.InfoButton
              onClick={openDetails}
              aria-label="Show details"
            >
              <IoInformationCircleOutline />
            </StyledGif.InfoButton>
            <StyledGif.CloseButton
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close modal"
            >
              <IoCloseSharp />
            </StyledGif.CloseButton>
          </StyledGif.ButtonContainer>
        </StyledGif.TopMenu>
        <StyledGif.Image
          src={gif.images.original.url}
          alt={gif.title || 'GIF image'}
        />
        {showDetails && <GifModalDetails gif={gif} onClose={closeDetails} />}
      </StyledGif.Modal>
    </StyledGif.Backdrop>
  );
};

export default GifModal;
