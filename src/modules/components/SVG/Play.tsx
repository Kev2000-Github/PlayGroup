import SVGStyle from './SVG.module.scss';

type SVGType = {
    classname?: any
}

export const PlaySVG = ({ classname }: SVGType) => {
    return (
        <svg
            className={`${SVGStyle.svg} ${classname}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512">
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="35" y1="257.3" x2="478" y2="257.3" gradientTransform="matrix(.9983 0 0 -.9983 0 512.9)">
                <stop offset="0" stopColor="#00f2fe" />
                <stop offset="0" stopColor="#03effe" />
                <stop offset=".3" stopColor="#24d2fe" />
                <stop offset=".6" stopColor="#3cbdfe" />
                <stop offset=".8" stopColor="#4ab0fe" />
                <stop offset="1" stopColor="#4facfe" />
            </linearGradient>
            <path d="M105 512h-.3a70.7 70.7 0 01-69.8-70.8V70A69 69 0 0170.7 9a69 69 0 0170.8 1.4L443.9 197a69.4 69.4 0 0133.2 59.7 69.4 69.4 0 01-33.5 59.5L225 450a20 20 0 11-20.9-34l218.7-134a29.4 29.4 0 0014.4-25.5c0-10.7-5.2-20-14.3-25.6L120.5 44.5c-9.4-5.8-20.7-6-30.3-.6A29.6 29.6 0 0074.8 70v371a31 31 0 0030 31c4.8 0 10.1-1.8 15.6-5.1a20 20 0 1120.8 34 70.2 70.2 0 01-36.2 11z" fill="url(#a)" />
        </svg>
    )
}