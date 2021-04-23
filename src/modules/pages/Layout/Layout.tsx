import { LinearProgress } from "@material-ui/core";
import { useAppSelector } from "../../../helpers/hooks";
import layoutStyle from "./Layout.module.scss";

type LayoutType = {
    children: any,
}

export const Layout = ({ children }: LayoutType) => {
    const roomState = useAppSelector(state => state.roomReducer);
    return (
        <>
            {
                roomState.requesting ?
                    <div className={layoutStyle.loadBar}>
                        <LinearProgress color="secondary" />
                    </div>
                    :
                    ""
            }
            {children}
        </>
    )
}