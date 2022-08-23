import { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Searchbar.module.scss';

export default class Searchbar extends Component {
  state = {
    searchPhotoName: '',
  };

  changeInputValueHandler = e => {
    const { value } = e.target;

    this.setState({ searchPhotoName: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchPhotoName.trim() === '') {
      alert('Input field can not be empty');
      return;
    }

    this.props.onSubmit(this.state.searchPhotoName);
    this.setState({ searchPhotoName: '' });
  };

  render() {
    return (
      <>
        <header className={s.Searchbar} onSubmit={this.handleSubmit}>
          <form className={s.SearchForm}>
            <button type="submit" className={s.SearchForm_button}>
              <span className={s.SearchForm_button_label}>Search</span>
            </button>

            <input
              className={s.SearchForm_input}
              type="text"
              value={this.state.searchPhotoName}
              onChange={this.changeInputValueHandler}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
