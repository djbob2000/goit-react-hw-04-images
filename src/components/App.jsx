import React, { useState, useEffect } from 'react';
import Loader from './Loader/Loader';
import fetchImage from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Notify from './Notify/Notify';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import css from './App.module.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetImage, setTargetImage] = useState(null);

  // когда жмем на кнопку поиск это срабатует
  const onSubmit = value => {
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
    const searchImages = async () => {
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
          setTotalHits(totalHits);
          setImages(filteredHits);
        } else {
          setImages(prevState => [...images, ...filteredHits]);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    searchImages();
  }, [page, searchQuery]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {error && (
        <Notify message={`Huston, we have a problem: ${error.message}`} />
      )}

      {images.length > 0 && (
        <ImageGallery images={images} toggleModal={toggleModal} />
      )}

      {images.length === 0 || totalHits === images.length || isLoading || (
        <Button onClick={onButtonMoreClick} />
      )}

      {isLoading && <Loader />}

      {totalHits === 0 && <Notify message="Nothing. Empty from your query." />}

      {isModalOpen && (
        <Modal
          src={targetImage.src}
          alt={targetImage.alt}
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default App;
