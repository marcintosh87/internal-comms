import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";
import hero from "./images/newsfeed-hero.png";
import video from "./images/ceo-message-placeholder.png";
import { Box } from "@mui/system";
import NewsCard from "./NewsCard";
// styles for background
const styles = {
  paperContainer: {
    width: "100%",
    height: "35vh",

    backgroundImage: `url(${hero})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

export default function Newsfeed({
  newsPost,
  refresh,
  setRefresh,
  loading,
  newsPostDateAsc,
}) {
  const [filter, setFilter] = useState("Sort by");
  const [search, setSearch] = useState("");
  const [postsNum, setPostsNum] = useState(4);
  const [dataShowed, setDataShowed] = useState(newsPost);

  const handleChange = (event) => {
    setDataShowed(event.target.value);
    setRefresh(refresh + 1);
  };

  const handleSearch = (event) => {
    const searchWord = event.target.value;
    const newSearch = newsPost.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setSearch("");
    } else {
      setSearch(newSearch);
    }
  };

  return (
    <>
      <section style={styles.paperContainer}>
        <Container>
          <Grid container wrap="nowrap">
            <Grid item xs={5} sx={{ mx: "auto", mt: 5 }}>
              <Typography variant="h5" color={"#fff"} align="left">
                A MESSAGE FROM OUR CEO
              </Typography>
              <img
                src={video}
                alt=""
                style={{ maxWidth: "100%", margin: "15px 0px" }}
              />
              <Typography sx={{ fontSize: "1.2vh", fontFamily: "Open Sans" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>

            <Grid item xs={2}></Grid>
            <Grid
              item
              xs={5}
              sx={{ mt: 4 }}
              justifyContent="center"
              className="fade-in"
            >
              <Typography
                variant="body1"
                color={"white"}
                align="center"
                sx={{ fontSize: "1.4vw" }}
              >
                We are an outstanding collective of caregivers representing
                various cultures, beliefs, backgrounds, and life experiences.
              </Typography>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  size="small"
                  variant="contained"
                  color={"white"}
                  sx={{ mt: 1, borderRadius: 16, boxShadow: 0 }}
                >
                  <span style={{ color: "#999999" }}>Learn More</span>
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </section>
      <Container component={"main"}>
        <Grid container>
          <Grid item xs={5}>
            <Typography align="left" variant="h3" mt={4} color="secondary">
              NEWSFEED
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2} mt={5.5} px={1}>
            <FormControl fullWidth>
              <InputLabel id="news-feed-select" sx={{ color: "#00539A" }}>
                Date (descending)
              </InputLabel>
              <Select
                labelId="news-feed-select"
                id="news-feed-select"
                placeholder="Date (descending)"
                value={filter}
                label="Date (descending)"
                sx={{ height: "40px" }}
                onChange={handleChange}
              >
                <MenuItem value={"Sort by"}></MenuItem>
                <MenuItem value={newsPost}>Date (descending)</MenuItem>
                <MenuItem value={newsPostDateAsc}>Date (ascending)</MenuItem>

                <MenuItem value={"Division"}>Department</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} mt={4.5}>
            <Box
              component="form"
              sx={{
                m: 1,
                width: "25ch",
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Search Title"
                variant="outlined"
                size="small"
                onChange={handleSearch}
                InputLabelProps={{
                  style: { color: "#00539A" },
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Divider />
      </Container>
      <Container component={"aside"}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "flex-start",
            justifyContent: "center",
            pb: 7,
          }}
        >
          {search.length === 0 && !loading
            ? dataShowed
                .slice(0, postsNum)
                .map((post) => (
                  <NewsCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    claps={post.claps}
                    image={post.image}
                    date={post.date}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    loading={loading}
                  />
                ))
            : search
                .slice(0, postsNum)
                .map((post) => (
                  <NewsCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    content={post.content}
                    claps={post.claps}
                    image={post.image}
                    date={post.date}
                    setRefresh={setRefresh}
                    refresh={refresh}
                    loading={loading}
                  />
                ))}
        </Box>
      </Container>
      <Box mb={10} sx={{ textAlign: "center" }}>
        <Button
          color="secondary"
          onClick={() => {
            setPostsNum(postsNum + 4);
          }}
        >
          {"Load More Posts"}
        </Button>

        {postsNum >= 5 ? (
          <Button
            color="secondary"
            onClick={() => {
              if (postsNum > 4) {
                setPostsNum(postsNum - 4);
              } else {
                setPostsNum(4);
              }
            }}
          >
            Show Less
          </Button>
        ) : null}
      </Box>
    </>
  );
}
