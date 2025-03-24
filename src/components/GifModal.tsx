import styled from 'styled-components';
import { GIFObject } from 'giphy-api';
import { IoCloseSharp } from 'react-icons/io5';

type GifModalProps = {
  onClose: () => void;
  gif: GIFObject;
};

export const GifModal = ({ onClose, gif }: GifModalProps) => {
  return (
    <StyledGif.Backdrop onClick={onClose}>
      <StyledGif.Modal onClick={(e) => e.stopPropagation()}>
        <StyledGif.TopMenu>
          <StyledGif.CloseIcon onClick={onClose} />
          <StyledGif.TopMenuTitle>{gif.title}</StyledGif.TopMenuTitle>
        </StyledGif.TopMenu>
        <StyledGif.Image src={gif.images.original.url} alt={gif.title} />
      </StyledGif.Modal>
    </StyledGif.Backdrop>
  );
};

const StyledGif = {
  Backdrop: styled.div`
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  `,
  Modal: styled.div`
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    width: min(80vw, 80vh);
    height: min(80vw, 80vh);
    aspect-ratio: 1;
    background-color: #272727;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  `,
  TopMenu: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: #3d3d40;
    opacity: 0.8;
    height: 50px;
  `,
  TopMenuTitle: styled.h2`
    color: white;
    font-size: 1.5rem;
    margin: 0;
  `,
  CloseIcon: styled(IoCloseSharp)`
    font-size: 2rem;
    color: white;
    cursor: pointer;
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
  `,
};
