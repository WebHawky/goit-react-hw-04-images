import { Oval } from 'react-loader-spinner';
import s from './Loader.module.scss';

export default function Loader() {
  return (
    <div className={s.loader}>
      <Oval color="#00BFFF" height="150" width="150" radius="12" />
    </div>
  );
}
