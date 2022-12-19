import React, { useEffect, useState } from "react";
import classes from "./ResultList.module.css";
import useFecth from "../hooks/use-fetch";
import hostLink from "../store/hostLink";
import API_KEY from "../store/API_KEY";
import imgLink from "../store/imgLink";
import MovieDetail from "./MovieDetail";
import comingSoonImg from "../store/comingSoonImg";

const ResultList = (props) => {
  const [data, setData] = useState([]);
  // các trạng thái để nhận diện film được chọn để in ra movie detail
  const [clickedMovie, setClickedMovie] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [movieDetail, setMovieDetail] = useState([]);

  // lấy dữ liệu qua hook useFecth
  const { isLoading, fetchError, fetchAPI: fetchMovies } = useFecth();
  // định dạng đường dẫn search
  const url = `${hostLink}/search/movie?api_key=${API_KEY}&language=en-US&query=${props.values}&page=1&include_adult=false`;

  console.log(`search: ` + url);

  // sử dụng hiệu ứng để lấy movie cho move list
  useEffect(() => {
    const getMovieList = (movie) => {
      setData(movie.results);
    };
    fetchMovies(url, getMovieList);
  }, [fetchMovies, url]);

  console.log(data);

  // hàm hiển thị movie detail
  const showDetailHandler = (event) => {
    setIsClicked(true);
    setClickedMovie(event.target.id);
    const index = data.findIndex((i) => i.id === +event.target.id);
    setMovieDetail(data[index]);
    console.log(data[index]);
    window.scrollTo(0, 255);
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

  // in ra khi nhận được dữ liệu
  if (data) {
    content = data.map((movie) => (
      <li key={movie.id} className={classes.movie} onClick={showDetailHandler}>
        <img
          id={movie.id}
          src={
            movie.poster_path || movie.backdrop_path
              ? imgLink + (movie.poster_path || movie.backdrop_path)
              : comingSoonImg
          }
          alt={movie.id}
          className={classes.img}
        ></img>
      </li>
    ));
  }

  return (
    <div>
      {isClicked && <MovieDetail movie={clickedMovie} detail={movieDetail} />}
      <ul className={classes.container}>{content}</ul>;
    </div>
  );
};

export default ResultList;
