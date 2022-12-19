import React, { useState, useEffect } from "react";
import classes from "./NavBar.module.css";
import SearchIcon from "./SearchIcon";

const NavBar = (props) => {
  // trạng thái của cuộn tới vị trí
  const [isScrollY, setIsScrollY] = useState(false);

  // hàm kiểm tra đã cuộn tới vị trí top: 100px chưa
  const onScrollHandler = () => {
    if (window.scrollY >= 100) {
      setIsScrollY(true);
    } else if (window.scrollY < 100) {
      setIsScrollY(false);
    }
  };

  // hiệu ứng khi cuộn tới vị trí top: 100px
  useEffect(() => {
    window.addEventListener("scroll", onScrollHandler);
    return () => window.removeEventListener("scroll", onScrollHandler);
  }, []);

  // định dạng className của navbar
  const navBarClasses = `${classes.navbar} ${
    isScrollY ? classes["bg-black"] : ""
  }`;

  // hàm di chuyển tới trang browse
  const gotoBrowsePageHandler = () => {
    const path = "/react-gh-pages";
    // định dạng đường dẫn trang browse
    const returnUrl =
      window.location.protocol + "//" + window.location.host + path;
    window.location.replace(returnUrl);
    console.log("ok");
  };

  return (
    <div className={navBarClasses}>
      <h3 className={classes.title} onClick={gotoBrowsePageHandler}>
        Movie App
      </h3>
      <SearchIcon className={classes["search-icon"]} />
    </div>
  );
};

export default NavBar;
