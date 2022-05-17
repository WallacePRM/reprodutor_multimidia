import { ReactComponent as Menu } from '@icon/themify-icons/icons/menu.svg';

import './index.css';

function ToggleSidebar() {
    return (
        <div className="c-toggle-sidebar btn--icon">
            <Menu className="icon--color"/>
        </div>
    );
};

export default ToggleSidebar;