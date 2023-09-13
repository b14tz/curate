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
