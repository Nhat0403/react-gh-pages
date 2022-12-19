import React, { useState } from "react";
import classes from "./SearchForm.module.css";
import SearchIcon from "./SearchIcon";
import ResultList from "./ResultList";

const SearchForm = () => {
  // cấu trúc kiểm tra hợp lệ của input
  const [isValid, setIsValid] = useState(false);
  const [isTyped, setIsTyped] = useState(true);
  // cấu trúc lấy dữ liệu input
  const [enteredValue, setEnteredValue] = useState("");
  const [encoredValue, setEncoredValue] = useState("");

  // hàm xoá trường đã nhập của input khi nhấn vào nút reset
  const clearInput = (e) => {
    e.preventDefault();
    setEnteredValue("");
    setIsValid(true);
    setIsTyped(true);
  };
  // hàm lấy giá trị input khi input thay đổi
  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  // hàm lấy giá trị input sau khi nhấn và nút search
  const getInputValue = (e) => {
    e.preventDefault();

    if (enteredValue.trim().length === 0) {
      setIsValid(false);
      setIsTyped(false);
      return;
    } else {
      setIsValid(true);
      setIsTyped(true);
      const encored = encodeURI(enteredValue);
      setEncoredValue(encored);
    }
    console.log(encoredValue);
  };

  return (
    <div className={classes.container}>
      <form className={classes.form}>
        <div className={classes.top}>
          <input
            type="text"
            placeholder="batman"
            className={classes.input}
            value={enteredValue}
            onChange={valueChangeHandler}
          />
          <SearchIcon className={classes["form-search-icon"]} />
        </div>
        {!isTyped && <p className={classes.invalid}>Please input value!</p>}
        <div className={classes.bot}>
          <button type="submit" className={classes.reset} onClick={clearInput}>
            RESET
          </button>
          <button
            type="submit"
            className={classes.search}
            onClick={getInputValue}
          >
            SEARCH
          </button>
        </div>
      </form>
      {isValid && <h2 className={classes.title}>Search Result</h2>}
      {isValid && <ResultList values={encoredValue} />}
    </div>
  );
};

export default SearchForm;
