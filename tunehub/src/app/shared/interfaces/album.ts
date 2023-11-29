export interface Album {
    id: string;
    title: string;
    artist: string;
    releaseDate: string;
    songs?: [string];
}