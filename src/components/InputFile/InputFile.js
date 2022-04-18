import React, { useEffect, useRef, useState } from "react";

import classes from "./InputFile.module.scss";

const InputFile = (props) => {
  const inputRef = useRef();

  const [file, setFile] = useState(null);

  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const handleChange = (e) => {
    setFile(inputRef.current.files[0]);

    props.onChange(inputRef.current.files[0]);
  };

  console.log(props.isError);

  return (
    <div className={classes.wrapper}>
      <input
        onChange={handleChange}
        type="file"
        hidden="hidden"
        ref={inputRef}
        className={classes["real-input"]}
      />
      <div className={classes["custom-input"]}>
        <button
          className={classes.btn}
          onClick={handleClick}
          style={{
            borderColor: `${props.isError ? "#CB3D40" : ""}`,
          }}
        >
          Upload
        </button>
        <div
          className={classes["file-name"]}
          style={{
            borderColor: `${props.isError ? "#CB3D40" : ""}`,
          }}
        >
          {file && file.name}
          {!file && "Upload your photo"}
        </div>
      </div>
      {props.errorMessage && (
        <span className={classes.error}>{props.errorMessage}</span>
      )}
    </div>
  );
};

export default InputFile;
