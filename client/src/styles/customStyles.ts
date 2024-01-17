import { CSSObjectWithLabel } from "react-select";

export const customSelectStyles = {
    control: (base: CSSObjectWithLabel) => ({
        ...base,
        background: "#F8FAFB",
        borderRadius: "0.375rem",
        boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        padding: "0.15rem",
        border: "none",
    }),
    menu: (base: CSSObjectWithLabel) => ({
        ...base,
        background: "#F8FAFB",
        borderRadius: "0.375rem",
        boxShadow:
            "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    }),
};
