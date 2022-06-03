export type Media = {
    id: number,
    type: string,
    name: string;
    singer?: string;
    genre?: string;
    cover?: string,
    src: string,
    duration: number,
    isPlaying: boolean,
    releaseDate: string,
};