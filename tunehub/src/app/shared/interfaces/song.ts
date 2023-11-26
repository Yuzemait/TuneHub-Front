export interface Song {
    [x: string]: any;
    name: string,
    song: string,
    date: Date,
    artistID: string,
    views: number,
    songImg: string,
    tags: string[]
}
