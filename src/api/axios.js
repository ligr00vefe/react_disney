import axios from 'axios';

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "1df440f7fd972cfece12860775907637",
        language: "ko-KR"
    }
})

export default instance;