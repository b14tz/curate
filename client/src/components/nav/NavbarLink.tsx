import { NavLink } from "react-router-dom";

export default function NavbarLink({
    to,
    label,
}: {
    to: string;
    label: string;
}) {
    return (
        <NavLink
            to={to}
            className={({ isActive, isPending }) =>
                isPending
                    ? "text-black dark:text-white"
                    : isActive
                    ? "text-salmon"
                    : ""
            }
        >
            {label}
        </NavLink>
    );
}
