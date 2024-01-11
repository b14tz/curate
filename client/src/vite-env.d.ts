/// <reference types="vite/client" />

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    token: string;
}

interface Search {
    term: string;
    types: string[];
    limit: number;
    offset: number;
}

interface SearchResultData {
    uri: string;
    type: string;
    title: string;
    name: string;
    imageUrl: string;
    releaseDate: string;
}

interface SearchResult {
    type: string;
    data: SearchResultData[];
}

interface GroupButton {
    label: string;
    value?: any;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface ButtonGroup {
    buttonClasses?: string;
    groupClasses?: string;
    groupButtons: GroupButton[];
    activeClasses: string;
    value?: any;
}

interface Post {
    id: string;
    title: string;
    description: string;
    songs: Song[];
    origin?: string;
    downloads: number;
    createdAt: Date;
    author: User;
    comments: Comment[];
    likes: Like[];
}

interface Like {}

interface Comment {}

interface Song {
    title: string;
    artist: string;
    imageUrl: string;
}

interface PostForm {
    content: string;
}

interface ResponseError extends Error {
    response: {
        data: string;
    };
}
