import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:9000";
/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */
class Api {
    static token;

    static async request(endpoint, data = {}, method = "GET") {
        console.debug("API call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${Api.token}` }
        const params = (method === "GET") ? data : {}

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
    };

    // CODES ROUTES
    static async getAllCodes() {
        const res = await this.request(`codes/`);
        return res.codes;
    }
    static async getCodeById(id) {
        const res = await this.request(`codes/${id}`);
        return res.code;
    }
    static async createCode(username, data) {
        const res = await this.request(`codes/${username}`, data, "POST");
        return res.code;
    }
    static async updateCode(username, data, id) {
        const res = await this.request(`codes/${id}/${username}`, data, "PUT");
        return res.code;
    }
    static async deleteCodeById(id, username) {
        const res = await this.request(`codes/${id}/${username}`, {}, "DELETE");
        return res.deleted;
    }
    static async postLike(id, username) {
        const res = await this.request(`codes/${id}/${username}/like`, {}, "POST"); // buttonOnclick={() => postLike(postId, currentUser.username)}
        return res.code;
    }
    static async getCodesByUsername(username) {
        const codes = this.request(`codes/user/${username}`);
        return codes.codes;
    }

    // POSTS ROUTES
    static async getAllPosts() {
        const res = await this.request(`posts/`);
        return res.posts;
    }
    static async getPostById(id) {
        const res = await this.request(`posts/${id}`);
        return res.post;
    }
    static async createPost(username, data) {
        const res = await this.request(`posts/${username}`, data, "POST");
        return res.post;
    }
    static async updatePost(username, data, id) {
        const res = await this.request(`posts/${id}/${username}`, data, "PUT");
        return res.post;
    }
    static async deletePostById(id, username) {
        const res = await this.request(`posts/${id}/${username}`, {}, "DELETE");
        return res.deleted;
    }
    static async getPostsByUsername(username) {
        const posts = this.request(`posts/user/${username}`);
        return posts.posts;
    }
}

export default Api;