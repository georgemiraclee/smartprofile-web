import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const instance = axios.create({
    baseURL: URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export default instance;
