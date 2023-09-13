import { useState } from "react";
import { searchSpotify } from "../api/routes/spotify";

export default function HomePage() {
    const [search, setSearch] = useState({
        term: "",
        types: ["track", "album"],
        limit: 5,
        offset: 0,
    });
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearchSpotify = async () => {
        const results = await searchSpotify(search);
        setResults(results);
    };

    const renderSearchResults = () => {
        return results.map((result) => (
            <div
                key={result.uri}
                className="flex flex-row items-center space-x-4"
            >
                <img src={result.imageUrl} className="w-16 h-16" />
                <div className="flex flex-col">
                    <p>{result.name}</p>
                    <p>{result.type.slice(0, -1)}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row space-x-4">
                <input
                    className="shadow px-4"
                    value={search.term}
                    onChange={(event) =>
                        setSearch((prev) => {
                            const newTerm = {
                                ...prev,
                                term: event.target.value,
                            };
                            return newTerm;
                        })
                    }
                />
                <button
                    className="bg-salmon rounded shadow px-4"
                    onClick={() => handleSearchSpotify()}
                >
                    search
                </button>
            </div>
            <div className="flex flex-row space-x-4">
                <button className="shadow rounded bg-white px-4 ring-2 ring-salmon">
                    all
                </button>
                <button className="shadow rounded bg-white px-4">track</button>
                <button className="shadow rounded bg-white px-4">album</button>
                <button className="shadow rounded bg-white px-4">artist</button>
                <button className="shadow rounded bg-white px-4">
                    playlist
                </button>
            </div>
            {renderSearchResults()}
        </div>
    );
}
