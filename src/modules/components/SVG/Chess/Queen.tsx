import React from 'react';
import logoStyle from '../../../../common/logo.module.scss'

type SVGType = {
    classname?: any,
    color: number
}

export const Queen: React.FC<SVGType> = ({ classname, color }) => {
    return (
        <>
            {color > 0 ?
                <svg
                    className={`${classname ? classname : ""} ${logoStyle.logo}`}
                    xmlns="http://www.w3.org/2000/svg">
                    <g fill="#fff" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M8 12a2 2 0 11-4 0 2 2 0 114 0zM24.5 7.5a2 2 0 11-4 0 2 2 0 114 0zM41 12a2 2 0 11-4 0 2 2 0 114 0zM16 9a2 2 0 11-4 0 2 2 0 114 0zM33 9a2 2 0 11-4 0 2 2 0 114 0z" />
                        <path d="M9 26a81.6 81.6 0 0127 0l2-12-7 11V11l-5.5 13.5-3-15-3 15L14 11v14L7 14l2 12z" strokeLinecap="butt" />
                        <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4a81.6 81.6 0 00-27 0z" strokeLinecap="butt" />
                        <path d="M11.5 30a81 81 0 0122 0M12 33.5c6-1 15-1 21 0" fill="none" />
                    </g>
                </svg>
                :
                <svg
                    className={`${classname ? classname : ""} ${logoStyle.logo}`}
                    xmlns="http://www.w3.org/2000/svg">
                    <g fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <g stroke="none">
                            <circle cx="6" cy="12" r="2.8" /><circle cx="14" cy="9" r="2.8" />
                            <circle cx="22.5" cy="8" r="2.8" />
                            <circle cx="31" cy="9" r="2.8" />
                            <circle cx="39" cy="12" r="2.8" />
                        </g>
                        <path d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z" strokeLinecap="butt" />
                        <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4a81.6 81.6 0 00-27 0z" strokeLinecap="butt" />
                        <path d="M11 38.5a35 35 1 0023 0" fill="none" strokeLinecap="butt" />
                        <path d="M11 29a35 35 1 0123 0M12.5 31.5h20M11.5 34.5a35 35 1 0022 0M10.5 37.5a35 35 1 0024 0" fill="none" stroke="#fff" />
                    </g>
                </svg>
            }
        </>
    )
}