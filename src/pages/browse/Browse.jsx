import React from "react";
import NavBar from "../../component/NavBar";
import Banner from "../../component/Banner";
import MovieList from "../../component/MovieList";
import requests from "../../store/request";
import classes from "./Browse.module.css";

function Browse() {
  return (
    <div className={classes.browse}>
      <NavBar />
      <Banner />
      <MovieList path={requests.fetchNetflixOriginals} displayTop />
      <h2 className={classes.title}>Xu hướng</h2>
      <MovieList path={requests.fetchTrending} />
      <h2 className={classes.title}>Xếp hạng cao</h2>
      <MovieList path={requests.fetchTopRated} />
      <h2 className={classes.title}>Hành động</h2>
      <MovieList path={requests.fetchActionMovies} />
      <h2 className={classes.title}>Hài</h2>
      <MovieList path={requests.fetchComedyMovies} />
      <h2 className={classes.title}>Kinh dị</h2>
      <MovieList path={requests.fetchHorrorMovies} />
      <h2 className={classes.title}>Lãng mạn</h2>
      <MovieList path={requests.fetchRomanceMovies} />
      <h2 className={classes.title}>Tài liệu</h2>
      <MovieList path={requests.fetchDocumentaries} />
    </div>
  );
}

export default Browse;
