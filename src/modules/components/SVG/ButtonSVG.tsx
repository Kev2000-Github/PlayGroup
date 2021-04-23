import SVGStyle from './SVG.module.scss';
import "./ButtonSVG.scss";
type SVGType = {
    classname?: any
}

export const ButtonSVG = ({ classname }: SVGType) => {
    return (
        <svg
            className={`${SVGStyle.svg} ${classname}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="40 90 430 430" >
            <path d="M512 316v60c0 75.6-112.9 136-256 136S0 451.6 0 376v-60c0-8.4 6.6-15 15-15h482c8.4 0 15 6.6 15 15z" fill="#efe2dd" />
            <path d="M512 316v60c0 75.6-112.9 136-256 136V301h241c8.4 0 15 6.6 15 15z" fill="#cdbfba" />
            <path d="M512 316c0 74.7-115.3 135-256 135S0 390.7 0 316s115.3-135 256-135 256 60.3 256 135z" fill="#fff5f5" />
            <path d="M512 316c0 74.7-115.3 135-256 135V181c140.7 0 256 60.3 256 135z" fill="#efe2dd" />
            <path d="M391 226v90c0 42.9-57.9 75-135 75s-135-32.1-135-75v-90c0-8.4 6.6-15 15-15h240c8.4 0 15 6.6 15 15z" fill="#e63950" />
            <path d="M391 226v90c0 42.9-57.9 75-135 75V211h120c8.4 0 15 6.6 15 15z" fill="#ae2538" />
            <path d="M256 151c-77.1 0-135 32.1-135 75s57.9 75 135 75 135-32.1 135-75-57.9-75-135-75z" fill="#ff637b" />
            <path d="M391 226c0 42.9-57.9 75-135 75V151c77.1 0 135 32.1 135 75z" fill="#e63950" />
        </svg>
    )
}

export const ButtonPressedSVG = ({ classname }: SVGType) => {
    return (
        <svg
            className={`${SVGStyle.svg} ${classname}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 331">
            <path className="cls-1" d="M512 316v60c0 75.6-112.9 136-256 136S0 451.6 0 376v-60a14.8 14.8 0 0115-15h482a14.8 14.8 0 0115 15z" transform="translate(0 -181)" />
            <path d="M512 316v60c0 75.6-112.9 136-256 136V301h241a14.8 14.8 0 0115 15z" transform="translate(0 -181)" fill="#cdbfba" />
            <path d="M512 316c0 74.7-115.3 135-256 135S0 390.7 0 316s115.3-135 256-135 256 60.3 256 135z" transform="translate(0 -181)" fill="#fff5f5" />
            <path className="cls-1" d="M512 316c0 74.7-115.3 135-256 135V181c140.7 0 256 60.3 256 135z" transform="translate(0 -181)" />
            <path className="cls-5" d="M391 287.2v56.6c0 27-57.9 47.2-135 47.2s-135-20.2-135-47.2v-56.6c0-5.3 6.6-9.4 15-9.4h240c8.4 0 15 4.1 15 9.4z" transform="translate(0 -181)" />
            <path d="M391 287.2v56.6c0 27-57.9 47.2-135 47.2V277.7h120c8.4 0 15 4.2 15 9.5z" transform="translate(0 -181)" fill="#ae2538" />
            <path d="M256 240c-77.1 0-135 20.2-135 47.2s57.9 47.2 135 47.2 135-20.2 135-47.2S333.1 240 256 240z" transform="translate(0 -181)" fill="#ff637b" />
            <path className="cls-5" d="M391 287.2c0 27-57.9 47.2-135 47.2V240c77.1 0 135 20.2 135 47.2z" transform="translate(0 -181)" />
        </svg>
    )
}