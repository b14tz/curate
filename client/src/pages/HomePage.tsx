import { useState } from "react";
import { searchSpotify } from "../api/routes/spotify";

export default function HomePage() {
    const [search, setSearch] = useState({
        term: "",
        types: ["track", "album", "artist"],
        limit: 5,
        offset: 0,
    });
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearchSpotify = async () => {
        const searchResults: SearchResult[] = await searchSpotify(search);
        setResults(searchResults);
    };

    const renderResults = () => {
        return (
            <div className="space-y-10">
                {Object.keys(results).map((category) => (
                    <div key={category} className="space-y-4">
                        <p>{category}</p>
                        {results[category].map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-center space-x-4"
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-16 h-16"
                                />
                                <div className="flex flex-col">
                                    <p>{item.title}</p>
                                    <p>{item.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col space-y-4">
            <form className="flex flex-col space-y-4">
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
                        type="button"
                        className="bg-salmon rounded shadow px-4 text-white"
                        onClick={() => handleSearchSpotify()}
                    >
                        search
                    </button>
                </div>
                <div className="flex flex-row space-x-4">
                    <button
                        type="button"
                        className="shadow rounded bg-white px-4 ring-2 ring-salmon"
                    >
                        all
                    </button>
                    <button
                        type="button"
                        className="shadow rounded bg-white px-4"
                    >
                        track
                    </button>
                    <button
                        type="button"
                        className="shadow rounded bg-white px-4"
                    >
                        album
                    </button>
                    <button
                        type="button"
                        className="shadow rounded bg-white px-4"
                    >
                        artist
                    </button>
                </div>
            </form>
            {renderResults()}
        </div>
    );
}
