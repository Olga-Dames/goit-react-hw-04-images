import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import api from '../../services/ApiService';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import SearchBar from '../SearchBar';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { Container } from './App.styled';
import { Error } from './App.styled';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [largeImgURL, setLargeImgURL] = useState('');
  const [tags, setTags] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getImages(searchQuery, page);
  }, [page, searchQuery]);

  const getQueryOnSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  const getImages = async (searchQuery, page) => {
    if (!searchQuery) {
      return;
    }
    try {
      setIsLoading(true);
      const { hits } = await api.getImages(searchQuery, page);
      if (hits.length === 0) {
        toast.warning('Oops, there is no images on this request');
      }
      setImages(prevImages => [...prevImages, ...hits]);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 1000,
      delay: 100,
      smooth: true,
    });
  };

  const openModal = (largeImgURL, tags) => {
    setIsModalOpen(true);
    setLargeImgURL(largeImgURL);
    setTags(tags);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const content = images.length > 0;

  return (
    <Container>
      <SearchBar onSubmit={getQueryOnSubmit} />
      {content && <ImageGallery images={images} openModal={openModal} />}
      {content && !isLoading && <Button onClickLoad={handleLoadMore} />}
      {isModalOpen && (
        <Modal largeImageURL={largeImgURL} tags={tags} onClose={closeModal} />
      )}
      {isLoading && <Loader />}
      {error && (
        <Error>It's a pity, but something went wrong. Try a bit later!</Error>
      )}
      <ToastContainer autoClose={3000} />
    </Container>
  );
};

export default App;
