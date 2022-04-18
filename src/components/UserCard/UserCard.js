import React from "react";

import classes from "./UserCard.module.scss";

import { Tooltip } from "@mui/material";

const UserCard = (props) => {
  return (
    <div className={classes.wrapper}>
      <img src={props.photo} alt="avatar" className={classes.avatar} />
      <Tooltip title={props.name}>
        <span className={classes.name}>{props.name}</span>
      </Tooltip>
      <div className={classes.info}>
        <Tooltip title={props.position}>
          <span className={classes.position}>{props.position}</span>
        </Tooltip>
        <Tooltip title={props.email}>
          <span className={classes.email}>{props.email}</span>
        </Tooltip>
        <Tooltip title={props.phone}>
          <span className={classes.phone}>{props.phone}</span>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserCard;
