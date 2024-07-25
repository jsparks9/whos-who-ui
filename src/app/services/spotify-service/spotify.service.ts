import { Injectable } from '@angular/core';
import fetchFromSpotify from "../../../services/api";
import {TOKEN_KEY} from "../../home/home.component";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {


  constructor(
      private http: HttpClient
  ) { }

  getToken() : string {
    return JSON.parse(localStorage.getItem(TOKEN_KEY)!).value
  }

  getArtistId(name : string) {
    const token = this.getToken();
    return fetchFromSpotify({ token, endpoint: `search?q=${name}&type=artist` })
        .then((data) => {
            return data.artists.items[0].id;
        })
        .catch((error) => {
            console.error(error);
        });
  }

  getArtistAlbums(name : string) {
    const token = this.getToken()
    return  this.getArtistId(name)
        .then((id) => fetchFromSpotify({ token, endpoint: `artists/${id}/albums`}))
        .then((data) => {
            return data.items;
        })

  }

    getAlbum(search: string) {
        const token = this.getToken();
        return fetchFromSpotify({ token, endpoint: `search?q=${search}&type=album` })
            .then((data) => {
                return data.albums.items;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getAlbumTracks(albumId: string) {
        const token = this.getToken();
        return fetchFromSpotify({ token, endpoint: `albums/${albumId}/tracks` })
            .then((data) => {
                return data.items;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getSeveralTracks(idsString: string) {
        const token = this.getToken();
        return fetchFromSpotify({ token, endpoint: `tracks?ids=${idsString}` })
            .then((data) => {
                return data.tracks;
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getTrack(trackName: string) {
        const token = this.getToken();
        return fetchFromSpotify({ token, endpoint: `search?q=${trackName}&type=track&limit=3` })
            .then((data) => {
                return data.tracks.items;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}
