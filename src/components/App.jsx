import { useState, useEffect } from 'react';
import  {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Loader} from './Loader/Loader';
import {Message} from './Message/Message';
import  Modal  from './Modal/Modal';
import IconButton from './IconButton/IconButton';
import { ReactComponent as CloseIcon } from './icons/close.svg';


import fetchImages from '../api/api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setPage] = useState(1);
  const [searchQuery, setQuery] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [largeImage, setlargeImage] = useState('');
  const [error, setError] = useState(null);

  
  useEffect(() => {
    if (!searchQuery) return;

    getImages();
    // eslint-disable-next-line
  }, [searchQuery]);

  
  const onChangeQuery = query => {
    setImages([]);
    setPage(1);
    setQuery(query);
    setLoading(false);
    setModal(false);
    setlargeImage('');
    setError(null);
  };

  
  const getImages = async () => {
    setLoading(true);

    try {
      const { hits } = await fetchImages(searchQuery, currentPage);

      setImages(prev => [...prev, ...hits]);

      setPage(prevPage => prevPage + 1);

      if (currentPage !== 1) {
        scrollOnLoadButton();
      }
    } catch (error) {
      console.log('Smth wrong with App fetch', error);
      setError({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryItem = fullImageUrl => {
    setlargeImage(fullImageUrl);
    setModal(true);
  };

  const toggleModal = () => {
    setModal(prevModal => !prevModal);
  };

  
  const scrollOnLoadButton = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const needToShowLoadMore = images.length > 0 && images.length >= 12; 

  return (
    <>
      <Searchbar onSearch={onChangeQuery} />

      {images.length < 1 && (
        <Message>
          <h2>The gallery is empty 🙁</h2>
          <p>Use search field!</p>
        </Message>
      )}

      <ImageGallery images={images} onImageClick={handleGalleryItem} />

      {needToShowLoadMore && <Button onClick={getImages} />}

      {showModal && (
        <Modal onClose={toggleModal}>
          <div id="Close-box">
            <IconButton onClick={toggleModal} aria-label="Close modal">
              <CloseIcon width="20px" height="20px" fill="#7e7b7b" />
            </IconButton>
          </div>
          <img src={largeImage} alt="" className="Modal-image" />
        </Modal>
      )}

      {isLoading && <Loader />}

      {error && (
        <Message>
          <h2>Oops! 😫</h2>
          <p>
            Sorry, something went wrong. Please try again, or{' '}
            <a href="/">refresh the page</a>.
          </p>
        </Message>
      )}
    </>
  );
};

