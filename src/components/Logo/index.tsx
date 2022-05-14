import styles from './index.module.css';
import logo from '../../logo.svg';

function Logo() {
    return (
        <div className={styles['c-logo'] + ' noselect'}>
            <img className={styles['c-logo__image']} src={logo} />
            <h1 className={styles['c-logo__title']}>Reprodutor Multimídia</h1>
        </div>
    );
}

export default Logo;