import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header>
      <p className={cx('header')}>Header</p>
    </header>
  );
}

export default Header;