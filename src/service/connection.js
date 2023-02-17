import axios from "axios"

export class RequisitionAxios {

   static async Get(path) {
        return await axios.get(`https://servidornovo.onrender.com${path}`)
    }
    static async Post(path, body) {
        return await axios.post(`https://servidornovo.onrender.com${path}`,
        body)
    }
    static async Put(path, body) {
        return await axios.put(`https://servidornovo.onrender.com${path}`,
        body)
    }
    static async Delete(path) {
        return await axios.delete(`https://servidornovo.onrender.com${path}`)
    }
}