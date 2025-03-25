import styled from 'styled-components';

export const StyledHeader = {
  Wrapper: styled.header`
    display: flex;
    position: fixed;
    height: 60px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #282c34;
    z-index: 10;
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  `,
  Title: styled.h1`
    color: white;
    font-size: 1.5rem;
  `,
  SearchInput: styled.input`
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #cbcbcb;
    color: #252525;
    font-size: 1rem;
    width: 300px;
    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #5f5f5f;
    }
  `,
};
