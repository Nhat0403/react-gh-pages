import React, { useState, useEffect } from "react";
import classes from "./Banner.module.css";
import useFecth from "../hooks/use-fetch";
import requests from "../store/request";
import hostLink from "../store/hostLink";
import imgLink from "../store/imgLink";

const Banner = () => {
  const [data, setData] = useState([]);
  // lấy dữ liệu qua hook useFecth
  const { isLoading, fetchError, fetchAPI: fetchMovies } = useFecth();

  // định dạng đường dẫn cho api của banner
  const url = hostLink + requests.fetchNetflixOriginals;

  // sử dụng hiệu ứng để lấy movie cho banner
  useEffect(() => {
    const getMovieBanner = (movie) => {
      setData(
        movie.results[Math.floor(Math.random() * movie.results.length - 1)]
      );
    };
    fetchMovies(url, getMovieBanner);
  }, [fetchMovies, url]);

  console.log(requests);

  let content = <p>Found no movies.</p>;

  // in ra khi đang tải trang
  if (isLoading) {
    content = (
      <div className={"fetch-loading"}>
        <p>Loading...</p>
      </div>
    );
  }

  // in ra khi lỗi
  if (fetchError) {
    content = (
      <div className={"fetch-error"}>
        <p>{fetchError}</p>
      </div>
    );
  }

  // định dạng tiêu đề phim
  const title = data.original_name || data.title || data.name;
  // định dạng thông tin tổng quát phim
  const overview = !data.overview ? "Coming soon." : data.overview;
  // định dạng đường dẫn hình ảnh phim
  const backdropPath = imgLink + data.backdrop_path;

  // in ra khi nhận được dữ liệu
  if (data) {
    content = (
      <div
        className={classes.banner}
        style={{ backgroundImage: `url(${backdropPath})` }}
      >
        <div className={classes["banner-container"]}>
          <h1 className={classes.name}>{title}</h1>
          <div className={classes["button-container"]}>
            <button type="submit" className={classes.button}>
              Play
            </button>
            <button type="submit" className={classes.button}>
              My List
            </button>
          </div>
          <div className={classes.overview}>{overview}</div>
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default Banner;
