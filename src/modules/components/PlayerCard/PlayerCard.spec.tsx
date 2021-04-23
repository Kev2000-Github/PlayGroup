import { PlayerCard } from "./PlayerCard";
import { screen, render } from "@testing-library/react";
import loading from "../../../assets/loading.gif";

const player = 1;
const nickname = "Pepe";
const TestSVG = () => {
    return (
        <svg data-testid="svg">this is an svg</svg>
    )
}

it("should render PlayerCard", () => {
    render(<PlayerCard
        player={player}
        name={nickname}
        Symbol={TestSVG}
        profilePhoto={loading}
    />)

    const playerCard = screen.getByTestId("card");
    expect(playerCard).toBeInTheDocument();
    expect(playerCard).toHaveTextContent(player.toString());
    expect(playerCard).toHaveTextContent(nickname);
    expect(screen.getByTestId("svg")).toBeTruthy();
})