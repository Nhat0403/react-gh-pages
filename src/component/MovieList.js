import React, { useState, useEffect } from "react";
import classes from "./MovieList.module.css";
import useFecth from "../hooks/use-fetch";
import hostLink from "../store/hostLink";
import imgLink from "../store/imgLink";
import { useHorizontalScroll } from "../hooks/use-horizontal-scroll";
import MovieDetail from "./MovieDetail";
import comingSoonImg from "../store/comingSoonImg";

const MovieList = (props) => {
  const [data, setData] = useState([]);
  // các trạng thái để nhận diện film được chọn để in ra movie detail
  const [clickedMovie, setClickedMovie] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);

  // sử dụng cấu trúc cuộn ngang
  const scrollRef = useHorizontalScroll();
  // lấy dữ liệu qua hook useFecth
  const { isLoading, fetchError, fetchAPI: fetchMovies } = useFecth();

  // định dạng đường dẫn cho api của move list
  const url = hostLink + props.path;

  // sử dụng hiệu ứng để lấy movie cho move list
  useEffect(() => {
    const getMovieList = (movie) => {
      setData(movie.results);
    };
    fetchMovies(url, getMovieList);
  }, [fetchMovies, url]);

  // hàm hiển thị movie detail
  const showDetailHandler = (event) => {
    setIsClicked(true);
    setClickedMovie(event.target.id);
    const index = data.findIndex((i) => i.id === +event.target.id);
    setMovieDetail(data[index]);
    console.log(`clicked movie`);
    console.log(data[index]);
    if (isClicked) {
      setIsClicked(false);
    }
  };

  let content = <p>Found no movies.</p>;

  // in ra khi đang tải trang
  if (isLoading) {
    content = (
      <section className={"fetch-loading"}>
        <p>Loading...</p>
      </section>
    );
  }

  // in ra khi lỗi
  if (fetchError) {
    content = (
      <section className={"fetch-error"}>
        <p>{fetchError}</p>
      </section>
    );
  }

  const liClasses = props.displayTop
    ? classes["movie-li-top"]
    : classes["movie-li"];

  // in ra khi nhận được dữ liệu
  if (data) {
    // movie detail ở hàng đầu ko có tiêu đề
    if (props.displayTop) {
      content = data.slice(0, 10).map((movie) => (
        <li key={movie.id} onClick={showDetailHandler}>
          <img
            id={movie.id}
            src={
              movie.poster_path ? imgLink + movie.poster_path : comingSoonImg
            }
            alt={movie.id}
            className={liClasses}
          ></img>
        </li>
      ));
      // movie detail ở hàng 2 trở đi có tiêu đề
    } else {
      content = data.map((movie) => (
        <li key={movie.id} onClick={showDetailHandler}>
          <img
            id={movie.id}
            src={
              movie.backdrop_path
                ? imgLink + movie.backdrop_path
                : comingSoonImg
            }
            alt={movie.id}
            className={liClasses}
          ></img>
        </li>
      ));
    }
  }

  const movieListClasses = props.displayTop
    ? classes["movie-list-top"]
    : classes["movie-list"];

  const hasScroll = props.displayTop ? null : scrollRef;

  return (
    <div>
      <ul className={movieListClasses} ref={hasScroll}>
        {content}
      </ul>
      {isClicked && <MovieDetail movie={clickedMovie} detail={movieDetail} />}
    </div>
  );
};

export default MovieList;
