import React from 'react';
import logoStyle from '../../../../common/logo.module.scss'

type SVGType = {
    classname?: any
    color: number
}

export const King: React.FC<SVGType> = ({ classname, color }) => {
    return (
        <>
            {color > 0 ?
                <svg
                    className={`${classname ? classname : ""} ${logoStyle.logo}`}
                    xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.5 11.6V6M20 8h5" strokeLinejoin="miter" />
                        <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" strokeLinecap="butt" strokeLinejoin="miter" />
                        <path d="M12.5 37a20.4 20.4 0 0020 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="#fff" />
                        <path d="M12.5 30c5.5-3 14.5-3 20 0M12.5 33.5c5.5-3 14.5-3 20 0M12.5 37c5.5-3 14.5-3 20 0" />
                    </g>
                </svg>
                :
                <svg
                    className={`${classname ? classname : ""} ${logoStyle.logo}`}
                    xmlns="http://www.w3.org/2000/svg">
                    <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22.5 11.6V6" strokeLinejoin="miter" />
                        <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#000" strokeLinecap="butt" strokeLinejoin="miter" />
                        <path d="M12.5 37a20.4 20.4 0 0020 0v-7s9-4.5 6-10.5c-4-6.5-13.5-3.5-16 4V27v-3.5c-2.5-7.5-12-10.5-16-4-3 6 6 10.5 6 10.5v7" fill="#000" />
                        <path d="M20 8h5" strokeLinejoin="miter" />
                        <path d="M32 29.5s8.5-4 6-9.6C34.1 14 25 18 22.5 24.5v2.1-2.1C20 18 10.8 14 7 19.9c-2.5 5.6 6 9.6 6 9.6" stroke="#fff" />
                        <path d="M12.5 30c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0m-20 3.5c5.5-3 14.5-3 20 0" stroke="#fff" />
                    </g>
                </svg>
            }
        </>
    )
}