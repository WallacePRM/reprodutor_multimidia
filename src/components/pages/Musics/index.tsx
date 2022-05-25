import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { faFolderClosed } from "@fortawesome/free-regular-svg-icons";
import Button from "../../Button";
import EmptyMessage from "../../EmptyMessage";
import emptyMessageIcon from '../../../assets/img/music-gradient.svg';
import File from '../../List/LineItem';

import { playlist, PlaylistProps } from "../../Player/config";
import { checkNearToBottom, hasSymbol, isOdd, sortAsc, isVisible } from "../../../common/utils";
import { useState } from "react";
import { WindowState } from "../../../App.hook";
import { useDispatch } from "react-redux";
import { setPlayerTransparent } from "../../../store/playerTransparent";

function Musics(props: MusicsProps) {

    const filterField = 'name';
    const listItems = playlist.filter(item => item.type === 'music').sort((a, b) => sortAsc((a as any)[filterField].toLocaleLowerCase(), (b as any)[filterField].toLocaleLowerCase()));
    const listSeparators = createSeparators(listItems as any, filterField);
    const [ lastSeparatorInvisible, setLastSeparatorInvisible ] = useState<string | null>(listSeparators[0] || '');
    const dispatch = useDispatch();

    let timeoutId: any;
    let fileIndex: number = 0;

    const onScrollToBottom = () => {

        // 116.8
        if (checkNearToBottom(document.querySelector('.c-list'), 120)) {
            dispatch(setPlayerTransparent({ isTransparent: false }));
        }
        else {
            dispatch(setPlayerTransparent({ isTransparent: true }));
        }

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {

            setLastSeparatorInvisible(createLastSeparator());
        }, 100);
    };

    return (
        <div className="c-page c-musics">
            <div className="c-container__header">
                <h1 className="c-container__header__title">Música</h1>
                <div className="c-container__header__actions">
                    { Object.keys(listItems[0]).length > 0 ? <>
                    <Button icon={faFolderClosed} title="Adicionar uma pasta à biblioteca de músicas" label="Adicionar uma pasta" />
                    </> : null }
                </div>
            </div>

            { Object.keys(listItems[0]).length > 0 ?
            <div className="c-container__content__title">
                <div className="d-flex a-items-center">
                    <Button className="btn--primary" label="Ordem aleatória e reproduzir" icon={faShuffle} title={ document.body.clientWidth <= 655 ? 'Ordem aleatória e reproduzir' : ''}/>
                    <div className="c-container__content__title__actions">
                        <div className="box-field box-field--transparent">
                            <label>Ordernar por: <span className="accent--color">A - Z</span></label>
                            <FontAwesomeIcon className="box-field__icon ml-10" icon={faChevronDown} />
                        </div>
                    </div>
                </div>
            </div> : null }

            <div className="c-container__content" style={{ height: Object.keys(listItems[0]).length === 0 ? '100%' : '' }}>
                { Object.keys(listItems[0]).length === 0 ?  <EmptyMessage icon={emptyMessageIcon}
                    title="Não foi possível encontrar nenhuma música"
                    description="Sua biblioteca de música não contém nenhum conteúdo de música."
                    button={
                    <div className="d-flex a-items-center">
                        <Button className="btn--primary box-field--nom" icon={faFolderClosed} title="Adicionar pasta" label="Adicionar uma pasta" />
                    </div>}
                /> :
                <>
                    <div onScroll={onScrollToBottom} className="c-list c-line-list">
                    <div className={'c-line-list__separator c-line-list__separator--fixed z-index-1'}>{lastSeparatorInvisible}</div>

                        {
                            listSeparators.map((separator) => {

                                const elements: React.ReactNode[] = [];
                                elements.push(<div className={'c-line-list__separator'} key={separator}>{separator}</div>);

                                const listItemsFiltred = listItems.filter(item => mapListSeparators(((item as any)[filterField] || '').charAt(0).toLocaleUpperCase()) === separator);
                                listItemsFiltred.forEach((item) => {

                                    elements.push(<File className={isOdd(fileIndex) ? 'c-line-list__item--nostyle' : ''} file={item} key={item.id}/>);
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

    // Se for caracter especial, adicionar &
    if (hasSymbol(letter))  return '&';

    return letter;
}

function createSeparators(listItems: PlaylistProps[], filterField = 'name') {

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
