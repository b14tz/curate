/// <reference types="vite/client" />

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
    id: number;
    title: string;
    author: string;
    description: string;
    createdAt?: Date;
    songs: Song[];
    downloads: number;
    likes: Like[];
    comments: Comment[];
}

interface Like {}

interface Comment {}

interface Song {
    id: number;
    title: string;
    artist: string;
    imageUrl: string;
}
