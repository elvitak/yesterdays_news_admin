import React, { useState } from "react";
import Authentication from "../modules/Authentication";
import { Typography, TextField, Box, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [signupForm, setSignupForm] = useState({});
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSignupForm({
      ...signupForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const response = await Authentication.signUp(
      signupForm.name,
      signupForm.email,
      signupForm.password,
      signupForm.conf_password
    );
    if (response.status === "success") {
      setMessage(response.status);
      setTimeout(() => navigate("/"), 2500);
    } else {
      setMessage(response);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
        boxShadow: 3,
        maxWidth: "500px",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ margin: "30px 10px" }}
        data-cy="registration-header"
      >
        Registration form
      </Typography>
      <TextField
        data-cy="name-input"
        label="Your name"
        name="name"
        size="small"
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        data-cy="email-input"
        label="Email"
        name="email"
        size="small"
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        data-cy="password-input"
        label="Password"
        name="password"
        type="password"
        size="small"
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        data-cy="conf-password-input"
        label="Confirm password"
        name="conf_password"
        type="password"
        size="small"
        onChange={handleChange}
        variant="outlined"
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        data-cy="register-button"
      >
        Register
      </Button>
      {message && (
        <Alert data-cy="flash-message" severity="info">
          {message}
        </Alert>
      )}
    </Box>
  );
};

export default RegistrationForm;
