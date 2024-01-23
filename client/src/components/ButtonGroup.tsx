import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

export const ButtonGroup = ({
    buttonClasses,
    groupClasses,
    groupButtons,
    activeClasses,
}: ButtonGroup) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState("");

    useEffect(() => {
        const currentPath = location.pathname;
        const activePath =
            groupButtons.find((button) => currentPath.endsWith(button.value))
                ?.value || groupButtons[0].value;
        setActiveButton(activePath);
    }, [location, groupButtons]);

    const handleButtonClick = async (value: string, onClick?: () => void) => {
        if (value !== activeButton) {
            setActiveButton(value);
            navigate(value); // Update to navigate to the sub-route
            if (onClick) {
                await onClick();
            }
        }
    };

    return (
        <div className={groupClasses}>
            {groupButtons.map((item, index) => (
                <button
                    key={index}
                    className={clsx(
                        buttonClasses,
                        item.value === activeButton && activeClasses
                    )}
                    onClick={() => handleButtonClick(item.value, item.onClick)}
                    type="button"
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
};
