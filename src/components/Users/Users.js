import { CircularProgress } from "@mui/material";
import React from "react";
import UserCard from "../UserCard/UserCard";

import classes from "./Users.module.scss";

const Users = (props) => {
  return (
    <section className={classes.wrapper} id="users">
      <h2 className={classes.heading}>Working with GET request</h2>
      {!props.users && <CircularProgress style={{ color: "#00BDD3" }} />}
      <div className={classes.users}>
        {props.users &&
          props.users.map((e) => (
            <UserCard
              name={e.name}
              email={e.email}
              phone={e.phone}
              position={e.position}
              photo={e.photo}
            />
          ))}
      </div>
      {props.isLoading && <CircularProgress style={{ color: "#00BDD3" }} />}

      {props.isShowMore && !props.isLoading && (
        <button className={classes.btn} onClick={props.loadUsers}>
          Show more
        </button>
      )}
    </section>
  );
};

export default Users;
