import { ReactComponent as Search } from '@icon/themify-icons/icons/search.svg';

import styles from './index.module.css';

function Searchbar() {
    return (
        <div className={styles['c-searchbar']}>
            <input className={styles['c-searchbar__field'] + ' box-field'} type="text" placeholder="Pesquisar"/>
            <Search className={styles['c-searchbar__icon'] + ' icon--inverted'} />
        </div>
    );
}

export default Searchbar;