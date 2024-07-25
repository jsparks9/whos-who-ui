import {plainToInstance} from "class-transformer";
import {Album} from "../models/Album";
import {Track} from "../models/Track";
import {Question} from "../models/Question";
import {SearchedTrack} from "../models/SearchedTrack";
import {AUTHENTICATED_USER} from "../services/login-service/login.service";


export const jsonToAlbum = (json: any) => plainToInstance(Album, json)
export const jsonToAlbums = (json: any) => [...Array.from(json)].map((album: any) => jsonToAlbum(album))
export const jsonToTrack = (json: any) => plainToInstance(Track, json)
export const jsonToTracks = (json: any) => [...Array.from(json)].map((track: any) => jsonToTrack(track))
export const jsonToSearchedTrack = (json: any) => plainToInstance(SearchedTrack, json)
export const jsonToSearchedTracks = (json: any) => [...Array.from(json)].map((track: any) => jsonToSearchedTrack(track))
export const searchedTracksToPlaylist = (object: any) => ({
        songs: searchTracksToSongs(object.tracks),
        name: object.name,
        createdBy: sessionStorage.getItem(AUTHENTICATED_USER)!
    })
export const searchTracksToSongs = (tracks: SearchedTrack[]) => tracks.map((track) => ({
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        trackId: track.id,
        albumCover: track.album.images[2].url,
        previewUrl: track.preview_url,
        uri: track.uri
    }))

export const tracksToQuestions = (tracks : Track[]) => tracks.map((track) => {
return {
        question: `What is the name of the track with the preview below?`,
        preview: track.preview_url,
        options: tracks.map((track) => track.name),
        answer: track.name
    }
})

export const randomizedArray = (array  : Question[]) => {
    return array.slice()
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value);
}
