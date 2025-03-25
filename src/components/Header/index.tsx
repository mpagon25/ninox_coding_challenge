import { StyledHeader } from './styles';

type HeaderProps = {
  onSearch: (query: string) => void;
  initialQuery: string;
};

export const Header = ({ onSearch, initialQuery }: HeaderProps) => {
  return (
    <StyledHeader.Wrapper>
      <StyledHeader.Content>
        <StyledHeader.Title>GIF Gallery</StyledHeader.Title>
        <StyledHeader.SearchInput
          type="search"
          placeholder="Search in trending GIFs..."
          onChange={(e) => onSearch(e.target.value)}
          defaultValue={initialQuery}
          aria-label="Search in trending GIFs"
        />
      </StyledHeader.Content>
    </StyledHeader.Wrapper>
  );
};
