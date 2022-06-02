export type Media = {
    id: number,
    type: string,
    name: string;
    singer?: string;
    genre?: string;
    cover?: string,
    musicSrc: string,
    duration: number,
    isPlaying: boolean,
    releaseDate: string,
};