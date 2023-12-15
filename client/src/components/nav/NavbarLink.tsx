import { NavLink } from "react-router-dom";

type Props = {
    to: string;
    label: string;
};

export default function NavbarLink({ to, label }: Props) {
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
