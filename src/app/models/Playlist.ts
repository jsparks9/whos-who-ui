import {Song} from "./Song";

export class Playlist {
    created?: string;
    songs!: Song[];
    name!: string;
    createdBy!: string;
}