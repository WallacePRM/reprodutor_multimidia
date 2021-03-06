import './index.css';

function PreLoad(props: PreLoadProps) {
    return (
        <div className={'c-preload ' + (props.className ? props.className : '')}>
            <svg className="c-preload__logo" width="142" height="142" viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="71" cy="71" r="50" transform="rotate(-45 71 71)" fill="url(#paint0_linear_1_3)"/>
                <circle cx="71" cy="71" r="45" fill="#333333"/>
                <g filter="url(#filter0_d_1_3)">
                    <path d="M93.5 66.6699C96.8333 68.5944 96.8333 73.4056 93.5 75.3301L63.5 92.6506C60.1667 94.5751 56 92.1695 56 88.3205L56 53.6795C56 49.8305 60.1667 47.4249 63.5 49.3494L93.5 66.6699Z" fill="white"/>
                </g>
                <defs>
                    <filter id="filter0_d_1_3" x="52" y="48.672" width="48" height="52.6559" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset dy="4"/>
                        <feGaussianBlur stdDeviation="2"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_1_3" x1="71" y1="21" x2="71" y2="121" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFA26D"/>
                        <stop offset="1" stopColor="#C464C6"/>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

type PreLoadProps = {
    className?: string;
};

export default PreLoad;