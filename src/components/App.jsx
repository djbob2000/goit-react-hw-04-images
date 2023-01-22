import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader/Loader';
import fetchImage from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetImage, setTargetImage] = useState(null);

  // когда жмем на кнопку поиск это срабатует
  const onSubmit = value => {
    if (!value) {
      toast.error('Please enter word for search');
    }
    setImages([]);
    setSearchQuery(value);
    setPage(1);
  };

  const onButtonMoreClick = () => {
    setPage(page + 1);
  };

  const toggleModal = ({ status, src, alt }) => {
    if (status) {
      setTargetImage({ src, alt });
      setIsModalOpen(true);
    } else {
      setTargetImage(null);
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const searchImages = async ({ searchQuery, page }) => {
      setIsLoading(true);

      try {
        const data = await fetchImage(searchQuery, page);
        const { hits, totalHits } = data;
        const filteredHits = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );

        if (page === 1) {
          totalHits
            ? setTotalHits(totalHits)
            : toast.error('No images find from your request');
          setImages(filteredHits);
        } else {
          setImages(prevState => [...prevState, ...filteredHits]);
        }
      } catch (error) {
        console.log(error);
        toast.error('error');
      } finally {
        setIsLoading(false);
      }
    };
    searchImages({ searchQuery, page });
  }, [searchQuery, page]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />

      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {images.length === 0 || totalHits === images.length || isLoading || (
        <Button onClick={onButtonMoreClick} />
      )}

      {isLoading && <Loader />}

      {isModalOpen && (
        <Modal
          src={targetImage.src}
          alt={targetImage.alt}
          toggleModal={toggleModal}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
