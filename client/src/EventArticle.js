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

import SendIcon from "@mui/icons-material/Send";
import CommentCard from "./CommentCard";
import EventCard from "./EventCard";

export default function EventArticle({ eventPost, loading, currentUser }) {
  const params = useParams();
  const [article, setArticle] = useState([]);
  const [value, setValue] = useState("");
  const [loadingArticle, setLoadingArticle] = useState(true);
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(0);
  const [comments, setComments] = useState({
    comment: "",
    user_id: currentUser.id,
    event_post_id: params.id,
  });

  // console.log(params.id);

  useEffect(() => {
    fetch(`/event_posts/${params.id}`)
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
  const styles = {
    paperContainer: {
      height: "40vh",
      width: "100%",
      backgroundImage: `url(${article && article.image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "0% 20%",
    },
  };

  // Comments Submissions
  const handleComments = (e) => {
    setComments({ ...comments, [e.target.name]: e.target.value });
  };

  const handleCommentsSubmission = (e) => {
    e.preventDefault();
    fetch(`/event_comments`, {
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
            event_post_id: params.id,
          });
        });
      } else {
        res.json().then((errors) => {
          console.error(errors);
        });
      }
    });
  };
  return (
    <Box>
      {/* add to calendar */}

      {article && (
        <Box>
          <section style={styles.paperContainer}></section>
          <Container>
            <Typography variant="h4" align="left" mt={2} color={"#5F5F5F"}>
              {article.title}
            </Typography>

            <Typography
              color={"#9B9B9B"}
              variant="subtitle2"
              align="left"
              mt={2}
            >
              {`${article.date_of_event} | ${article.time} | ${article.event_location}`}
            </Typography>
            <Typography variant="body1" align="left" color={"#9B9B9B"} mt={2}>
              {article.content}
            </Typography>

            {article && (
              <Box mt={3} display={"flex"} alignItems={"flex-start"}>
                <Button
                  href={`https://outlook.live.com/owa/?path=/calendar/view/Month&rru=addevent&startdt=${article.date_of_event}${article.time}&enddt=20200214T000000Z&subject=${article.title}+Event&location=${article.event_location}&body=${article.content}`}
                  target={"_blank"}
                >
                  Add Event to Outlook
                </Button>
                <Button>
                  <img src={clap} alt="clap-icon" style={{ width: 20 }} />
                  {article.claps}
                </Button>
                <Button href="#e_comments">
                  <img
                    src={comment}
                    alt="clap-icon"
                    style={{ width: 20, marginRight: 10 }}
                  />
                  {article.event_comments.length === 1
                    ? ` ${article.event_comments.length} comment `
                    : ` ${article.event_comments.length} comments `}
                </Button>
              </Box>
            )}
          </Container>
        </Box>
      )}
      <Container>
        <main>
          <Grid container>
            <Grid item xs={5}>
              <Typography align="left" variant="h3" mt={4} color="secondary">
                UPCOMING EVENTS
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={3} mt={4.5}></Grid>
          </Grid>
          <Divider />
        </main>
      </Container>
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
          {eventPost &&
            eventPost
              .slice(0, 4)
              .map((post) => (
                <EventCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  claps={post.claps}
                  image={post.image}
                  date={post.date_of_event}
                  location={post.event_location}
                  time={post.time}
                  loading={loading}
                />
              ))}
          <Grid container rowSpacing={4} my={4}>
            <Grid item xs={6}>
              <Typography variant="h5" align="left" color={"primary"}>
                Comments
              </Typography>

              {!loading && (
                <Box id="e_comments">
                  {article.event_comments.map((each) => (
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
