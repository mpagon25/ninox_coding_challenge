import { GIFObject } from 'giphy-api';
import { useEffect, useRef, useState, useCallback } from 'react';
import { StyledGif } from './styles';
import { IoCloseSharp, IoInformationCircleOutline } from 'react-icons/io5';
import GifModalDetails from '@components/GifModalDetails';
import { useNavigate } from 'react-router';

type GifModalProps = {
  gif: GIFObject;
  initialShowDetails?: boolean;
};

export const GifModal = ({
  gif,
  initialShowDetails = false,
}: GifModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState<boolean>(initialShowDetails);

  const openDetails = useCallback(() => {
    navigate(`/gif/${gif.id}/details`);
  }, [navigate, gif.id]);

  const closeDetails = useCallback(() => {
    navigate(`/gif/${gif.id}`);
  }, [navigate, gif.id]);

  const handleClose = useCallback(() => {
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    setShowDetails(initialShowDetails);
  }, [initialShowDetails]);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showDetails) {
          closeDetails();
        } else {
          handleClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [handleClose, showDetails, closeDetails]);

  return (
    <StyledGif.Backdrop
      onClick={handleClose}
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
              onClick={handleClose}
              aria-label="Close modal"
            >
              <IoCloseSharp />
            </StyledGif.CloseButton>
          </StyledGif.ButtonContainer>
        </StyledGif.TopMenu>
        <StyledGif.Image
          src={gif.images.original.url}
          alt={gif.title || 'GIF image'}
          onLoad={(e) => e.currentTarget.classList.add('loaded')}
        />
        {showDetails && <GifModalDetails gif={gif} onClose={closeDetails} />}
      </StyledGif.Modal>
    </StyledGif.Backdrop>
  );
};

export default GifModal;
