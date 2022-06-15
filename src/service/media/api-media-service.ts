import { MediaService } from ".";
import { Media } from "./types";

export const urlBase = window.location.hostname === 'localhost' ? 'http://localhost:5004' : 'https://api.media.com';

export class ApiMediaService implements MediaService {

    public async getMedias(options: { type: string; }): Promise<Media[]> {

        const response = await fetch(urlBase + '/medias', {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status !== 200) {
            throw new Error(`Error ${response.status}`);
        }

        const medias = await response.json();
        return medias;
    }

    public async insertMedias(medias: Blob[]): Promise<Media[]> {

        const formData = new FormData();
        for (const media of medias) {
            formData.append('files', media);
        }

        const response = await fetch(urlBase + '/medias/upload', {
            method: 'POST',
            body: formData
        });

        if (response.status !== 200) {
            throw new Error(`Error ${response.status}`);
        }

        const newMedias = await response.json();
        return newMedias;
    }
}