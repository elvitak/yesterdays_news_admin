import React, { useState } from "react";
import auth from "../modules/authentication";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmission = async () => {
    const credentials = await auth.signIn(email, password);
    if (credentials.status === "success") {
      navigate("/article/create", { flash: `Welcome ${credentials.name}` });
    }
  };

  return (
    <>
      <h1>Login to access the platform</h1>
      <label htmlFor="email-field"></label>
      <input
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        data-cy="email-field"
      />
      <label htmlFor="password-field"></label>
      <input
        onChange={(event) => setPassword(event.target.value)}
        type="text"
        data-cy="password-field"
      />
      <input
        onClick={handleSubmission}
        type="button"
        value="Log in"
        data-cy="login-button"
      />
    </>
  );
};

export default LoginForm;
