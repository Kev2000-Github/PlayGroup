import { screen, render } from "@testing-library/react";
import { Card } from "./Card";

const testMsg = "Hello, World";
const classname = "card";

it("renders card", () => {
    render(<Card classname={classname}>{testMsg}</Card>);
    const card = screen.getByText(testMsg);

    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent(testMsg);
    expect(card).toHaveClass(classname);
})
