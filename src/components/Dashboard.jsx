import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Paper,
  Grid,
  Alert,
  Container,
} from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Articles from "../modules/Articles";
import ArticleCard from "./ArticleCard";

const Dashboard = () => {
  const [articles, setArticles] = useState([]);
  const [message, setMessage] = useState();
  const { currentUser } = useSelector((state) => state);
  const navigate = useNavigate();

  const fetchArticles = async () => {
    const data = await Articles.index(currentUser);
    if (data.message || data.length === 0) {
      setMessage("You haven't created any articles yet");
    } else {
      setArticles(data.articles);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const userArticles = articles.map((article) => {
    return (
      <Grid item key={article.id} md={12}>
        <ArticleCard article={article} />
      </Grid>
    );
  });

  return (
    <>
      <Paper elevation={3} sx={{ maxWidth: 700 }}>
        <Typography
          variant="h6"
          gutterBottom
          style={{ margin: "30px 10px", paddingTop: "10px" }}
          data-cy="flash-message"
        >{`Welcome ${currentUser.name}!`}</Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/article/create")}
          data-cy="create-article-btn"
          style={{ margin: "20px 10px" }}
          endIcon={<HistoryEduIcon />}
        >
          Create new article
        </Button>
      </Paper>
      <br></br>
      <Typography variant="h6">{`Your current articles:`}</Typography>
      <Container sx={{ padding: "20px 0" }}>
        <Grid container spacing={4} data-cy="article-collection">
          {userArticles}
        </Grid>
        {articles.length === 0 && message && (
          <Alert
            data-cy="flesh-message"
            severity="info"
            sx={{ margin: "20px 0" }}
          >
            {message}
          </Alert>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
