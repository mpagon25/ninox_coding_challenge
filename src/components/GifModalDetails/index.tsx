import { GIFObject } from 'giphy-api';
import { StyledGifModalDetails } from './styles';

type GifModalDetailsProps = {
  gif: GIFObject;
  onClose: () => void;
};

const GifModalDetails = ({ gif, onClose }: GifModalDetailsProps) => {
  return (
    <StyledGifModalDetails.Overlay>
      <StyledGifModalDetails.Content>
        <StyledGifModalDetails.Title>Details</StyledGifModalDetails.Title>
        <StyledGifModalDetails.UserName>
          {`Username: ${gif.username.toUpperCase()}`}
        </StyledGifModalDetails.UserName>
        <StyledGifModalDetails.ImportDateTime>
          {`Upload: ${new Date(gif.import_datetime).toLocaleString()}`}
        </StyledGifModalDetails.ImportDateTime>
        <StyledGifModalDetails.Rating>
          {`Rating: ${gif.rating.toUpperCase()}`}
        </StyledGifModalDetails.Rating>
        <StyledGifModalDetails.SourceText>
          {`Source: `}
          <StyledGifModalDetails.Source
            href={gif.embed_url}
            target="_blank"
            rel="noreferrer"
          >
            {gif.embed_url}
          </StyledGifModalDetails.Source>
        </StyledGifModalDetails.SourceText>

        <StyledGifModalDetails.CloseButton onClick={onClose}>
          {'Close'}
        </StyledGifModalDetails.CloseButton>
      </StyledGifModalDetails.Content>
    </StyledGifModalDetails.Overlay>
  );
};

export default GifModalDetails;
