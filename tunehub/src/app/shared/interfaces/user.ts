export interface User {

    id: string,
    username: string,
    email: string,
    imgId: string,
    password: string,
    artistStatus: boolean,
    playlists?: [string],
    chats?: [string],
    albums?: [string],
    events?: [string],
    address?:string,
    ownChat?:string

}
