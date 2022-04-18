import React from "react";

import classes from "./Cta.module.scss";

const Cta = () => {
  const handleScroll = () => {
    const form = document.querySelector("#form");
    form.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <h1 className={classes.heading}>
          Test assignment for front-end developer
        </h1>
        <p className={classes.description}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className={classes.btn} onClick={handleScroll}>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Cta;
