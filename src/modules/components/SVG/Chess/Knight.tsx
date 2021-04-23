import React from 'react';
import logoStyle from '../../../../common/logo.module.scss'

type SVGType = {
    classname?: any,
    color: number
}

export const Knight: React.FC<SVGType> = ({ classname, color }) => {
    return (
        <>
            {
                color > 0 ?
                    <svg
                        className={`${classname ? classname : ""} ${logoStyle.logo}`}
                        xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff" />
                            <path d="M24 18c.4 3-5.6 7.4-8 9-3 2-2.8 4.3-5 4-1-1 1.4-3 0-3-1 0 .2 1.2-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.9-1.9 2-3.5c-.7-1-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.8-2 2.5-3c1 0 1 3 1 3" fill="#fff" />
                            <path d="M9.5 25.5a.5.5 0 11-1 0 .5.5 0 111 0z" fill="#000" />
                            <path d="M15 15.8a.5 1.5 30 11-1-.5.5 1.5 30 111 .5z" fill="#000" strokeWidth="1.49997" />
                        </g>
                    </svg>
                    :
                    <svg
                        className={`${classname ? classname : ""} ${logoStyle.logo}`}
                        xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#000" />
                            <path d="M24 18c.4 3-5.6 7.4-8 9-3 2-2.8 4.3-5 4-1-1 1.4-3 0-3-1 0 .2 1.2-1 2-1 0-4 1-4-4 0-2 6-12 6-12s1.9-1.9 2-3.5c-.7-1-.5-2-.5-3 1-1 3 2.5 3 2.5h2s.8-2 2.5-3c1 0 1 3 1 3" fill="#000" />
                            <path d="M9.5 25.5a.5.5 0 11-1 0 .5.5 0 111 0z" fill="#fff" stroke="#fff" />
                            <path d="M15 15.8a.5 1.5 30 11-1-.5.5 1.5 30 111 .5z" fill="#fff" stroke="#fff" strokeWidth="1.49997" />
                            <path d="M24.6 10.4l-.5 1.4.5.2c3.1 1 5.6 2.5 7.9 6.8A39.1 39.1 0 0135.3 39l-.1.5h2.3V39c.5-10-.9-16.9-3.3-21.3-2.3-4.5-5.7-6.7-9.1-7.2l-.6-.1z" fill="#fff" stroke="none" />
                        </g>
                    </svg>
            }
        </>
    )
}