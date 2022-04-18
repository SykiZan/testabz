import {
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import InputFile from "../InputFile/InputFile";

import classes from "./SignUp.module.scss";

import Registered from "../../icons/success-image.svg";

const SignUp = (props) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isNameError, setIsNameError] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPhotoError, setIsPhotoError] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [photo, setPhoto] = useState(null);
  const [positions, setPositions] = useState(null);

  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [positionErrorMessage, setPositionErrorMessage] = useState("");
  const [photoErrorMessage, setPhotoErrorMessage] = useState("");

  const [isRegistered, setIsRegistered] = useState(false);

  const [isPostPending, setIsPostPending] = useState(false);

  useEffect(() => {
    const getPositions = async () => {
      const res = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/positions"
      );

      const data = await res.json();

      setPositions(data);
    };
    getPositions();
  }, []);

  const handleRadio = (e) => {
    console.log(e.target.value);
    setPosition(e.target.value);
  };

  // const phonePattern = /^[+]{0,1}380([0-9]{9})$/;

  // const emailPattern =
  //   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  // const validatePhonePattern = (val) => {
  //   const result = phonePattern.test(val);

  //   return result;
  // };
  // const validateEmailPattern = (val) => {
  //   const result = emailPattern.test(val);
  //   return result;
  // };

  // const validateName = (name) => {
  //   if (name.length < 2) return false;
  //   else return true;
  // };

  const handleNameInput = (e) => {
    if (isNameError) setIsNameError(false);
    setName(e.target.value);
  };
  const handleEmailInput = (e) => {
    if (isEmailError) setIsEmailError(false);
    setEmail(e.target.value);
  };
  const handlePhoneInput = (e) => {
    if (isPhoneError) setIsPhoneError(false);
    setPhone(e.target.value);
  };

  useEffect(() => {
    if (name && email && phone && position && photo) setIsDisabled(false);
    if (!(name && email && phone && position && photo)) setIsDisabled(true);
  }, [name, phone, email, position, photo]);

  const sendData = async () => {
    setIsPostPending(true);
    const formData = new FormData();

    formData.append("photo", photo);
    formData.append("phone", phone);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("position_id", position);

    console.log(formData);

    const res = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/token"
    );
    console.log(res);

    const data = await res.json();

    const token = data.token;

    console.log(data);

    const res1 = await fetch(
      "https://frontend-test-assignment-api.abz.agency/api/v1/users",
      {
        method: "POST",
        headers: { Token: token },
        body: formData,
      }
    );

    const data1 = await res1.json();

    if (data1.message === "New user successfully registered") {
      setIsRegistered(true);
      props.handleNewUser();
    }
    if (data1.message === "User with this phone or email already exist") {
      setIsEmailError(true);
      setEmailErrorMessage("User with this phone or email already exist");
      setIsPhoneError(true);
      setPhoneErrorMessage("User with this phone or email already exist");
    }
    if (data1.success === false) {
      if (data1.fails?.name) {
        setIsNameError(true);
        setNameErrorMessage(data1.fails.name);
      }

      if (data1.fails?.email) {
        setIsEmailError(true);
        setEmailErrorMessage(data1.fails.email[0]);
      }
      if (data1.fails?.phone) {
        setIsPhoneError(true);
        setPhoneErrorMessage(data1.fails.phone[0]);
      }
      if (data1.fails?.photo) {
        setIsPhotoError(true);
        setPhotoErrorMessage(data1.fails.photo[0]);
      }
    }
    setIsPostPending(false);
  };

  const handleSignUp = () => {
    // const isEmailPattern = validateEmailPattern(email);

    // const isPhonePattern = validatePhonePattern(phone);

    // setIsEmailError(!isEmailPattern);
    // setIsPhoneError(!isPhonePattern);

    sendData();
  };

  const handleLoad = (val) => {
    setPhoto(val);
    setIsPhotoError(false);
  };

  return (
    <section className={classes.wrapper} id="form">
      {!isRegistered && (
        <>
          <h2 className={classes.heading}>Working with POST request</h2>

          <form
            className={classes.form}
            style={{ visibility: `${isPostPending ? "hidden" : ""}` }}
          >
            <section className={classes.inputs}>
              <TextField
                onChange={handleNameInput}
                error={isNameError}
                value={name}
                helperText={isNameError && nameErrorMessage}
                inputProps={{
                  style: { height: 21 },
                }}
                label="Your name"
                sx={{
                  "& .MuiFormHelperText-root.Mui-error": {
                    position: "absolute",
                    top: "100%",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#CB3D40",
                    fontFamily: "Nunito",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgba(0, 0, 0, 0.87) ",

                    fontFamily: "Nunito",
                  },
                }}
              />
              <TextField
                onChange={handleEmailInput}
                error={isEmailError}
                value={email}
                helperText={isEmailError && emailErrorMessage}
                inputProps={{
                  style: { height: 21 },
                }}
                sx={{
                  "& .MuiFormHelperText-root.Mui-error": {
                    position: "absolute",
                    top: "100%",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "#CB3D40",
                    fontFamily: "Nunito",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgba(0, 0, 0, 0.87) ",

                    fontFamily: "Nunito",
                  },
                }}
                label="Email"
              />
              <TextField
                onChange={handlePhoneInput}
                error={isPhoneError}
                value={phone}
                helperText={
                  isPhoneError ? phoneErrorMessage : "+38 (XXX) XXX - XX - XX"
                }
                inputProps={{
                  style: { height: 21 },
                }}
                sx={{
                  "& .MuiFormHelperText-root.Mui-error": {
                    color: "#CB3D40",
                    fontFamily: "Nunito",
                  },
                  "& .MuiOutlinedInput-input": {
                    color: "rgba(0, 0, 0, 0.87) ",

                    fontFamily: "Nunito",
                  },
                }}
                label="Phone"
              />
            </section>

            <section className={classes["select-block"]}>
              <h3 className={classes.subheading}>Select your position</h3>

              <RadioGroup
                onChange={handleRadio}
                className={classes["radio-group"]}
              >
                {positions &&
                  positions.positions.map((e, i) => (
                    <FormControlLabel
                      value={e.id}
                      control={
                        <Radio
                          sx={{
                            color: "#D0CFCF",
                            "&.Mui-checked": {
                              color: "#00BDD3",
                            },
                          }}
                        />
                      }
                      label={e.name}
                    ></FormControlLabel>
                  ))}
              </RadioGroup>

              <InputFile
                onChange={handleLoad}
                errorMessage={photoErrorMessage}
                isError={isPhotoError}
              />
            </section>
          </form>

          {!isPostPending && (
            <button
              disabled={isDisabled}
              onClick={handleSignUp}
              className={`${classes.btn} ${
                isDisabled ? classes["btn-disabled"] : classes["btn-active"]
              }`}
              style={{ cursor: `${isDisabled ? "not-allowed" : "pointer"}` }}
            >
              Sign up
            </button>
          )}
        </>
      )}
      {isPostPending && (
        <CircularProgress
          style={{ color: "#00BDD3", position: "absolute", top: "40%" }}
        />
      )}
      {isRegistered && !isPostPending && (
        <>
          <h2 className={classes.heading}>User successfully registered</h2>
          <img src={Registered} alt="registered" />
        </>
      )}
    </section>
  );
};

export default SignUp;
