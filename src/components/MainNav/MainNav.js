import React from "react";

import classes from "./MainNav.module.scss";

import Logo from "../../icons/Logo.svg";

const MainNav = () => {
  const handleScrollForm = () => {
    const form = document.querySelector("#form");
    form.scrollIntoView({ behavior: "smooth" });
  };
  const handleScrollUsers = () => {
    const form = document.querySelector("#users");
    form.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <nav className={classes.nav}>
      <div className={classes.container}>
        <img src={Logo} alt="logo" />
        <div className={classes.buttons}>
          <button className={classes.btn} onClick={handleScrollUsers}>
            Users
          </button>
          <button className={classes.btn} onClick={handleScrollForm}>
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
