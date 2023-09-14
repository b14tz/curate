import NavbarLink from "./NavbarLink";

export default function Navbar() {
    return (
        <div className="flex justify-between items-center text-black dark:text-white">
            <NavbarLink to="/" label="curate" />
            <div className="space-x-8">
                <NavbarLink to="/feed" label="feed" />
                <NavbarLink to="/search" label="search" />
                <NavbarLink to="/profile" label="profile" />
                <NavbarLink to="/login" label="login" />
            </div>
        </div>
    );
}
