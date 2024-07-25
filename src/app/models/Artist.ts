import {Expose} from "class-transformer";

export class Artist {
    @Expose() name!: string;
    @Expose() id!: string;
}