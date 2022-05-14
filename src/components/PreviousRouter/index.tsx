import { ReactComponent as ArrowLeft } from '@icon/themify-icons/icons/arrow-left.svg';

import "./index.css";

function PreviousRouter(props: PreviousRouterProps) {
    return (
        <div title={ props.title ? props.title : '' } className={'c-previous-router btn--icon' + (!window.history.state ? ' icon--disabled' : '')}>
            <ArrowLeft />
        </div>
    );
}

type PreviousRouterProps = {
    title?: string,
};

export default PreviousRouter;