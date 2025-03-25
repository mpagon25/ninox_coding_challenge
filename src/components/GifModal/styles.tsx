import { IoCloseSharp } from 'react-icons/io5';
import styled from 'styled-components';

export const StyledGif = {
  Backdrop: styled.div`
    display: grid;
    place-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
  `,
  Modal: styled.div`
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    width: min(80vw, 80vh);
    height: min(80vw, 80vh);
    background-color: var(--surface-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--box-shadow);
    outline: none;
  `,
  TopMenu: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    background-color: var(--primary-color);
    height: 50px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  `,
  TopMenuTitle: styled.h2`
    color: var(--surface-color);
    font-size: 1.5rem;
    margin: 0;
  `,
  CloseButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: var(--surface-color);
    transition: background-color 0.2s;

    &:hover,
    &:focus {
      background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus {
      outline: 2px solid var(--secondary-color);
    }
  `,
  CloseIcon: styled(IoCloseSharp)`
    font-size: 2rem;
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: var(--background-color);
  `,
};
