import request from 'umi-request';


export const apiGet = (api_url, options) => request.get(api_url, options);

export const apiPost = (api_url, options) => request.post(api_url, options);

export const apiPut = (api_url, options) => request.put(api_url, options);

export const apiDelete = (api_url, options) => request.delete(api_url, options);

const url = 'http://localhost:3000';

export const endpoints = {

    upload: `${url}/upload`,
    getUploadPage: `${url}`
};