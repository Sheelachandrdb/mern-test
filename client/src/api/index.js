import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

const api = axios.create({
    baseURL: baseURL
})

export const insertUser = payload => api.post(`/user`, payload)
export const getAllUsers = () => api.get(`/users`)

const apis = {
    insertUser,
    getAllUsers,
}

export default apis;