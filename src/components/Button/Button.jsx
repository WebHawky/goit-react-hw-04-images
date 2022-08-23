import PropTypes from 'prop-types';
import s from './Button.module.scss';

export default function Button({ fetchHandler }) {
  return (
    <div className={s.Button_container}>
      <button className={s.Button} onClick={fetchHandler}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  fetchHandler: PropTypes.func.isRequired,
};
