import titleStyle from './title.module.scss';

type TitleType = {
    children: any,
    classname?: any
}

export const Title = ({ children, classname }: TitleType) => {
    return (
        <h1 className={`${titleStyle.title} ${classname}`}>{children}</h1>
    )
}