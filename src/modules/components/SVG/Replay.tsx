import SVGStyle from './SVG.module.scss';

type SVGType = {
    classname?: any
}

export const ReplaySVG = ({ classname }: SVGType) => {
    return (
        <svg
            className={`${SVGStyle.svg} ${classname}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 472.6 472.6">
            <path d="M355.2 0l-13.5 13.5 65.8 65.8H128.4a96 96 0 00-96 96v59.6h19.2v-59.6a76.9 76.9 0 0176.8-76.8h279.1l-65.8 65.8 13.5 13.5 89-88.9-89-88.9zM421 237.7v59.6a76.9 76.9 0 01-76.7 76.8H65l65.8-65.8-13.5-13.5-89 89 89 88.8 13.5-13.5-65.8-65.8h279.2a96 96 0 0095.9-96v-59.6H421z" />
        </svg>
    )
}