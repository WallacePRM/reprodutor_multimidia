import { Media } from "./types";

export interface MediaService {
    getMedias(options?: { type: string }): Promise<Media[]>;
    insertMedias(medias: Media[]): Promise<void>;
}

export class LocalMediaService implements MediaService {

    getMedias(options: { type: string; }): Promise<Media[]> {

        const medias = JSON.parse(localStorage.getItem("medias") || "[]");

        return Promise.resolve(medias);
    }

    insertMedias(medias: Media[]): Promise<void> {

        const currentMedias: Media[] = JSON.parse(localStorage.getItem("medias") || "[]");
        const newMedias = currentMedias.concat(medias);

        localStorage.setItem('medias', JSON.stringify(newMedias));

        return Promise.resolve();
    }
}

export class ApiMediaService implements MediaService {

    getMedias(options: { type: string; }): Promise<Media[]> {
        throw new Error("Method not implemented.");
    }

    insertMedias(medias: Media[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export function getMediaService (): MediaService {
    return new LocalMediaService();
}