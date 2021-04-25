import { API } from './index';
import { RESOURCE_URL, EXPLORE, AUTH, SIGNIN, ME } from 'app/constants/api';
import { DEFAULT_PAGE_SIZE } from 'app/constants/pagination';

export const signin = (access_token: string) => {
    return API.post(RESOURCE_URL + AUTH + SIGNIN, {access_token});
}

export const me = (access_token: string) => {
    return API.postWithAccessToken(RESOURCE_URL + AUTH + ME, {}, access_token);
}
