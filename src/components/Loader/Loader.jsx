import { ThreeDots } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';
export default function Loader() {
  return (
    <LoaderContainer>
      <ThreeDots color="#3f51b5" height={150} width={150} />
    </LoaderContainer>
  );
}