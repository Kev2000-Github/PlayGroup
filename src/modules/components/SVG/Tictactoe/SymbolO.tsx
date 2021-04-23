import React from 'react';
import logoStyle from '../../../../common/logo.module.scss'

type SVGType = {
    classname?: any
}

export const SymbolO: React.FC<SVGType> = ({ classname }) => {
    return (
        <svg
            className={`${classname ? classname : ""} ${logoStyle.logo}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <path d="M256 503.6A246 246 0 0181 431C34.1 384.3 8.3 322 8.3 256S34.2 127.7 81 81A246 246 0 01256 8.3 246 246 0 01431 81c46.8 46.8 72.6 109 72.6 175.1S477.8 384.3 431 431 322 503.7 256 503.7zm0-427.7C156.7 76 76 156.7 76 256s80.7 180 180 180 180-80.7 180-180S355.4 76 256 76z" fill="#7dd2f0" />
            <path d="M126 431c-46.8-46.7-72.6-108.9-72.6-175S79.2 127.7 126 81c41.5-41.5 95-66.4 152.6-71.5A246 246 0 0080.9 81C34.2 127.6 8.4 189.8 8.4 256S34.2 384.3 81 431a246 246 0 00197.6 71.5 245.7 245.7 0 01-152.6-71.4z" opacity=".1" />
        </svg>
    )
}