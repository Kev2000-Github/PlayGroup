import { Title } from "./Title";
import { screen, render } from "@testing-library/react";
import titleStyle from './title.module.scss';

const testMsg = "Hello, World"
const className = "green";

it("renders custom styled title", () => {
    render(<Title classname={className}>{testMsg}</Title>);
    const title = screen.getByText(testMsg);

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(testMsg);
    expect(title).toHaveClass(titleStyle.title, className);
})