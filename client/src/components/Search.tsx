import { useState } from "react";
import { searchSpotify } from "../api/routes/spotify";
import { ButtonGroup } from "./ButtonGroup";

export default function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTypes, setSearchTypes] = useState<string[]>([
        "track",
        "album",
        "artist",
    ]);
    // const [searchLimit, setSearchLimit] = useState(5);
    // const [searchOffset, setSearchOffset] = useState(0);

    const [results, setResults] = useState<{
        [key: string]: SearchResultData[];
    }>({});

    const handleSearchSpotify = async () => {
        const searchResults: { [key: string]: SearchResultData[] } =
            await searchSpotify({
                term: searchTerm,
                types: searchTypes,
                limit: 5, // searchLimit
                offset: 0, // searchOffset
            });
        setResults(searchResults);
    };

    const renderResults = () => {
        if (Object.keys(results).length === 0) {
            return <div className="h-[300px]"></div>;
        } else {
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
                                        src={
                                            item.imageUrl
                                                ? item.imageUrl
                                                : "/panda.png"
                                        }
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
        }
    };

    const handleSearch: React.MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        event.preventDefault();
        handleSearchSpotify();
    };
    return (
        <div className="flex flex-col space-y-4">
            <form className="flex flex-col space-y-4">
                <div className="flex flex-row space-x-4">
                    <input
                        className="shadow px-4"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <button onClick={handleSearch}>Submit</button>
                </div>
                <ButtonGroup
                    groupClasses="flex flex-row space-x-4"
                    buttonClasses="shadow rounded bg-white px-4"
                    activeClasses=" ring-2 ring-salmon"
                    groupButtons={[
                        {
                            label: "All",
                            value: ["track", "album", "artist"],
                            onClick: () =>
                                setSearchTypes(["track", "album", "artist"]),
                        },
                        {
                            label: "Track",
                            value: ["track"],
                            onClick: () => setSearchTypes(["track"]),
                        },
                        {
                            label: "Album",
                            value: ["album"],
                            onClick: () => setSearchTypes(["album"]),
                        },
                        {
                            label: "Artist",
                            value: ["artist"],
                            onClick: () => setSearchTypes(["artist"]),
                        },
                    ]}
                    value={searchTypes}
                />
            </form>
            {renderResults()}
        </div>
    );
}
