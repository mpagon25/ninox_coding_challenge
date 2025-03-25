import { useParams, useNavigate } from 'react-router';
import { GifModal } from '@components/GifModal';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useFetchGifById } from '@hooks/useFetchGifById';

const GifRoute = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { gif, isLoading, error } = useFetchGifById(id);

  const handleClose = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!gif) {
    return <div>GIF not found</div>;
  }

  return <GifModal gif={gif} onClose={handleClose} />;
};

export default GifRoute;
