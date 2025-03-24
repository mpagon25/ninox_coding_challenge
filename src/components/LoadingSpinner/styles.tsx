import styled from 'styled-components';

export const Spinner = {
  Wrapper: styled.div`
    display: grid;
    place-items: center;
    background-color: #333333;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  `,
  ContentWrapper: styled.div`
    display: grid;
    gap: 1rem;
    justify-items: center;
  `,
  LoadingText: styled.p`
    font-size: 1.5rem;
    color: white;
    margin: 0;
  `,
};
