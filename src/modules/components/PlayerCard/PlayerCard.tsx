import playerCardStyles from "./playerCard.module.scss";
import { Card } from "../Card/Card";
import defaultPic from "../../../assets/loading.gif";

type PlayerCardType = {
    classname?: any,
    player: number,
    name: string,
    Symbol?: any,
    turn?: boolean,
    profilePhoto: string
}

export const PlayerCard = ({ classname, player, name, profilePhoto, Symbol, turn = false }: PlayerCardType) => {
    return (
        <Card classname={`${playerCardStyles.card} ${classname} ${turn ? playerCardStyles.turn : ""}`}>
            <div className={playerCardStyles.profilePhotoFrame}>
                <div className={playerCardStyles.profilePhoto}>
                    <img src={profilePhoto || defaultPic} alt="portrait" />
                </div>
            </div>
            <h3>Player {player}</h3>
            <h2>{name}</h2>
            {Symbol ? <Symbol classname={`${playerCardStyles.symbol}`} /> : ""}
        </Card>
    )
}