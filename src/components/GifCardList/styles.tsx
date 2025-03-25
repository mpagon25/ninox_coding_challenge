import styled from 'styled-components';

export const StyledGifCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1rem;
  outline: none;
  width: 100%;
  max-width: 1040px;
`;
