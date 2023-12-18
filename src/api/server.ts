import axios from 'axios';

axios.defaults.baseURL = 'https://www.4kvm.net';

interface FcResponse<T> {
  errno: string;
  errmsg: string;
  data: T;
}

axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      return Promise.reject(response.data);
    }
    return response;
  },
  err => {
    Promise.reject(err.response);
  },
);

export const Get = <T>(
  url: string,
  params?: object,
): Promise<[any, FcResponse<T> | string | undefined]> =>
  new Promise(resolve => {
    axios
      .get(url, {
        params,
      })
      .then(result => {
        resolve([null, result.data]);
      })
      .catch(err => {
        resolve([err, undefined]);
      });
  });

export const Post = <T>(
  url: string,
  data?: object,
  params?: object,
): Promise<[any, FcResponse<T> | string | undefined]> => {
  return new Promise(resolve => {
    axios
      .post(url, data, {
        params,
      })
      .then(result => {
        resolve([null, result.data]);
      })
      .catch(err => {
        resolve([err, undefined]);
      });
  });
};
