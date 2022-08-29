import { useState, useEffect } from 'react';

import { Button, ImageGallery, Loader, Modal, Searchbar, Api } from './index';
import s from '../styles.css';

export default function App() {
  const [galleryCollection, setGalleryCollection] = useState(null);
  const [searchPhotoName, setSearchPhotoName] = useState('');
  const [page, setPage] = useState(1);
  const [setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectImageURL, setSelectImageURL] = useState('');
  const [prevSearchedPhoto, setPrevSearchedPhoto] = useState('');

  useEffect(() => {
    setPrevSearchedPhoto(searchPhotoName);
    if (searchPhotoName) {
      const fetchGallery = async () => {
        try {
          setLoading(true);
          const response = await Api.galleryFetch(searchPhotoName, page);
          if (searchPhotoName !== prevSearchedPhoto && page !== 1) {
            setPage(1);
          } else if (page !== 1) {
            setGalleryCollection(prevState => [...prevState, ...response]);
          } else {
            setGalleryCollection(response);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchGallery(searchPhotoName, page);
    }
  }, [page, prevSearchedPhoto, searchPhotoName, setError]);

  const submitHandler = inputPhotoName => {
    setPrevSearchedPhoto(searchPhotoName);
    setSearchPhotoName(inputPhotoName);
  };

  const handlerLoadMore = () => {
    setPage(page + 1);
  };

  const handlerSearchURL = photoURL => {
    setSelectImageURL(photoURL);

    setShowModal(true);
  };

  const closeModalWindow = () => {
    setShowModal(false);
  };

  return (
    <div className={s.App}>
      <Searchbar className={s.Searchbar} onSubmit={submitHandler} />
      {loading && <Loader />}
      {galleryCollection && (
        <ImageGallery
          onClick={handlerSearchURL}
          className={s.ImageGallery}
          collections={galleryCollection}
        />
      )}
      {galleryCollection !== null && galleryCollection.length > '0' && (
        <Button fetchHandler={handlerLoadMore} />
      )}
      {showModal && (
        <Modal onClose={closeModalWindow} selectedPhotoUrl={selectImageURL} />
      )}
    </div>
  );
}
