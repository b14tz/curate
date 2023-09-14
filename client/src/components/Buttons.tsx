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
    value,
}: ButtonGroup) => {
    const activeClasses = " ring-2 ring-salmon";
    return (
        <div className={groupClasses}>
            {groupButtons.map((item, index) => {
                let componentClasses =
                    buttonClasses +
                    (String(value) === String(item.value) ? activeClasses : "");
                return (
                    <button
                        key={index}
                        className={componentClasses}
                        onClick={item.onClick}
                        type="button"
                    >
                        {item.label}
                    </button>
                );
            })}
        </div>
    );
};
