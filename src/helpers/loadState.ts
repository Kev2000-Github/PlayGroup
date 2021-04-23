
export const loadState = () => {
    const uuid: string = localStorage.getItem("uuid") || "";
    const user: string = localStorage.getItem("nickname") || "";

    return { uuid, user, profileURL: "" };
}