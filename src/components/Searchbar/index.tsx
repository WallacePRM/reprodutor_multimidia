import React from 'react';
import { ReactComponent as Search } from '@icon/themify-icons/icons/search.svg';

import './index.css';

function Searchbar(props: SearchbarProps) {

    const handleToggleSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!props.sidebarIsOpened) {
            props.toggleSidebar();
        }
    };

    return (
        <div onClick={handleToggleSidebar} className={'c-searchbar' + (props.sidebarIsOpened ? ' c-searchbar--opened' : '')}>
            <input className="c-searchbar__field box-field" type="text" placeholder="Pesquisar"/>
            <Search className="c-searchbar__icon icon--color icon--inverted" title="Clique para pesquisar"/>
        </div>
    );
}

type SearchbarProps = {
    sidebarIsOpened: boolean;
    toggleSidebar: () => void;
}

export default Searchbar;