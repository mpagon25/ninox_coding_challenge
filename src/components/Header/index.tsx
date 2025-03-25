import { ChangeEvent } from 'react';
import { StyledHeader } from './styles';

type HeaderProps = {
  onSearch: (query: string) => void;
};

export const Header = ({ onSearch }: HeaderProps) => {
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <StyledHeader.Wrapper>
      <StyledHeader.Content>
        <StyledHeader.Title>GIF Gallery</StyledHeader.Title>
        <StyledHeader.SearchInput
          type="search"
          placeholder="Search in trending GIFs..."
          onChange={handleSearchChange}
          aria-label="Search in trending GIFs"
        />
      </StyledHeader.Content>
    </StyledHeader.Wrapper>
  );
};
