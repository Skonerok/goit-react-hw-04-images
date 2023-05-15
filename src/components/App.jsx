import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetchImages from '../components/services/fetch';
import { AppContainer } from './App.styled';

axios.defaults.baseURL = 'https://pixabay.com/api/';
export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    
  async function fetchApi() {
      setStatus('pending');

      try {
        const imageData = await fetchImages(searchQuery, page);
        setTotalHits(imageData.total);
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          toast.warning('Nothing was found for your request.');
        }
        setImages(prevImage => [...prevImage, ...imagesHits]);
        setStatus('resolved');

      } catch (error) {
        setError(new Error(`Something went wrong. ${error.message}`))
        toast.error(`Something went wrong.`);
        setStatus('rejected');
    }
}
fetchApi();
}, [searchQuery, page]);

  const handleFormSubmit = query => {
    if (searchQuery === query) {
      return;
    }
    resetState();
    setSearchQuery(query);
  };

  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
    };

  const resetState = () => {
    setSearchQuery('');
    setPage(1);
    setImages([]);
    setSelectedImage(null);
    setAlt(null);
    setStatus('idle');
    setTotalHits(null);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

    return (
      <AppContainer>
        <Searchbar onSubmit={handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" />
        {status === 'pending' && <Loader />}
        {error && (
          <h1 style={{ color: 'orangered', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}
        {images.length > 0 && (
          <ImageGallery
            images={images}
            selectedImage={handleSelectedImage}
          />
        )}
        {images.length > 0 && images.length !== totalHits && (
          <Button onClick={loadMore} />
        )}
        {selectedImage && (
          <Modal
            selectedImage={selectedImage}
            tags={alt}
            onClose={closeModal}
          />
        )}
      </AppContainer>
    );
};