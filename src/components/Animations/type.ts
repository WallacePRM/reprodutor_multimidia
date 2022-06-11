export type AnimationsProps = {
    className?: string;
    cssAnimation: string[];
    style?: {};
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void;
    onClick?: React.ReactEventHandler;
    children: React.ReactNode;
};