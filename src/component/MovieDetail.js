import React, { useState, useEffect } from "react";
import classes from "./MovieDetail.module.css";
import useFecth from "../hooks/use-fetch";
import hostLink from "../store/hostLink";
import imgLink from "../store/imgLink";
import API_KEY from "../store/API_KEY";
import comingSoonImg from "../store/comingSoonImg";

const MovieDetail = (props) => {
  const [trailer, setTrailer] = useState("");
  const [isTrailer, setIsTrailer] = useState(false);
  // lấy dữ liệu qua hook useFecth
  const { isLoading, fetchError, fetchAPI: fetchMovies } = useFecth();

  // định dạng đường dẫn cho api của movie detail
  const url = hostLink + `/movie/` + props.movie + `/videos?api_key=` + API_KEY;
  // console.log(`movie detail`);
  // console.log(props.detail);

  // sử dụng hiệu ứng để lấy movie cho movie detail
  useEffect(() => {
    const getMovieDetail = (movie) => {
      if (movie.results[0].key) {
        setTrailer(movie.results[0].key);
        setIsTrailer(true);
      } else {
        setIsTrailer(false);
      }
      console.log(`movie results`);
      console.log(movie.results);
    };
    fetchMovies(url, getMovieDetail);
  }, [fetchMovies, url]);

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

  if (isTrailer) {
    content = (
      <iframe
        src={`https://www.youtube.com/embed/${trailer}`}
        title={props.movie}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className={classes.trailer}
      ></iframe>
    );
  } else {
    content = (
      <img
        id={props.detail.id}
        src={
          props.detail.backdrop_path
            ? imgLink + props.detail.backdrop_path
            : comingSoonImg
        }
        alt={props.detail.id}
        className={classes.backdrop}
      ></img>
    );
  }

  // định dạng tiêu phim
  const title =
    props.detail.original_name || props.detail.title || props.detail.name;
  // định dạng thông tin tổng quát phim
  const overview = !props.detail.overview
    ? "Coming soon."
    : props.detail.overview;
  // định dạng ngày phát hành
  const releaseDate = props.detail.release_date || props.detail.first_air_date;

  return (
    <div className={classes["movie-detail"]}>
      <div className={classes.description}>
        <h2 className={classes.title}>{title}</h2>
        <hr />
        <div className={classes.info}>
          Release Date: {releaseDate ? releaseDate : "Coming soon"}
          <br />
          Vote: {props.detail.vote_average.toFixed(2)}/10
        </div>
        <div>{overview}</div>
      </div>
      {content}
    </div>
  );
};

export default MovieDetail;
