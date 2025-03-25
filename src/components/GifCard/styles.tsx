import styled from 'styled-components';

export const StyledGif = {
  Card: styled.div<{ 'aria-selected': boolean }>`
    display: grid;
    grid-template-areas:
      'image'
      'title';
    grid-template-rows: 60% 40%;
    aspect-ratio: 1 / 1;
    background-color: var(--surface-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    min-width: 160px;
    box-shadow: var(--box-shadow);
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &:hover,
    &:focus {
      transition:
        transform 0.4s ease,
        box-shadow 0.4s ease;
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.7);
    }

    ${(props) =>
      props['aria-selected'] &&
      `
      outline: 3px solid var(--primary-color); /* Highlight selected card */
      outline-offset: -3px;
    `}

    &:focus:not(:focus-visible) {
      outline: none;
    }
  `,
  Image: styled.img`
    grid-area: image;
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: var(--background-color);
  `,
  TitleContainer: styled.div`
    grid-area: title;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    background-color: var(--primary-color);
    overflow: hidden;
  `,
  Title: styled.p`
    font-size: 0.75rem;
    font-weight: bold;
    color: var(--surface-color);
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};
