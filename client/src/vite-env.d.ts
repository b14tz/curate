/// <reference types="vite/client" />

interface Search {
    term: string;
    types: string[];
    limit: number;
    offset: number;
}

interface SearchResult {
    uri: string;
    type: string;
    name: string;
    imageUrl: string;
}
