import { Button } from "./Button";
import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

const testMsg = "Play";
const testMsg2 = "Leave";
const classname = "button";
const onClick = (e: any) => {
    e.target.innerHTML = testMsg2;
}

it("renders Menu Button", () => {
    render(<Button classname={classname} onClick={onClick}>{testMsg}</Button>);
    const btn = screen.getByText(testMsg);

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass(classname);
    expect(btn).toHaveTextContent(testMsg);

    fireEvent(btn, new MouseEvent("click", {
        bubbles: true,
        cancelable: true
    }));

    expect(btn).toHaveTextContent(testMsg2);
})

it("renders disabled Menu button", () => {
    render(<Button mode="disabled" onClick={onClick}>{testMsg}</Button>);
    const btn = screen.getByText(testMsg);

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(testMsg);

    userEvent.click(btn);

    expect(btn).toHaveTextContent(testMsg);
})

it("renders blocked Menu button", () => {
    render(<Button mode="blocked" onClick={onClick}>{testMsg}</Button>);
    const btn = screen.getByText(testMsg);

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(testMsg);

    userEvent.click(btn);

    expect(btn).toHaveTextContent(testMsg);
})

it("renders loading Menu button", () => {
    render(<Button mode="loading" onClick={onClick}>{testMsg}</Button>);
    const btn = screen.getByText(testMsg);

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(testMsg);

    userEvent.click(btn);

    expect(btn).toHaveTextContent(testMsg);
})