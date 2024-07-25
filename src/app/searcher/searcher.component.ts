import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SpotifyService} from "../services/spotify-service/spotify.service";
import {jsonToAlbum, jsonToAlbums, jsonToTracks} from "../utils/utils";
import {Album} from "../models/Album";
import {Track} from "../models/Track";
import {SONGS} from "../utils/seeder";
import {AUTHENTICATED_USER, LoginService} from "../services/login-service/login.service";
import {SEARCH_INPUTS} from "../constants";


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

    welcomeMessage = this.loginService.isUserLoggedIn() ?  `Welcome to the Yfitops Game ${sessionStorage.getItem(AUTHENTICATED_USER)}!` : "Please login to play the game";
  search: string = "";
  selectedOption: any = "Album"
  searchResults: any = [];
  album!: Album;
  tracks!: Track[];
  isSearched = false;

  constructor(
      private service : SpotifyService,
      private loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

  onSearch() {
    switch (this.selectedOption) {
        case "Artist":
            this.getArtistAlbums();
            break;
        case "Album":
            this.getAlbum();
            break;
        default:
    }
  }

  getArtistAlbums() {
    this.service.getArtistAlbums(this.search)
        .then((data) => jsonToAlbums(data))
        .then((data) => this.searchResults = data)
        .then(() => console.log(this.searchResults))
        .catch((error) => console.error(error));
  }

  private getAlbum() {
    this.service.getAlbum(this.search)
        .then((data) => jsonToAlbum(data[0]))
        .then((data) => this.album = data)
        .then((data : Album ) => this.getSeveralTracks())
        // .then((data) => this.getAlbumTracks(data.id))
        .then((data) => jsonToTracks(data))
        .then((data) => this.tracks = data)
        .then(() => this.isSearched = true)
        .catch((error) => console.log(error));
  }

  private async getSeveralTracks() {
      try {
          return await this.service.getSeveralTracks(SONGS());
      } catch (error) {
          return console.error(error);
      }
  }

  private async getAlbumTracks(albumId: string) {
      try {
          const data = await this.service.getAlbumTracks(albumId);
          return jsonToTracks(data);
      } catch (error) {
          return console.error(error);
      }
  }

    onSelectAlbum() {
        this.albumSelected.emit(this.album);
        this.tracksSelected.emit(this.tracks);
        this.searchFinished.emit(true);
    }

    resetSearch() {
        this.isSearched = false;
    }

    @Output() albumSelected = new EventEmitter<Album>();
    @Output() tracksSelected = new EventEmitter<Track[]>();
    @Output() searchFinished = new EventEmitter<boolean>();

    onSelectSearchContent($event: MouseEvent) {
        let element = $event.target as HTMLSelectElement;
        console.log(element.value);
        this.selectedOption = element.value;
    }

    protected readonly SEARCH_INPUTS = SEARCH_INPUTS;
}
