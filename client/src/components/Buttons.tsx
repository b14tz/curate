import { useState } from "react";

export const SubmitButton = ({
    label,
    disabled,
    onClick,
}: {
    label: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <button
            disabled={disabled}
            className="bg-salmon rounded shadow px-4 text-white"
            onClick={onClick}
        >
            {label || "Submit"}
        </button>
    );
};

export const ButtonGroup = ({
    buttonClasses,
    groupClasses,
    groupButtons,
    activeClasses,
}: ButtonGroup) => {
    const [activeButton, setActiveButton] = useState(groupButtons[0].value);

    const handleButtonClick = async (value: string, onClick: any) => {
        if (value !== activeButton) {
            setActiveButton(value);
            if (onClick) {
                await onClick();
            }
        }
    };

    return (
        <div className={groupClasses}>
            {groupButtons.map((item, index) => {
                let componentClasses =
                    buttonClasses +
                    (item.value === activeButton ? activeClasses : "");
                return (
                    <button
                        key={index}
                        className={componentClasses}
                        onClick={() =>
                            handleButtonClick(item.value, item.onClick)
                        }
                        type="button"
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};
