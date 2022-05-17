import { ReactComponent as Search } from '@icon/themify-icons/icons/search.svg';

import './index.css';

function Searchbar() {
    return (
        <div className="c-searchbar">
            <input className="c-searchbar__field box-field" type="text" placeholder="Pesquisar"/>
            <Search className="c-searchbar__icon icon--color" title="Clique para pesquisar"/>
        </div>
    );
}

export default Searchbar;