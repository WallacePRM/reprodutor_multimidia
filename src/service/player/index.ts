import { LastMedia } from "./types";

export interface PlayerService {
    getLastMedia(): Promise<LastMedia>;
    insertLastMedia(lastMedia: LastMedia): Promise<void>;
}

export class LocalPlayerService implements PlayerService {

    getLastMedia(): Promise<LastMedia> {

        const lastMedia = JSON.parse(localStorage.getItem("lastMedia") || "{ file_id: 0, duration: 0, currentTime: 0 }");

        return Promise.resolve(lastMedia);
    }

    insertLastMedia(lastMedia: LastMedia): Promise<void> {

        this.getLastMedia().then(media => {
            const newLastMedia = { ...media, ...lastMedia };
            localStorage.setItem('lastMedia', JSON.stringify(newLastMedia));
        });

        return Promise.resolve();
    }
}

export function getPlayerService(): PlayerService {
    return new LocalPlayerService();
}