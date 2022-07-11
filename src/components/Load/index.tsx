import React from 'react';

import './index.css';

function Load() {
    return (
        <div onClick={e => e.stopPropagation()} className="c-load-container">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Load;