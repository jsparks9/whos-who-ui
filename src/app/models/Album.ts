import {Expose} from "class-transformer";
import {Image} from "./Image";
import {Artist} from "./Artist";
import {ExternalUrls} from "./ExternalUrls";

export class Album {
    @Expose() album_group!: string;
    @Expose() album_type!: string;
    @Expose() artists!: Artist[];
    @Expose() available_markets!: string[];
    @Expose() external_urls!: ExternalUrls;
    @Expose() href!: string;
    @Expose() id!: string;
    @Expose() images!: Image[];
    @Expose() name!: string;
    @Expose() release_date!: string;
    @Expose() release_date_precision!: string;
    @Expose() total_tracks!: number;
    @Expose() type!: string;
    @Expose() uri!: string;
}