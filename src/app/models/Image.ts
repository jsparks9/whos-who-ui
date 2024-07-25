import {Expose} from "class-transformer";

export class Image {
    @Expose() url!: string;
}