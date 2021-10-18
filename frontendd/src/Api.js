import axios from "axios";

const BASE_URL = "http://localhost:9000";
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class Api {
    static token;
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${Api.token}` }
        const params = (method === "get") ? data : {}

        try {
            return (await axios({ url, method, data, params, headers })).data;
        }
        catch (e) {
            console.error("API Error", e.response);
            const message = e.response.data.error.message;
            throw Array.isArray(message) ? message : [message]
        }
    }
    static async register(data) {
        const res = await this.request("auth/register", data, "POST");
        return res.token;
    }

    static async login(data) {
        const res = await this.request("auth/token", data, "POST");
        return res.token;
    }

    static async getUser(username) {
        const res = await this.request("users/" + username);
        return res.user;
    }
}

export default Api;