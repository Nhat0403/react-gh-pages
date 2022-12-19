import React from "react";
import NavBar from "../../component/NavBar";
import SearchForm from "../../component/SearchForm";
import classes from "./Search.module.css";

const Search = () => {
  return (
    <div className={classes.search}>
      <NavBar />
      <SearchForm />
    </div>
  );
};

export default Search;
