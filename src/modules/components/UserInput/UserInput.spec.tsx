import { screen, render } from "@testing-library/react";
import { UserInput } from "./UserInput";
import userInputStyle from './userInput.module.scss';
import loading from "../../../assets/loading.gif";
import { Provider } from "react-redux";
import { store } from "../../../store";

it("render userInput", () => {
    render(
        <Provider store={store}>
            <UserInput />
        </Provider>
    );
    const userInput = screen.getByTestId("userInput");
    const profilePhoto = userInput.firstChild?.firstChild;
    const photo = screen.getByAltText("portrait");
    const changePhotoBtn = screen.getByTestId("changePic");
    const inputBlock = userInput.firstChild?.lastChild;

    expect(userInput).toBeInTheDocument();

    expect(profilePhoto).toBeInTheDocument();
    expect(profilePhoto).toHaveClass(userInputStyle.profilePhotoFrame);
    expect(profilePhoto?.firstChild).toHaveClass(userInputStyle.profilePhoto);
    expect(photo).toHaveAttribute("src", loading);
    expect(changePhotoBtn).toHaveClass(userInputStyle.again);

    expect(inputBlock).toBeInTheDocument();
    expect(inputBlock).toHaveClass(userInputStyle.input);
    expect(inputBlock?.firstChild).toHaveAttribute("type", "text");
    expect(inputBlock?.firstChild).toHaveAttribute("name", "nickname");
    expect(inputBlock?.firstChild).toHaveAttribute("autocomplete", "off");

})