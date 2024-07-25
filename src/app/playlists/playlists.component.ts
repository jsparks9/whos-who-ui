import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../services/playlist-service/playlist.service';
import {Playlist} from "../models/Playlist";
import {SpotifyService} from "../services/spotify-service/spotify.service";
import {jsonToSearchedTracks, jsonToTracks, searchedTracksToPlaylist} from "../utils/utils";
import {Track} from "../models/Track";
import {SearchedTrack} from "../models/SearchedTrack";
import {LoginService} from "../services/login-service/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit {

  playlists: Playlist[] = [];
  searchedTracks: SearchedTrack[] = [];
  newTrackList: SearchedTrack[] = [];
  search: string = "";
  isPlaying: boolean = false;
  title: any;
  isCreatingPlaylist: boolean = false;

  constructor(
      private playlistService: PlaylistService,
      private spotifyService: SpotifyService,
      private loginService: LoginService,
      private router: Router
  ) { }

  ngOnInit(): void {
        this.getPlaylists();
  }

    getPlaylists() {
        return this.playlistService.getPlaylists().subscribe({
            next : response => this.playlists = response,
            error : error => console.log(error.message),
            complete : () => {}
        });
    }

    getTrack() {
        this.spotifyService.getTrack(this.search)
            .then((data) => {
                this.searchedTracks = jsonToSearchedTracks(data)
            })
    }

    savePlaylist(playlist: Playlist) {
        this.playlistService.postPlaylist(playlist)
            .subscribe({
                next : response => {
                    console.log(response)
                    this.isCreatingPlaylist = false;
                },
                error : error => console.log(error.message),
                complete : () => {
                    this.getPlaylists()
                }
            });
    }

    toggleAudio(audioPlayer: HTMLAudioElement, track : SearchedTrack) {
        if (audioPlayer.paused) {
            audioPlayer.play();
            track.isPlaying = true;
        } else {
            audioPlayer.pause();
            track.isPlaying = false;
        }
    }


    onSearch() {
        this.getTrack()
    }

    addToNewTrackList(track : SearchedTrack) {
        this.newTrackList.push(track);

    }

    isTrackInTrackList(track: SearchedTrack) {
        return this.newTrackList.includes(track);
    }

    removeFromNewTrackList(track: SearchedTrack) {
        this.newTrackList = this.newTrackList.filter((t) => t !== track);
    }

    onSave() {
      const object = {
            name: this.title,
            tracks: this.newTrackList
        }
            console.log(searchedTracksToPlaylist(object));
            this.savePlaylist(searchedTracksToPlaylist(object));
      }

    createNewPlaylist() {
        this.isCreatingPlaylist = !this.isCreatingPlaylist;
    }
}
