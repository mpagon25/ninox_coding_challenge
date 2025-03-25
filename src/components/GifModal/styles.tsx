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
    position: relative;
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
    font-size: 1.25rem;
    margin: 0;
  `,
  ButtonContainer: styled.div`
    display: flex;
    align-items: center;
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
    font-size: 2rem;

    &:hover {
      color: var(--secondary-color);
    }
  `,
  InfoButton: styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 4px;
    cursor: pointer;
    color: var(--surface-color);
    font-size: 2rem;
    margin-right: 8px;

    &:hover {
      color: var(--secondary-color);
    }
  `,
  Image: styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: var(--background-color);
  `,

  CloseDetailsButton: styled.button`
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: var(--primary-color);
    color: var(--surface-color);
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;

    &:hover {
      background-color: var(--secondary-color);
    }
  `,
};
