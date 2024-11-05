// axiosInstance.tsx
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// 创建 Axios 实例
const axiosInstance = axios.create({
    baseURL: 'http://10.242.61.169:8000', // 替换为你的后端地址
    timeout: 10000, // 请求超时时间
});

// 请求拦截器
// @ts-ignore
axiosInstance.interceptors.request.use(
    // @ts-ignore
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token'); // 从 localStorage 获取 token
        if (token) {
            // @ts-ignore
            config.headers['Authorization'] = `Bearer ${token}`; // 在请求头中插入 token
            console.log('config', config);
            return config;
        } else {
            return Promise.reject('没有 token');
        }
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('response', response);
        return response;
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            // 401 错误，跳转到登录页面
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
