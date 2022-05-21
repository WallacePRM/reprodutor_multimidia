import React from 'react';
import { ReactComponent as Menu } from '@icon/themify-icons/icons/menu.svg';

import './index.css';

function ToggleSidebar(props: ToggleSidebarProps) {

    const handleToggleSidebar = (e: React.MouseEvent) => {
        e.stopPropagation();

        props.toggleSidebar();
    };

    return (
        <div onClick={handleToggleSidebar} className="c-toggle-sidebar btn--icon">
            <Menu className="icon--color"/>
        </div>
    );
};

type ToggleSidebarProps = {
    toggleSidebar: () => void;
}

export default ToggleSidebar;