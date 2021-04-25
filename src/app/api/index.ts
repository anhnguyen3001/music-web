import axios from 'axios';
import queryString from 'query-string';

export const API = {
    post: async (url: string, body: any) => {
        try {
            const response = await axios.post('http://' + url, body);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    postWithAccessToken: async (
        url: string,
        body: any,
        access_token: string,
    ) => {
        try {
        const response = await axios.post('http://' + url, body, {
            headers: {
            Authorization:
                'Bearer ' + access_token,
            },
        });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    graphql: async (url: string, query: any) => {
        try {
            const response = await axios.post('http://' + url, {query: query});
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
};
