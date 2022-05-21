import { ReactComponent as ArrowLeft } from '@icon/themify-icons/icons/arrow-left.svg';
import { useNavigate,  } from 'react-router-dom'



import "./index.css";

function PreviousRouter(props: PreviousRouterProps) {

    const navigate = useNavigate();
    const handleBackToPrevious = () => {
        navigate(-1);
    }

    return (
        <div title={ props.title ? props.title : '' } className={'c-previous-router btn--icon' + (window.history.state && window.history.state.idx === 0 ? ' icon--disabled' : '')}>
            <ArrowLeft onClick={handleBackToPrevious} className="icon--color"/>
        </div>
    );
}

type PreviousRouterProps = {
    title?: string,
};

export default PreviousRouter;