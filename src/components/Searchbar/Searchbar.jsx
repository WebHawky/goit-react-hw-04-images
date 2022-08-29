import { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

import s from './Searchbar.module.scss';

export default function Searchbar({ onSubmit }) {
  const [searchPhotoName, setSearchPhotoName] = useState('');

  const changeInputValueHandler = e => {
    const { value } = e.target;

    setSearchPhotoName(value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchPhotoName.trim() === '') {
      alert('Input field can not be empty');
      return;
    }

    onSubmit(searchPhotoName);
    setSearchPhotoName('');
  };

  return (
    <>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchForm_button}>
            <FcSearch size={28} />
            <span className={s.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={s.SearchForm_input}
            type="text"
            value={searchPhotoName}
            onChange={changeInputValueHandler}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
