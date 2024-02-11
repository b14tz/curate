import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

export default function AboutModal({ children }: { children: JSX.Element }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>About</DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col space-y-4">
                    Jookbox was made to change the way music enthusiasts share
                    and discover playlists across Spotify and Apple Music. It
                    bridges connections within a music-loving community, making
                    it simple to share personal favorites and explore new tunes.
                    <br />
                    <br />
                    Effortlessly save discovered gems to your music account,
                    enriching your personal collection. Jookbox rekindles the
                    joy of mixtapes for the digital era, inviting you to a world
                    where musical discoveries and connections flourish. Explore
                    the future of music sharing with us.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
