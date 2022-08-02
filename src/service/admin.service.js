import axios from 'axios'
import { server } from "../config/global"
export const adminService = {
    descontar(data) {
        let response
        let url = server.API_URL + 'reclamar/chela'
        response = axios
            .post(url, data)
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch(errors => {
                return { success: false, data: errors.response.data.message }
            })
        return response
    },
    loginAdmin(data) {
        let response
        let url = server.API_URL + 'admin/login'
        response = axios
            .post(url, data)
            .then(response => {
                return { success: true, data: response.data.success }
            })
            .catch(errors => {
                return { success: false }
            })
        return response
    },
    foundUser(data) {
        let response
        let url = server.API_URL + 'found/user/dni'
        response = axios
            .post(url, { dni: data })
            .then(response => {
                return { success: true, data: response.data.data }
            })
            .catch(errors => {
                return { success: false }
            })
        return response
    },


}