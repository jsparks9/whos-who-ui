import { Album } from "../models/Album";

export const ALBUM = () => {
    const album = new Album();
    album.album_group = "";
    album.album_type = "album";
    album.artists = [
        {
            id: "6S58b0fr8TkWrEHOH4tRVu",
            name: "Switchfoot",
        }
    ];
    album.available_markets = ['AR', 'AU', 'AT', 'BE', 'BO', 'BR', 'BG', 'CA', 'CL', 'CO', 'CR', 'CY', 'CZ', 'DK', 'DO', 'DE', 'EC', 'EE', 'SV', 'FI', 'FR', 'GR', 'GT', 'HN', 'HK', 'HU', 'IS', 'IE', 'IT', 'LV', 'LT', 'LU', 'MY', 'MT', 'MX', 'NL', 'NZ', 'NI', 'NO', 'PA', 'PY', 'PE', 'PH', 'PL', 'PT', 'SG', 'SK', 'ES', 'SE', 'CH', 'TW', 'TR', 'UY', 'US', 'GB', 'AD', 'LI', 'MC', 'ID', 'JP', 'TH', 'VN', 'RO', 'IL', 'ZA', 'SA', 'AE', 'BH', 'QA', 'OM', 'KW', 'EG', 'MA', 'DZ', 'TN', 'LB', 'JO', 'PS', 'IN', 'BY', 'KZ', 'MD', 'UA', 'AL', 'BA', 'HR', 'ME', 'MK', 'RS', 'SI', 'KR', 'BD', 'PK', 'LK', 'GH', 'KE', 'NG', 'TZ', 'UG', 'AG'];
    album.external_urls = { spotify: 'https://open.spotify.com/album/67s7cTDzGwhWwZeJD9OhSX' };
    album.href = "https://api.spotify.com/v1/albums/67s7cTDzGwhWwZeJD9OhSX";
    album.id = "67s7cTDzGwhWwZeJD9OhSX";
    album.images = [
        {
            url: 'https://i.scdn.co/image/ab67616d0000b273e6710ca8d1b1532efda0899e'
        },
        {
            url: 'https://i.scdn.co/image/ab67616d00001e02e6710ca8d1b1532efda0899e'
        },
        {
            url: 'https://i.scdn.co/image/ab67616d00004851e6710ca8d1b1532efda0899e'
        }
        ];
    album.name = "Nothing Is Sound";
    album.release_date = "2005-09-13";
    album.release_date_precision = "day";
    album.total_tracks = 12;
    album.type = "album";
    album.uri = "spotify:album:67s7cTDzGwhWwZeJD9OhSX";

    return album;
}

export const SONGS = () => {
    const urls = [
        "https://open.spotify.com/track/26VXoSiQIGQSHz21Bz9Hmi?si=c7f448f9c1b2489d",
        "https://open.spotify.com/track/6a9UU0juee0sbCXtjZIbwO?si=e878a4a5a09b441e",
        "https://open.spotify.com/track/631jABaw1pVnCL6oD1l4iy?si=f2423022b685450e",
        "https://open.spotify.com/track/1ivJ1VGhFOYNHgD4HtytvB?si=22845d41047945dd",
        "https://open.spotify.com/track/24X3UvId3uyeP5eCEjaUGR?si=6cd86b6bd6e143d5",
        "https://open.spotify.com/track/25iheRc9HamZyeKWWrPTlL?si=feb40bacadbc4d23",
        "https://open.spotify.com/track/1mqH30vRRgwRcJqpYeoc6V?si=2fcd525bd18d41be",
        "https://open.spotify.com/track/1kefYfl6mvERDqlfZ8Z7Mq?si=7309c966dd89455e",
        "https://open.spotify.com/track/6G70PxnF494Dpib9TQM9Ds?si=2286df30af674b28",
        "https://open.spotify.com/track/7okbWC2IcboYZsJqE27Ui4?si=94ea361786c3460f",
        "https://open.spotify.com/track/1Ee4JIZHzsAlbYq4oUvT91?si=f7fefe1565f54f9e",
        "https://open.spotify.com/track/00G4BJW6XuPGiDuANJSPsn?si=beac150556b64f14"
    ];

    const trackIds = urls.map(url => url.split("/")[4].split("?")[0]);
    const idsString = trackIds.join(",");
    console.log(idsString);

    return idsString;
}


