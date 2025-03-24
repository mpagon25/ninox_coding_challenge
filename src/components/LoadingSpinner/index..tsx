import { ClipLoader } from 'react-spinners';
import { Spinner } from './styles';

export const LoadingSpinner = () => {
  return (
    <Spinner.Wrapper role="status" aria-live="polite">
      <Spinner.ContentWrapper>
        <ClipLoader color="white" loading size={100} />
        <Spinner.LoadingText>Loading content...</Spinner.LoadingText>
      </Spinner.ContentWrapper>
    </Spinner.Wrapper>
  );
};
