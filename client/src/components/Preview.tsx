import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Preview({
    source,
    path,
}: {
    source: Post | Playlist;
    path: string;
}) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [marginLeft, setMarginLeft] = useState("");
    const navigate = useNavigate();

    const imageSideLength = 112;
    const numSongsShown = 7;

    useEffect(() => {
        const calculateAndSetImageStyles = () => {
            if (buttonRef.current) {
                const buttonWidth = buttonRef.current.offsetWidth;
                const overlapMargin =
                    imageSideLength -
                    (buttonWidth - imageSideLength) / (numSongsShown - 1);
                setMarginLeft(`-${overlapMargin}px`);
            }
        };

        // Calculate on mount
        calculateAndSetImageStyles();

        // Adjust on window resize
        window.addEventListener("resize", calculateAndSetImageStyles);

        return () =>
            window.removeEventListener("resize", calculateAndSetImageStyles);
    }, [source.songs.length]);

    return (
        <button
            ref={buttonRef}
            className="flex flex-row drop-shadow-xl overflow-hidden w-full"
            onClick={() => navigate(path)}
        >
            {Array.from({ length: 7 }).map((_, index) => {
                const song = source.songs[index];
                const zIndex = 1000 - index;
                const isOverlappingImage = index > 0;

                if (song) {
                    // Render song image
                    return (
                        <img
                            key={index}
                            src={song.imageUrl}
                            alt={`Cover ${index}`}
                            style={{
                                zIndex,
                                marginLeft: isOverlappingImage
                                    ? marginLeft
                                    : "0px",
                                height: `${imageSideLength}px`,
                            }}
                            className="drop-shadow"
                        />
                    );
                } else {
                    // Render placeholder if song is not available
                    return (
                        <div
                            key={`placeholder-${index}`}
                            style={{
                                zIndex,
                                marginLeft: isOverlappingImage
                                    ? marginLeft
                                    : "0px",
                                height: `${imageSideLength}px`,
                                width: `${imageSideLength}px`,
                            }}
                            className="drop-shadow flex items-center justify-center bg-gradient-to-r from-background to-slate-900"
                        >
                            {/* Optional: Content or icons inside the div */}
                        </div>
                    );
                }
            })}
        </button>
    );
}
