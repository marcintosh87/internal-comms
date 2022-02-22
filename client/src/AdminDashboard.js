import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Container,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link, Route, Routes } from "react-router-dom";
import AdminNewsFeed from "./AdminNewsFeed";
import AdminEventsFeed from "./AdminEventsFeed";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    //   legend: {
    //     position: 'top' as const,
    //   },
    title: {
      display: true,
      text: "Employee Engagement 2021",
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Clicks",
      data: labels.map(() => faker.datatype.number({ min: 0 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Claps",
      data: labels.map(() => faker.datatype.number({ min: 0 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export default function AdminDashboard({
  currentUser,
  setRefresh,
  refresh,
  setCurrentUser,
  newsPost,
  eventPost,
}) {
  const [postType, setPostType] = useState("news_posts");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageData, setImageData] = useState("");
  const [errors, setErrors] = useState("");
  const [postNewsData, setNewsPostData] = useState({
    title: "",
    content: "",
    claps: 0,
    clicks: 0,
    target: "",
    topic: "",

    user_id: currentUser.id,
  });

  const [postEventData, setEventPostData] = useState({
    title: "",
    content: "",
    event_date: "",
    event_time: "",
    all_day: "",
    event_location: "",
    claps: 0,
    clicks: 0,
    target: "",
    topic: "",

    user_id: currentUser.id,
  });
  const handleNewsPostData = (e) => {
    setNewsPostData({ ...postNewsData, [e.target.name]: e.target.value });
  };

  const handleEventPostData = (e) => {
    setEventPostData({ ...postEventData, [e.target.name]: e.target.value });
  };

  const handlePostSubmit = (e) => {
    // e.preventDefault();

    const formData = new FormData();

    formData.append("image", imageData);

    fetch(`/${postType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        postType === "news_posts" ? postNewsData : postEventData
      ),
      formData,
    }).then((res) => {
      if (res.ok) {
        res.json().then((post) => {
          fetch(`/${postType}/${post.id}`, {
            method: "PATCH",
            body: formData,
          });
          setRefresh(refresh + 1);
          setImageData("");

          handleClose();
        });
      } else {
        res.json().then((errors) => {
          setErrors("What you entered is invalid");
          console.error(errors);
        });
      }
    });
  };

  const Input = styled("input")({
    display: "none",
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Container>
      <Typography color={"secondary"} variant={"h4"}>
        Admin Dashboard
      </Typography>
      <Line options={options} data={data} />
      <Typography color={"secondary"} variant={"h4"} mt={3}>
        Posts
      </Typography>
      <Stack mt={3}>
        <Box
          component={"nav"}
          display={"flex"}
          flexDirection={"row"}
          alignContent={"center"}
        >
          <Link
            to={`/profile/${currentUser.id}/admin-dashboard`}
            className="react-link"
          >
            <Button>Newsfeed</Button>
          </Link>
          <Link
            to={`/profile/${currentUser.id}/admin-dashboard/a-events`}
            className="react-link"
          >
            <Button>Events</Button>{" "}
          </Link>

          <Button onClick={handleOpen}>Make a Post</Button>
        </Box>
        <Stack>
          <Routes>
            {newsPost && (
              <Route
                path="/"
                element={
                  <AdminNewsFeed
                    newsPost={newsPost}
                    setRefresh={setRefresh}
                    refresh={refresh}
                  />
                }
              />
            )}
            {eventPost && (
              <Route
                path="a-events"
                element={
                  <AdminEventsFeed
                    eventPost={eventPost}
                    setRefresh={setRefresh}
                    refresh={refresh}
                  />
                }
              />
            )}
          </Routes>
        </Stack>
      </Stack>

      {/* MODAL  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Card sx={{ my: 5 }}>
            <CardHeader title="Post" sx={{ backgroundColor: "#F8F8FC" }} />
            <CardContent sx={{ backgroundColor: "#fff" }} component="form">
              <Grid
                container
                flexDirection={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                spacing={2}
              >
                <Grid item>
                  <Box
                    display={"flex"}
                    flexDirection={"row"}
                    alignItems={"center"}
                  >
                    <Select
                      labelId="select-content-type"
                      id="demo-simple-select"
                      value={postType}
                      label="Post Type"
                      sx={{ mr: 2 }}
                      onChange={(e) => setPostType(e.target.value)}
                    >
                      <MenuItem value={"news_posts"}>News Post</MenuItem>
                      <MenuItem value={"event_posts"}>Event Post</MenuItem>
                    </Select>
                    <Typography color={"primary"} mr={1}>
                      Target Audience
                    </Typography>
                    <Select
                      labelId="select-department"
                      id="select-department"
                      name="target"
                      value={
                        postType === "news_posts"
                          ? postNewsData.target
                          : postEventData.target
                      }
                      label="Department Target"
                      sx={{ mr: 2 }}
                      onChange={
                        postType === "news_posts"
                          ? handleNewsPostData
                          : handleEventPostData
                      }
                    >
                      <MenuItem value={1}>Human Resources</MenuItem>
                      <MenuItem value={2}>Sales</MenuItem>
                      <MenuItem value={3}>Warehouse</MenuItem>
                      <MenuItem value={4}>Finance</MenuItem>
                      <MenuItem value={5}>Legal</MenuItem>
                      <MenuItem value={6}>Marketing</MenuItem>
                      <MenuItem value={7}>Business Development</MenuItem>
                    </Select>
                    <TextField
                      id="update-topic"
                      label="topic"
                      variant="outlined"
                      InputLabelProps={{
                        style: { color: "black" },
                      }}
                      value={
                        postType === "news_posts"
                          ? postNewsData.topic
                          : postEventData.topic
                      }
                      name="topic"
                      onChange={
                        postType === "news_posts"
                          ? handleNewsPostData
                          : handleEventPostData
                      }
                    />
                  </Box>
                </Grid>
                {postType === "event_posts" ? (
                  <Grid item>
                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <input
                        type="date"
                        name="event_date"
                        id=""
                        value={postEventData.event_date}
                        onChange={handleEventPostData}
                        style={{ marginRight: 2 }}
                      />
                      <Checkbox
                        name="all_day"
                        value={postEventData.all_day}
                        color={"primary"}
                        iconStyle={{ fill: "red" }}
                        defaultChecked
                        {...label}
                      >
                        All Day
                      </Checkbox>
                      <input
                        type="time"
                        name="event_time"
                        id=""
                        value={postEventData.event_time}
                        onChange={handleEventPostData}
                        style={{ marginRight: 2 }}
                      />
                      <TextField
                        id="update-event_location"
                        label="event_location"
                        variant="outlined"
                        InputLabelProps={{
                          style: { color: "black" },
                        }}
                        value={postEventData.event_location}
                        name="event_location"
                        onChange={handleEventPostData}
                      />
                    </Box>
                  </Grid>
                ) : null}
                <Grid item sx={{ width: "80%" }}>
                  <TextField
                    id="update-title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={
                      postType === "news_posts"
                        ? postNewsData.title
                        : postEventData.title
                    }
                    name="title"
                    onChange={
                      postType === "news_posts"
                        ? handleNewsPostData
                        : handleEventPostData
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    minRows={10}
                    id="update-content"
                    label="Content"
                    variant="outlined"
                    multiline
                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={
                      postType === "news_posts"
                        ? postNewsData.content
                        : postEventData.content
                    }
                    name="content"
                    onChange={
                      postType === "news_posts"
                        ? handleNewsPostData
                        : handleEventPostData
                    }
                  />
                </Grid>

                <Grid item>
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      encType="multipart/form-data"
                      onChange={(e) => setImageData(e.target.files[0])}
                      sx={{ width: "50%" }}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                    <Typography variant="span" sx={{ fontSize: "1vh" }}>
                      {imageData === "" ? "Add Image" : imageData.name}
                    </Typography>
                  </label>
                </Grid>
              </Grid>

              <CardActions>
                <Button
                  onClick={() => {
                    setImageData("");
                    handleClose();
                  }}
                >
                  Cancel
                </Button>

                <Button onClick={handlePostSubmit}>Submit</Button>
              </CardActions>
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </Container>
  );
}
