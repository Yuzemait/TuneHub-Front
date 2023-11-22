export interface User {

    id: string,
    username: string,
    email: string,
    password: string,
    artistStatus: boolean,
    playlists?: [string],
    chats?: [string],
    albums?: [string],
    events?: [string]

}
