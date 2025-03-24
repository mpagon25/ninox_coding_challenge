import { GIFObject } from 'giphy-api';
import { useEffect, useRef } from 'react';
import { StyledGif } from './styles';

type GifModalProps = {
  onClose: () => void;
  gif: GIFObject;
};

export const GifModal = ({ onClose, gif }: GifModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    modalRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [onClose]);

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
          <StyledGif.CloseButton
            ref={closeButtonRef}
            onClick={onClose}
            onMouseEnter={() => closeButtonRef.current?.focus()}
            aria-label="Close modal"
          >
            <StyledGif.CloseIcon />
          </StyledGif.CloseButton>
        </StyledGif.TopMenu>
        <StyledGif.Image
          src={gif.images.original.url}
          alt={gif.title || 'GIF image'}
        />
      </StyledGif.Modal>
    </StyledGif.Backdrop>
  );
};

export default GifModal;
