import popupStyle from './popup.module.scss';
import { PeekingCatSVG } from "../SVG/PeekingCat";

type PopupType = {
    children: any,
    condition: any
}

export const Popup = ({ children, condition }: PopupType) => {
    return (
        <>
            <div className={`${popupStyle.blackCurtain} ${condition ? popupStyle.active : ""}`}></div>
            <div className={`${popupStyle.popup} ${condition ? popupStyle.active : ""}`}>
                <div className={popupStyle.popupBlock}>
                    <PeekingCatSVG classname={popupStyle.peekingCat} />
                    {children}
                </div>
            </div>
        </>
    )
}