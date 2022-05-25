import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { WindowState } from '../../../App.hook';
import { ReactComponent as ErrorSvg } from '../../../assets/img/404.svg';
import { selectPlayerTransparency } from '../../../store/playerTransparent';
import './index.css';

function NotFound(props: NotFoundProps) {

    const playerTransparent = useSelector(selectPlayerTransparency);

    return (
        <div className="c-notfound" style={{ marginBottom: playerTransparent ? '7.3rem' : '' }}>
            <div className="c-notfound__img">
                <ErrorSvg />
            </div>
            <div className="c-notfound__message">
                <h1  className="c-notfound__title">Ooops...404!</h1>
                <span  className="c-notfound__description">A página solicitada não pôde ser encontrada.</span>
            </div>
            <Link to="/" className="link">Voltar para o início</Link>
        </div>
    );
}

type NotFoundProps = {

}

export default NotFound;