import React from "react";
import buttonStyles from "./button.module.scss";
import { PlaySVG } from "../../components/SVG/Play";
type ButtonType = {
    children: any,
    classname?: any,
    mode?: "disabled" | "loading" | "normal" | "blocked",
    name?: string,
    onClick?: any
}

export const Button = ({ children, classname = "", mode = "normal", name = "", onClick }: ButtonType) => {
    const disabled = /(disabled|blocked|loading)/.test(mode);
    return (
        <button disabled={disabled} name={name} onClick={onClick} className={`${buttonStyles.button} ${classname} ${buttonStyles[mode]}`}>
            {mode === "disabled" ?
                ""
                :
                <PlaySVG classname={buttonStyles.play} />
            }
            {children}
        </button>
    )
}