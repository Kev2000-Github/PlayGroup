import React from 'react';
import logoStyle from '../../../../common/logo.module.scss'

type SVGType = {
    classname?: any,
    color: number
}

export const Pawn: React.FC<SVGType> = ({ classname, color }) => {
    return (
        <>
            {
                color > 0 ?
                    <svg
                        className={`${classname ? classname : ""} ${logoStyle.logo}`}
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5 9a4 4 0 00-3.2 6.4 6.5 6.5 0 00-.9 10.6c-3 1-7.4 5.6-7.4 13.5h23c0-8-4.4-12.4-7.4-13.5a6.5 6.5 0 00-.9-10.6A4 4 0 0022.5 9z" fill="#fff" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    :
                    <svg
                        className={`${classname ? classname : ""} ${logoStyle.logo}`}
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5 9a4 4 0 00-3.2 6.4 6.5 6.5 0 00-.9 10.6c-3 1-7.4 5.6-7.4 13.5h23c0-8-4.4-12.4-7.4-13.5a6.5 6.5 0 00-.9-10.6A4 4 0 0022.5 9z" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
            }
        </>
    )
}