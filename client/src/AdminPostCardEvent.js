import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Input,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import clap from "./images/blue-clap.png";
import mouse from "./images/mouse-click.png";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function AdminPostCardEvent({
  title,
  date,
  clicks,
  image,
  claps,
  id,
  content,
  refresh,
  setRefresh,
}) {
  const [postData, setPostData] = useState({
    title: title,
    content: content,
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imageData, setImageData] = useState("");
  const [errors, setErrors] = useState("");

  const handlePostData = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handlePhotoSubmit = (e) => {
    //
    const formData = new FormData();

    formData.append("image", imageData);
    //
    fetch(`/event_posts/${id}`, {
      method: "PATCH",
      body: formData,
    });
    //
    setImageData("");
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    fetch(`/event_posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setRefresh(refresh + 1);
          // setSubmissionMessage(true);
          // setTimeout(() => setSubmissionMessage(false), 3000);
          handleClose();
          if (imageData !== "") {
            handlePhotoSubmit();
          }
        });
      } else {
        res.json().then((errors) => {
          setErrors("What you entered is invalid");
          console.error(errors);
        });
      }
    });
  };
  return (
    <Card sx={{ display: "flex", flexDirection: "row", mt: 1 }}>
      <CardMedia
        component={"img"}
        image={image}
        sx={{
          width: "150px",
          height: "100px",

          padding: "15px",
          my: "auto",
        }}
      />
      <Stack>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
        </CardContent>
        <CardActionArea>
          <CardActions
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            }}
          >
            <Typography variant="subtitle2" color={"secondary"}>
              {date}
            </Typography>
            <img
              src={clap}
              alt="clap-icon"
              style={{ width: 20, marginLeft: 10 }}
            />
            <Typography color={"secondary"}>{claps}</Typography>
            <img
              src={mouse}
              alt="mouse-icon"
              style={{ width: 14, marginLeft: 10 }}
            />
            <Typography color={"secondary"}>{clicks}</Typography>
            <Link to={`/event-article/${id}`} className="react-link">
              <Button>Read</Button>
            </Link>
            <Button onClick={handleOpen}>Edit</Button>
            <Button color="error">Delete</Button>
          </CardActions>
        </CardActionArea>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Card sx={{ my: 5 }}>
            <CardHeader
              title="Your Details"
              sx={{ backgroundColor: "#F8F8FC" }}
            />
            <CardContent sx={{ backgroundColor: "#fff" }} component="form">
              <Grid
                container
                flexDirection={"column"}
                justifyContent={"center"}
                alignContent={"center"}
                spacing={2}
              >
                <Grid item sx={{ width: "80%" }}>
                  <TextField
                    id="update-title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={postData != null ? postData.title : ""}
                    name="title"
                    onChange={handlePostData}
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
                    value={postData.content}
                    name="content"
                    onChange={handlePostData}
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
                      {imageData === "" ? "Change Image" : imageData.name}
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
    </Card>
  );
}
