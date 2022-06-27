import React, { useRef } from 'react';

import { ReactComponent as PlayIcon } from '@icon/themify-icons/icons/control-play.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

import './index.css';

function SelectBlock() {

    const inputId = Date.now() + Math.random().toString();

    return (
        <div className="c-select-block">
            <div className="c-select-block__info">
                <label className="d-flex a-items-center" htmlFor={inputId}>
                    <input id={inputId} className="checkbox-input" type="checkbox" />
                    <div className="checkbox-box mr-5"></div>
                    <span>1 item selecionado</span>
                </label>
                <span className="c-select-block__item--clear accent-color">Limpar</span>
            </div>
            <div className="c-select-block__actions">
                <button className="c-button box-field btn--primary c-button--no-media-style">
                    <PlayIcon className="c-button__icon icon-color--inverted mr-5"/>
                    <span className="c-button__label">Reproduzir</span>
                </button>
                <button className="c-button box-field ml-10">
                    <FontAwesomeIcon icon={faEllipsis} className="c-button__icon icon-color"/>
                </button>
            </div>
        </div>
    );
}

export default SelectBlock;