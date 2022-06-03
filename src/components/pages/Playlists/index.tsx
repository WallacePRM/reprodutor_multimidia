import { faChevronDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import emptyMessageIcon from '../../../assets/img/yt-gradient.svg';
import { checkNearToBottom } from '../../../common/dom';
import { setPlayerTransparent } from '../../../store/playerTransparent';
import Button from '../../Button';
import EmptyMessage from '../../EmptyMessage';
import GridItem from '../../List/GridItem';

function Playlists() {

    const playlists: any[] = [];
    const dispatch = useDispatch();

    const handleSelectMedia = () => {

    };

    const onScrollToBottom = () => {

        // 116.8
        if (checkNearToBottom(document.querySelector('.c-list'), 120)) {
            dispatch(setPlayerTransparent({ isTransparent: false }));
        }
        else {
            dispatch(setPlayerTransparent({ isTransparent: true }));
        }
    };

    return (
        <div className="c-page c-playlists">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Playlists</h1>
            </div>

            { playlists.length > 0 ?
            <div className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <Button className="btn--primary c-button--no-media-style" label="Nova playlist" icon={faPlus} />
                    <div className="c-container__content__title__actions">
                        <div className="c-container__content__title__actions__item box-field box-field--transparent">
                            <label>Ordernar por: <span className="accent--color">A - Z</span></label>
                            <FontAwesomeIcon className="box-field__icon ml-10" icon={faChevronDown} />
                        </div>
                    </div>
                </div>
            </div> : null }

            <div className="c-container__content" style={{ height: playlists.length === 0 ? '100%' : '' }}>
                { playlists.length == 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Você não tem playlists"
                    button={<div className="d-flex a-items-center">
                    <Button className="btn--primary c-button--no-media-style" label="Criar uma nova lista de reprodução" icon={faPlus}/>
                    </div>}
                /> :
                <>
                    <div onScroll={onScrollToBottom} className="c-list c-grid-list">
                        {playlists.map((item) => <GridItem className="c-grid-list__item--video"  onClick={ handleSelectMedia } file={item} key={item.id}/>)}
                    </div>
                </>
                }
            </div>
        </div>
    );
}

export default Playlists;