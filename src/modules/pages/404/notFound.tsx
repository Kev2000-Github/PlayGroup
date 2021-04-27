import { Link } from "react-router-dom";
import notFoundStyle from "./notFound.module.scss";
import { paths } from "../../../utils/constants/paths";

export const NotFound = () => {
    return (
        <div className={notFoundStyle.main}>
            <div className={notFoundStyle.noise}></div>
            <div className={notFoundStyle.overlay}></div>
            <div className={notFoundStyle.terminal}>
                <h1>Error <span className={notFoundStyle.errorcode}>404</span></h1>
                <p className={notFoundStyle.output}>You're not supposed to be here, lost soul, please go back to where you came</p>
                <p className={notFoundStyle.output}>Good luck on your way back.</p>
                <p className={notFoundStyle.output}><Link to={paths.HOME}>return to the homepage</Link> / <a href="#">stay here</a>.</p>
            </div>
        </div>
    )
}