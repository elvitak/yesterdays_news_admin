import React, { useState } from "react";
import CreateArticleForm from "./CreateArticleForm";
import { Alert, Box } from "@mui/material";

const CreateArticleView = () => {
  const [message, setMessage] = useState();

  return (
    <Box
      sx={{
        boxShadow: 3,
        maxWidth: "500px",
        padding: "20px",
        marginTop: "20px",
      }}
    >
      {message && (
        <Alert data-cy="message-box" severity="info">
          {message}
        </Alert>
      )}
      <CreateArticleForm onCreateMessage={setMessage} />
    </Box>
  );
};

export default CreateArticleView;
