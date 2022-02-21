import {
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import clap from "./images/blue-clap.png";
import comment from "./images/comment-icon.png";
import NewsCard from "./NewsCard";
import SendIcon from "@mui/icons-material/Send";
import CommentCard from "./CommentCard";

export default function NewsArticle({ newsPost, loading, currentUser }) {
  const params = useParams();
  const [article, setArticle] = useState([]);

  const [loadingArticle, setLoadingArticle] = useState(true);
  const [error, setError] = useState();
  const [comments, setComments] = useState({
    comment: "",
    user_id: currentUser.id,
    news_post_id: params.id,
  });
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch(`/news_posts/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setArticle(data);
        setLoadingArticle(false);
      })
      .catch((error) => setError(error));
  }, [refresh]);
  if (loadingArticle) {
    return (
      <Typography variant="caption" color={"primary"}>
        Loading...
      </Typography>
    );
  }

  if (loadingArticle) {
    return (
      <Typography variant="caption" color={"primary"}>
        Loading...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography variant="caption" color={"primary"}>
        There is an error
      </Typography>
    );
  }
  // Comments Submissions
  const handleComments = (e) => {
    setComments({ ...comments, [e.target.name]: e.target.value });
  };

  const handleCommentsSubmission = (e) => {
    e.preventDefault();
    fetch(`/news_comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comments),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setRefresh(refresh + 1);
          setComments({
            comment: "",
            user_id: currentUser.id,
            news_post_id: params.id,
          });
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  };
  const styles = {
    paperContainer: {
      height: "40vh",
      width: "100%",
      backgroundImage: `url(${article && article.image_post})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0% 20%"
    
    },
  };

  return (
    <Box>
      {article && (
        <Box>
          <section style={styles.paperContainer}></section>
       <Container>   <Typography variant="h4" align="left" mt={2} color={"#5F5F5F"}>
            {article.title}
          </Typography>
          <Typography color={"#9B9B9B"} variant="subtitle2" align="left" mt={2}>
            {article.date}
          </Typography>
          <Typography variant="body1" align="left" color={"#9B9B9B"} mt={2}>
            {article.content}
          </Typography>
          {article.news_comments && (
            <Box mt={3} display={"flex"} alignItems={"flex-start"}>
              <Button>
                <img src={clap} alt="clap-icon" style={{ width: 20 }} />
                {article.claps}
              </Button>
              <Button href="#news_comments">
                <img
                  src={comment}
                  alt="clap-icon"
                  style={{ width: 20, marginRight: 10 }}
                />
                {article.news_comments.length === 1
                  ? ` ${article.news_comments.length} comment `
                  : ` ${article.news_comments.length} comments `}
              </Button>
            </Box>
          )}</Container>
        </Box>
      )}
      <main>
  <Container>      <Grid container>
          <Grid item xs={5}>
            <Typography
              align="left"
              variant="h3"
           
              mt={4}
              color="secondary"
            >
              RECENT POSTS
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>

          <Grid item xs={3} mt={4.5}></Grid>
        </Grid>
        <Divider /></Container>
      </main>
     <Container>
     <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          pb: 7,
         
          
        }}
      >
        {!loading &&
          newsPost
            .slice(0, 4)
            .map((post) => (
              <NewsCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                claps={post.claps}
                image={post.image_post}
                date={post.date}
              />
            ))}
        <Grid container rowSpacing={4} my={4}>
          <Grid item xs={6}>
            <Typography variant="h5" align="left" color={"primary"}>
              Comments
            </Typography>

            {article.news_comments && (
              <Box id="news_comments">
                {article.news_comments.map((each) => (
                  <CommentCard
                    key={each.id}
                    comment={each.comment}
                    user={each.user_id}
                  />
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left" }}>
            <Typography variant="h5" align="left" color={"primary"}>
              Post a Comment
            </Typography>
            <Box component="form" onSubmit={handleCommentsSubmission}>
              <TextField
                id="outlined-multiline-static"
                label="Comment"
                multiline
                rows={4}
                onChange={handleComments}
                fullWidth
                sx={{ width: "80%", mt: 2 }}
                name="comment"
                value={comments.comment}
              />
              <Box mt={1}>
                <Button
                  type="submit"
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
     </Container>
    </Box>
  );
}
