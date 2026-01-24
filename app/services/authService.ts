import axios from "axios"

export const loginUser = async( data: { email: string, password: string } ) => {
    const res = await axios.post('/api/login', data);
    return res
}