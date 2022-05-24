import React, { useRef } from 'react';
import { ReactComponent as Search } from '@icon/themify-icons/icons/search.svg';

import './index.css';

function Searchbar(props: SearchbarProps) {

    const inputRef: any = useRef(null);

    const handleToggleSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (!props.sidebarIsOpened) {
            props.toggleSidebar();
        }

        inputRef.current && inputRef.current.focus();
    };

    return (
        <div onClick={document.body.clientWidth < 999 && document.body.clientWidth > 655 ? handleToggleSidebar : (e) => e.stopPropagation()} className={'c-searchbar' + (props.sidebarIsOpened ? ' c-searchbar--opened' : '')}>
            <input ref={inputRef} className="c-searchbar__field box-field" type="text" placeholder="Pesquisar"/>
            <Search className="c-searchbar__icon icon--color icon--inverted" title="Clique para pesquisar"/>
        </div>
    );
}

type SearchbarProps = {
    sidebarIsOpened: boolean;
    toggleSidebar: () => void;
}

export default Searchbar;