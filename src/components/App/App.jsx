import { Component } from 'react';
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

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    isLoading: false,
    error: null,
    page: 1,
    largeImageURL: '',
    tags: '',
    isModalOpen: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getImages(searchQuery, page);
    }
  }

  getQueryOnSubmit = searchQuery => {
    this.setState({ searchQuery, images: [], page: 1 });
  };

  getImages = async (searchQuery, page) => {
    this.setState({ isLoading: true });
    if (!searchQuery) {
      return;
    }
    try {
      const { hits } = await api.getImages(searchQuery, page);
      if (hits.length === 0) {
        toast.warning('Oops, there is no images on this request');
      }
      this.setState(state => ({
        images: [...state.images, ...hits],
      }));
    } catch (error) {
      this.setState({ error: error.message });
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    scroll.scrollToBottom({
      duration: 1000,
      delay: 100,
      smooth: true,
    });
  };

  openModal = (largeImageURL, tags) => {
    this.setState({
      isModalOpen: true,
      largeImageURL: largeImageURL,
      tags: tags,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  render() {
    const { images, isLoading, error, isModalOpen, largeImageURL, tags } =
      this.state;
    const content = images.length > 0;
    return (
      <Container>
        <SearchBar onSubmit={this.getQueryOnSubmit} />
        {content && <ImageGallery images={images} openModal={this.openModal} />}
        {content && !isLoading && <Button onClickLoad={this.handleLoadMore} />}
        {isModalOpen && (
          <Modal
            largeImageURL={largeImageURL}
            tags={tags}
            onClose={this.closeModal}
          />
        )}
        {isLoading && <Loader />}
        {error && (
          <Error>It's a pity, but something went wrong. Try a bit later!</Error>
        )}
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}
