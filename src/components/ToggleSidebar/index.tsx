import React from 'react';
import { ReactComponent as Menu } from '@icon/themify-icons/icons/menu.svg';

import './index.css';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/sidebarOpened';

function ToggleSidebar(props: ToggleSidebarProps) {

    const dispatch = useDispatch();
    const handleToggleSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();

        dispatch(toggleSidebar());
    };

    return (
        <div onClick={handleToggleSidebar} className="c-toggle-sidebar btn--icon">
            <Menu className="icon--color"/>
        </div>
    );
};

type ToggleSidebarProps = {

}

export default ToggleSidebar;