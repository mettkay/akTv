import {Get} from './server';

const getMovieListByText = (text: string) => {
  return Get(`/xssearch?s=${text}`);
};

const getMovieDetail = (name: string) => {
  return Get(`/movies/${name}`);
};

const getMovieFrame = (id: number) => {
  return Get(`/wp-json/dooplayer/v1/post/${id}?type=movie&source=1`);
};

const getMovieUrl = (id: number) => {
  return Get(`/artplayer?mvsource=0&id=${id}&type=hls`);
};

export const api = {
  getMovieListByText,
  getMovieDetail,
  getMovieFrame,
  getMovieUrl,
};
