
export const saveState = (uuid: string, nickname: string) => {
    localStorage.setItem("uuid", uuid);
    localStorage.setItem("nickname", nickname);
}