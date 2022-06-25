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

    public async removeMedia(id: number) {

        const response = await fetch(urlBase + `/medias/${id}`, {
            method: 'DELETE'
        });

        if (response.status !== 200) {
            throw new Error(`Error ${response.status}`);
        }
    }

    public async putMedia(media: Partial<Media>) {

        const response = await fetch(urlBase + '/medias', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(media)
        });
        if (response.status !== 200) {
            throw new Error(`Error ${response.status}`);
        }
    }
}