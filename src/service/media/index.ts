import { ApiMediaService } from "./api-media-service";
import { Media } from "./types";

export interface MediaService {
    getMedias(options?: { type: string }): Promise<Media[]>;
    insertMedias(medias: Blob[]): Promise<Media[]>;
}

// export class LocalMediaService implements MediaService {

//     getMedias(options: { type: string; }): Promise<Media[]> {

//         const medias = JSON.parse(localStorage.getItem("medias") || "[]");

//         return Promise.resolve(medias);
//     }

//     insertMedias(medias: Media[]): Promise<void> {

//         const currentMedias: Media[] = JSON.parse(localStorage.getItem("medias") || "[]");
//         const newMedias = currentMedias.concat(medias);

//         localStorage.setItem('medias', JSON.stringify(newMedias));

//         return Promise.resolve();
//     }
// }

export function getMediaService (): MediaService {
    return new ApiMediaService();
}