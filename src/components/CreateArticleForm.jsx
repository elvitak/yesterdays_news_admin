import React, { useState } from "react";
import Articles from "../modules/Articles";
import utils from "../modules/utils";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Box,
  MenuItem,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";

const Input = styled("input")({
  display: "none",
});

const InitialArticle = {
  title: "",
  body: "",
  category: "",
  image: "",
};

const CreateArticleForm = ({ onCreateMessage }) => {
  const [article, setArticle] = useState(InitialArticle);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Articles.create(article);
    onCreateMessage(response);
    if (response === "Article succesfully created!") {
      setArticle(InitialArticle);
      setFileName("");
      setTimeout(() => onCreateMessage(""), 4000);
    }
  };

  const handleChange = (event) => {
    setArticle({
      ...article,
      [event.target.name]: event.target.value,
    });
  };

  const handleImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    file.name && setFileName(file.name);
    const encodedFile = await utils.imageEncoder(file);
    setArticle({ ...article, image: encodedFile });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ "& > :not(style)": { m: 1 } }}
    >
      <TextField
        fullWidth
        data-cy="title-input"
        label="Title"
        name="title"
        size="small"
        onChange={handleChange}
        value={article.title}
        variant="outlined"
      />
      <TextField
        data-cy="body-input"
        fullWidth
        multiline
        rows={7}
        label="Article body"
        name="body"
        size="small"
        onChange={handleChange}
        value={article.body}
        variant="outlined"
      />
      <FormControl sx={{ width: "130px" }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          style={{ width: "200px" }}
          data-cy="category-select"
          onChange={handleChange}
          value={article.category}
          name="category"
          label="Category"
        >
          <MenuItem data-cy="news-category" value={"news"}>
            News
          </MenuItem>
          <MenuItem data-cy="politics-category" value={"politics"}>
            Politics
          </MenuItem>
          <MenuItem data-cy="economy-category" value={"economy"}>
            Economy
          </MenuItem>
          <MenuItem data-cy="sports-category" value={"sports"}>
            Sports
          </MenuItem>
        </Select>
      </FormControl>
      <div>
        <label htmlFor="contained-button-file">
          <Input
            data-cy="image-input"
            accept="image/*"
            id="contained-button-file"
            onChange={handleImage}
            name="image"
            multiple
            type="file"
          />
          <Button
            variant="contained"
            component="span"
            endIcon={<PhotoCamera />}
          >
            Upload
          </Button>
        </label>

        <Typography
          variant="caption"
          gutterBottom
          style={{ marginLeft: "10px" }}
          data-cy="file-name"
        >
          {fileName}
        </Typography>
      </div>
      <Button
        variant="contained"
        type="submit"
        data-cy="submit-button"
        endIcon={<SendIcon />}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreateArticleForm;
