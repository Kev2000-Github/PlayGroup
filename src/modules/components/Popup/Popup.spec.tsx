import { screen, render } from "@testing-library/react";
import { Popup } from "./Popup";
import popupStyle from './popup.module.scss';

const testMsg = "Hello, World";

it("render active popup", () => {
    const { container } = render(<Popup condition={true}>{testMsg}</Popup>);
    const popupContent = screen.getByText(testMsg);
    const popup = popupContent.parentNode;
    const svgDecoration = popupContent.firstChild;
    const blackCurtain = container.querySelector("div");

    expect(blackCurtain).toBeInTheDocument();
    expect(blackCurtain).toHaveClass(popupStyle.blackCurtain, popupStyle.active);

    expect(popupContent).toBeInTheDocument();
    expect(popupContent).toHaveTextContent(testMsg);
    expect(popupContent).toHaveClass(popupStyle.popupBlock);

    expect(popup).toHaveClass(popupStyle.active);
    expect(popup).toHaveClass(popupStyle.popup);

    expect(svgDecoration).toBeInTheDocument();
})

it("render inactive popup", () => {
    const { container } = render(<Popup condition={false}>{testMsg}</Popup>);
    const popupContent = screen.getByText(testMsg);
    const popup = popupContent.parentNode;
    const svgDecoration = popupContent.firstChild;
    const blackCurtain = container.querySelector("div");

    expect(blackCurtain).toBeInTheDocument();
    expect(blackCurtain).toHaveClass(popupStyle.blackCurtain);
    expect(blackCurtain).not.toHaveClass(popupStyle.active)

    expect(popupContent).toBeInTheDocument();
    expect(popupContent).toHaveTextContent(testMsg);
    expect(popupContent).toHaveClass(popupStyle.popupBlock);

    expect(popup).not.toHaveClass(popupStyle.active);
    expect(popup).toHaveClass(popupStyle.popup);

    expect(svgDecoration).toBeInTheDocument();
})