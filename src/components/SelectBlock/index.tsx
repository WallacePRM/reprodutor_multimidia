import React, { useEffect, useState } from 'react';

import { ReactComponent as PlayIcon } from '@icon/themify-icons/icons/control-play.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectSelectedFiles, setSelectedFiles } from '../../store/selectedFiles';
import { useDispatch } from 'react-redux';
import { setCurrentMedias } from '../../store/player';
import { setMediaPlaying } from '../../store/mediaPlaying';
import { Media } from '../../service/media/types';
import { setPlayerState } from '../../store/playerState';

import './index.css';

function SelectBlock(props: SelectBlockProps) {

    const [ selected, setSelected ] = useState(false);

    const medias = props.list;
    const selectedItems = useSelector(selectSelectedFiles);
    const dispatch = useDispatch();

    const handleClearSelectedItems = () => {

        dispatch(setSelectedFiles([]));
    };

    const handlePlaySelectedItems = () => {

        const selectedMedias = medias.filter(m => selectedItems.some(s => s.id === m.id));

        dispatch((setCurrentMedias(null)));
        dispatch(setMediaPlaying(null));
        dispatch(setPlayerState({file_id: -1, currentTime: 0, duration: 0}));

        setTimeout(() => {
            dispatch((setCurrentMedias(selectedMedias)));
            dispatch(setMediaPlaying(selectedMedias[0]));
        }, 0);

        dispatch(setSelectedFiles([]));
    };

    const handleSelectAllItems = () => {

        const newSelectState = !selected;

        setTimeout(() => {
            setSelected(newSelectState);

            if (newSelectState) {

                let newSelectedItems = [];
                for (let media of medias) {
                    newSelectedItems.push({id: media.id});
                };

                dispatch(setSelectedFiles(newSelectedItems));
            }
            else {

                dispatch(setSelectedFiles([]));
            }
        }, 0);
    };

    useEffect(() => {

        if (selectedItems.length !== medias.length) {
            setSelected(false);
        }
        else {
            setSelected(true);
        }

    }, [selectedItems]);

    return (
        <div className="c-select-block">
            <div className="c-select-block__info">
                <label onClick={handleSelectAllItems} className="d-flex a-items-center">
                    <input onChange={() => {}} checked={selected} className="checkbox-input" type="checkbox" />
                    <div className="checkbox-box mr-5"></div>
                    <span>{selectedItems.length > 1 ? selectedItems.length + ' itens' : selectedItems.length + ' item'} selecionado</span>
                </label>
                <span onClick={handleClearSelectedItems} className="c-select-block__item--clear accent-color">Limpar</span>
            </div>
            <div className="c-select-block__actions">
                <button onClick={handlePlaySelectedItems} className="c-button box-field btn--primary c-button--no-media-style">
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

type SelectBlockProps = {
    list: Media[];
};

export default SelectBlock;