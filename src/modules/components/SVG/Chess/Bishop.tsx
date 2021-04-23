import React from 'react';
import logoStyle from '../../../../common/logo.module.scss'

type SVGType = {
    classname?: any,
    color: number
}

export const Bishop: React.FC<SVGType> = ({ classname, color }) => {
    return (
        <>
            {color > 0 ?
                <svg
                    className={`${classname ? classname : ""} ${logoStyle.logo}`}
                    xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <g fill="#fff" strokeLinecap="butt">
                            <path d="M9 36c3.4-1 10.1.4 13.5-2 3.4 2.4 10.1 1 13.5 2 0 0 1.6.5 3 2-.7 1-1.6 1-3 .5-3.4-1-10.1.5-13.5-1-3.4 1.5-10.1 0-13.5 1-1.3.5-2.3.5-3-.5 1.3-1.5 3-2 3-2z" />
                            <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
                            <path d="M25 8a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0z" />
                        </g>
                        <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" strokeLinejoin="miter" />
                    </g>
                </svg>
                :
                <svg
                    className={`${classname ? classname : ""} ${logoStyle.logo}`}
                    xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <g fill="#000" strokeLinecap="butt">
                            <path d="M9 36c3.4-1 10.1.4 13.5-2 3.4 2.4 10.1 1 13.5 2 0 0 1.6.5 3 2-.7 1-1.6 1-3 .5-3.4-1-10.1.5-13.5-1-3.4 1.5-10.1 0-13.5 1-1.3.5-2.3.5-3-.5 1.3-1.5 3-2 3-2z" />
                            <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
                            <path d="M25 8a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0z" />
                        </g>
                        <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke="#fff" strokeLinejoin="miter" />
                    </g>
                </svg>
            }
        </>
    )
}