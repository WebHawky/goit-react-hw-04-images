import { Component } from 'react';

import { Button, ImageGallery, Loader, Modal, Searchbar, Api } from './index';
import s from '../styles.css';

export default class App extends Component {
  state = {
    galleryCollection: null,
    searchPhotoName: '',
    page: 1,
    error: '',
    loading: false,
    showModal: false,
    selectImageURL: '',
  };

  componentDidUpdate(_, prevState) {
    const prevPhotoName = prevState.searchPhotoName;
    const prevPage = prevState.page;
    const { searchPhotoName, page } = this.state;

    if (prevPhotoName !== searchPhotoName) {
      this.setState({ page: 1 });
    }
    if (prevPhotoName !== searchPhotoName || prevPage !== page) {
      this.fetchGallery(searchPhotoName, page);
    }
  }

  async fetchGallery(searchPhotoName, page) {
    try {
      this.setState({ loading: true });
      const response = await Api.galleryFetch(searchPhotoName, page);
      if (page !== 1) {
        this.setState(prevState => ({
          galleryCollection: [...prevState.galleryCollection, ...response],
        }));
      } else {
        this.setState({ galleryCollection: response });
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  submitHandler = searchPhotoName => {
    this.setState({ searchPhotoName });
  };

  handlerLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handlerSearchURL = photoURL => {
    this.setState({ selectImageURL: photoURL });

    this.setState({ showModal: true });
  };

  closeModalWindow = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { galleryCollection, selectImageURL, showModal } = this.state;

    return (
      <div className={s.App}>
        <Searchbar className={s.Searchbar} onSubmit={this.submitHandler} />
        {this.state.loading && <Loader />}
        {galleryCollection && (
          <ImageGallery
            onClick={this.handlerSearchURL}
            className={s.ImageGallery}
            collections={galleryCollection}
          />
        )}
        {galleryCollection !== null && galleryCollection.length > '0' && (
          <Button fetchHandler={this.handlerLoadMore} />
        )}
        {showModal && (
          <Modal
            onClose={this.closeModalWindow}
            selectedPhotoUrl={selectImageURL}
          />
        )}
      </div>
    );
  }
}
