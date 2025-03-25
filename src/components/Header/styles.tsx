import styled from 'styled-components';

export const StyledHeader = {
  Wrapper: styled.header`
    display: flex;
    position: fixed;
    height: 60px;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: var(--primary-color);
    z-index: 10;
    padding: 1rem 2rem;
    color: var(--surface-color);
    box-shadow: var(--box-shadow);
  `,
  Content: styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  `,
  Title: styled.h1`
    font-size: 1.5rem;
    color: var(--surface-color);
  `,
  SearchInput: styled.input`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    background-color: var(--surface-color);
    color: var(--text-primary);
    font-size: 1rem;
    width: 300px;
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--secondary-color);
    }
    &::placeholder {
      color: var(--text-secondary);
    }
  `,
};
