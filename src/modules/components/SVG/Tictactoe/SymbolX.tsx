import React from 'react';
import logoStyle from '../../../../common/logo.module.scss'

type SVGType = {
    classname?: any
}

export const SymbolX: React.FC<SVGType> = ({ classname }) => {
    return (
        <svg
            className={`${classname ? classname : ""} ${logoStyle.logo}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path fill="#e0230d" d="M504.5 95.2L343.7 256l160.8 160.8-21.2 21.2-272-182 272-182z" />
            <path fill="#ff5440" d="M483.3 74l-182 182 182 182-66.5 66.5L256 343.7 95.2 504.5 7.5 416.8 168.3 256 7.5 95.2 95.2 7.5 256 168.3 416.8 7.5z" />
        </svg>
    )
}