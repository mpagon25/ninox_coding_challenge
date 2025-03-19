import { GIFObject } from 'giphy-api';
import styled from 'styled-components';

type GifCardProps = {
  gif: GIFObject;
};

export const GifCard = ({ gif }: GifCardProps) => {
  return (
    <StyledGif.Card>
      <StyledGif.Image src={gif.images.original.url} alt={gif.title} />
      <StyledGif.TitleContainer>
        <StyledGif.Title>{gif.title}</StyledGif.Title>
      </StyledGif.TitleContainer>
    </StyledGif.Card>
  );
};

const StyledGif = {
  Card: styled.div`
    display: grid;
    grid-template-areas:
      'image'
      'title';
    grid-template-rows: 60% 40%;
    aspect-ratio: 1 / 1;
    background-color: grey;
    border-radius: 10px;
    overflow: hidden;
    min-width: 160px;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
    &:hover {
      transform: scale(1.05);
      transition: transform 0.3s;
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
    font-family:
      'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
      'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: bold;
    color: white;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};
