import styled from 'styled-components';

export const StyledGridLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  outline: none;
`;
