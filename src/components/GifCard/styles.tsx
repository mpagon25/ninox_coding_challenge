import styled from 'styled-components';

export const StyledGif = {
  Card: styled.div<{ 'aria-selected': boolean }>`
    display: grid;
    grid-template-areas:
      'image'
      'title';
    grid-template-rows: 60% 40%;
    aspect-ratio: 1 / 1;
    background-color: #272727;
    border-radius: 10px;
    overflow: hidden;
    min-width: 160px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover,
    &:focus {
      transform: scale(1.05);
    }

    ${(props) =>
      props['aria-selected'] &&
      `
      outline: 3px solid #007bff;
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
  `,
  TitleContainer: styled.div`
    grid-area: title;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 1rem;
    background-color: #454545;
    overflow: hidden;
  `,
  Title: styled.p`
    font-size: 0.75rem;
    font-weight: bold;
    color: white;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};
