import {Expose} from "class-transformer";

export class Track {
    @Expose() artists!: any[];
    @Expose() available_markets!: string[];
    @Expose() disc_number!: number;
    @Expose() duration_ms!: number;
    @Expose() explicit!: boolean;
    @Expose() external_urls!: { spotify: string };
    @Expose() href!: string;
    @Expose() id!: string;
    @Expose() is_local!: boolean;
    @Expose() name!: string;
    @Expose() preview_url!: string;
    @Expose() track_number!: number;
    @Expose() type!: string;
    @Expose() uri!: string;
}