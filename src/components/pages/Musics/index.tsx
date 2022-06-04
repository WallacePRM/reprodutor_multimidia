import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faEllipsis, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from '../../../assets/img/music-gradient.svg';
import LineItem from '../../List/LineItem';
import { checkNearToBottom, isVisible } from "../../../common/dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMediaService } from "../../../service/media";
import { selectMedias, setMedias } from "../../../store/medias";
import { Media } from "../../../service/media/types";
import { setCurrentMedias } from "../../../store/player";
import { shuffle, sortAsc } from "../../../common/array";
import { isOdd } from "../../../common/number";
import { convertMediaType, hasSymbol, removeExtension } from "../../../common/string";
import { fileToDataUrl } from "../../../common/blob";
import { selectMediaPlaying, setMediaPlaying } from "../../../store/mediaPlaying";

function Musics(props: MusicsProps) {

    const filterField = 'name';
    const listItems = useSelector(selectMedias);
    const musics = listItems.filter(item => item.type === 'music').sort((a, b) => sortAsc((a as any)[filterField].toLocaleLowerCase(), (b as any)[filterField].toLocaleLowerCase()));
    const listSeparators = createSeparators(musics as any, filterField);
    const [ lastSeparatorInvisible, setLastSeparatorInvisible ] = useState<string | null>(listSeparators[0] || '');
    const dispatch = useDispatch();
    const files: any[] = [];
    const mediaPlaying = useSelector(selectMediaPlaying);

    let timeoutId: any;
    let fileIndex: number = 0;

    const handleSelectFile = async (e: React.ChangeEvent<any>) => {

        const input = e.currentTarget;
        const fileList = input.files || [];

        if (fileList.length > 0) {
            for (let i = 0; i < fileList.length; i++) {

                if (convertMediaType(fileList[i].type) === 'music') {
                    files.push({
                        id: Date.now() + Math.random(), // Para desenvolvimento
                        name: removeExtension(fileList[i].name),
                        type: 'music',
                        src: await fileToDataUrl(fileList[i]),
                        releaseDate: fileList[i].lastModifiedDate.toString(),
                        duration: 0,
                        singer: '',
                        cover: '',
                        isPlaying: false,
                    });
                }
            };
        }

        await getMediaService().insertMedias(files);
        dispatch(setMedias(listItems.concat(files)));
    };

    const handleSelectMedia = (file: Media) => {

        dispatch(setCurrentMedias(musics));
        if (mediaPlaying?.id !== file.id) {
            dispatch(setMediaPlaying(file));
        }
        else {
            dispatch(setMediaPlaying(null));
            setTimeout(() => dispatch(setMediaPlaying(file)), 0);
        }
    };

    const handleShuffle = () => {

        const shuffled = shuffle(musics);
        dispatch(setCurrentMedias(shuffled));
        if (mediaPlaying?.id !== shuffled[0].id) {
            dispatch(setMediaPlaying(shuffled[0]));
        }
        else {
            dispatch(setMediaPlaying(null));
            setTimeout(() => dispatch(setMediaPlaying(shuffled[0])), 0);
        }
    };

    return (
        <div className="c-page c-musics">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Música</h1>
                <div className="c-container__header__actions">
                    { musics.length > 0 ? <>
                    <Button onRead={ handleSelectFile } onlyFolder accept="audio/mp3" icon={faFolderClosed} title="Adicionar uma pasta à biblioteca de músicas" label="Adicionar uma pasta" />
                    </> : null }
                </div>
            </div>

            { musics.length > 0 ?
            <div className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <Button onClick={ handleShuffle } className="btn--primary c-button--no-media-style" label="Ordem aleatória e reproduzir" icon={faShuffle} title={ document.body.clientWidth <= 655 ? 'Ordem aleatória e reproduzir' : ''}/>
                    <div className="c-container__content__title__actions">
                        <div className="c-container__content__title__actions__item box-field box-field--transparent">
                            <label>Ordernar por: <span className="accent--color">A - Z</span></label>
                            <FontAwesomeIcon className="box-field__icon ml-10" icon={faChevronDown} />
                        </div>
                        <div className="c-container__content__title__actions__item c-container__content__title__actions__item--options btn--icon">
                            <FontAwesomeIcon icon={faEllipsis}/>
                        </div>
                    </div>
                </div>
            </div> : null }

            <div className="c-container__content" style={{ height: musics.length === 0 ? '100%' : '' }}>
                { musics.length === 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Não foi possível encontrar nenhuma música"
                    description="Sua biblioteca de música não contém nenhum conteúdo de música."
                    button={
                    <div className="d-flex a-items-center">
                        <Button onRead={ handleSelectFile } onlyFolder accept="audio/mp3" className="btn--primary c-button--no-media-style" icon={faFolderClosed} title="Adicionar pasta" label="Adicionar uma pasta" />
                    </div>}
                /> :
                <>
                    <div className="c-list c-line-list">
                    <div className={'c-line-list__separator c-line-list__separator--fixed z-index-1'}>{lastSeparatorInvisible}</div>

                        {
                            listSeparators.map((separator) => {

                                const elements: React.ReactNode[] = [];
                                elements.push(<div className={'c-line-list__separator'} key={separator}>{separator}</div>);

                                const musicsFiltred = musics.filter(item => mapListSeparators(((item as any)[filterField] || '').charAt(0).toLocaleUpperCase()) === separator);
                                musicsFiltred.forEach((item) => {

                                    elements.push(<LineItem onClick={ handleSelectMedia } className={(isOdd(fileIndex) ? 'c-line-list__item--nostyle' : '') + (item.id === mediaPlaying?.id ? ' c-line-list__item--active' : '')} file={item} key={item.id}/>);
                                    fileIndex++;
                                });

                                return elements;
                            })
                        }
                    </div>
                </>
                }
            </div>
        </div>
    );
}

function mapListSeparators(letter: string) {

    // Se for número, adicionar #
    if (!isNaN(parseInt(letter))) return '#';

    // Se for caractere especial, adicionar &
    if (hasSymbol(letter))  return '&';

    return letter;
}

function createSeparators(listItems: Media[], filterField = 'name') {

    const listSeparators: string[] = listItems.reduce((obj, item) => {

        const firstLetter = mapListSeparators(((item as any)[filterField] || '').charAt(0).toLocaleUpperCase());
        if (!obj.index[firstLetter]) {
            obj.index[firstLetter] = true;

            obj.separators.push(firstLetter);
        }

        return obj;

    }, { index: {} as any, separators: [] as string[] }).separators;

    return listSeparators;
}

function createLastSeparator() {

    const separators: HTMLElement[] = Array.prototype.slice.call(document.querySelectorAll('.c-line-list__separator:not(.c-line-list__separator--fixed)') as NodeListOf<HTMLElement>, 0);
    const separatorsFormatd = separators.map(separator => ({
        isVisible: isVisible(separator),
        letter: separator.innerText
    }));

    const firstIndex = separatorsFormatd.findIndex(separator => separator.isVisible);

    if (firstIndex > 0) {
        const lastSeparator = separatorsFormatd[firstIndex - 1];
        return (lastSeparator.letter);
    }
    else {
        return (separatorsFormatd[0].letter);
    }
}

type MusicsProps = {

}

export default Musics;
