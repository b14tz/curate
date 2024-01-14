/// <reference types="vite/client" />

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    bio: string;
    connectedToSpotify: boolean;
    connectedToApple: boolean;
    likes?: [];
    comments?: [];
    followers?: Follow[];
    following?: Follow[];
    posts?: [];
    saves?: [];
    token: string;
}

interface Follow {
    followerId: string;
    followingId: string;
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
    createdAt: string;
    author: User;
    comments: Comment[];
    likes: Like[];
}

interface Like {
    userId: string;
    postId: string;
}

interface Comment {
    content: string;
    post: Post;
    author: User;
    createdAt: string;
}

interface Song {
    title: string;
    artist: string;
    imageUrl: string;
}

interface PostForm {
    title: string;
    description: string;
    isrcs: string;
    origin: string;
    authorId: string;
}

interface ResponseError extends Error {
    response: {
        data: string;
    };
}
