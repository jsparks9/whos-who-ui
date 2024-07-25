import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginService} from "../login-service/login.service";
import {Playlist} from "../../models/Playlist";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(
      private http: HttpClient,
      private loginService: LoginService
  ) { }

    getPlaylists() {
      return this.http.get<Playlist[]>(`http://localhost:8080/playlists`)
    }

    getPlaylist(username: string) {
        return this.http.get<Playlist>(`http://localhost:8080/playlists/user/${username}`)
    }

    postPlaylist(playlist: Playlist) {
        const requestBody = {
            credentials: {
                username: this.loginService.getAuthenticatedUser(),
                password: "password"
            },
            name: playlist.name,
            songs: playlist.songs
        }
        console.log(requestBody)
        return this.http.post(`http://localhost:8080/playlists`, requestBody)
    }

    getPlaylistByName(name: string) {
        return this.http.get<Playlist>(`http://localhost:8080/playlists/${name}`)
    }
}
