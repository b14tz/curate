import { NavLink } from "react-router-dom";

export default function StyledNavLink({
    to,
    label,
    end = false,
    pendingClasses,
    activeClasses,
}: {
    to: string;
    label: string;
    end?: boolean;
    pendingClasses: string;
    activeClasses: string;
}) {
    return (
        <NavLink
            to={to}
            className={({ isActive, isPending }) =>
                isPending ? pendingClasses : isActive ? activeClasses : ""
            }
            end={end}
        >
            {label}
        </NavLink>
    );
}
