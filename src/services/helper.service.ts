import axios from 'axios';

export const getRandomPic = async () => {
    const response = await axios.get("https://picsum.photos/100");
    return response;
}

export const helperServices = {
    getRandomPic
}