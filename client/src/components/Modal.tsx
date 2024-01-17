import { IconX } from "@tabler/icons-react";

export default function Modal({
    open,
    handleClose,
    title,
    children,
}: {
    open: boolean;
    handleClose: () => void;
    title: string;
    children: JSX.Element;
}) {
    return (
        open && (
            <div
                onClick={() => handleClose()}
                className="z-[1000] fixed flex left-0 top-0 bg-black/50 justify-center w-full h-screen"
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    className="flex flex-col bg-b-secondary py-4 px-6 mt-10 rounded-lg drop-shadow-md max-w-[700px] h-fit"
                >
                    <div className="flex flex-row justify-between items-center space-x-6 mb-4">
                        <h3>{title}</h3>
                        <button onClick={() => handleClose()}>
                            <IconX />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        )
    );
}
