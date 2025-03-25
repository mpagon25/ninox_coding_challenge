import { useParams } from 'react-router';
import { GifModal } from '@components/GifModal';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { useFetchGifById } from '@hooks/useFetchGifById';

type GifRouteProps = {
  showDetails?: boolean;
};

const GifRoute = ({ showDetails }: GifRouteProps) => {
  const { id } = useParams<{ id: string }>();
  const { gif, isLoading, error } = useFetchGifById(id);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;
  if (!gif) return <div>GIF not found</div>;

  return <GifModal gif={gif} initialShowDetails={showDetails} />;
};

export default GifRoute;
