import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
  refresh,
  setRefresh,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function EmployeeDirCard({
  firstName,
  lastName,
  position,
  profileImage,
  division,
  email,
  phone,
  hireDate,
  admin,
  currentUser,
  setMessagesUsername,
  id,
  refresh,
  setRefresh,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState("");
  const [imageData, setImageData] = useState("");
  const [userProfileForm, setUserProfileForm] = useState({
    first_name: firstName,
    last_name: lastName,
    email: email,
    phone: phone,
  });

  const handleUserPhotoSubmit = (e) => {
    //
    const formData = new FormData();

    formData.append("image", imageData);
    //
    fetch(`/users/${id}`, {
      method: "PATCH",
      body: formData,
    });
    //
    setImageData("");
  };

  const handleUserProfile = (e) => {
    setUserProfileForm({ ...userProfileForm, [e.target.name]: e.target.value });
  };

  const handleUserProfileSubmit = (e) => {
    e.preventDefault();
    fetch(`/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfileForm),
    }).then((res) => {
      if (res.ok) {
        res.json().then((user) => {
          setRefresh(refresh + 1);
          // setSubmissionMessage(true);
          // setTimeout(() => setSubmissionMessage(false), 3000);
          handleClose();
          if (imageData !== "") {
            handleUserPhotoSubmit();
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
    <Card
      sx={{ display: "flex", width: "460px", margin: 2 }}
      className="fade-in"
    >
      <CardMedia
        component="img"
        sx={{
          width: "150px",
          height: "150px",
          borderRadius: "256px",
          padding: "15px",
          my: "auto",
        }}
        image={profileImage}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography component="div" variant="body1" color={"primary"}>
            {`${firstName} ${lastName} `}
            {admin ? (
              <span style={{ color: "black", fontWeight: "bold" }}>
                (admin)
              </span>
            ) : null}
          </Typography>
          <Typography
            component="div"
            variant="subtitle2"
            color={"primary.light"}
          >
            {`${position}`}
          </Typography>
          <hr style={{ width: "100%" }} />
          <Typography variant="caption" color={"secondary.dark"}>
            <b>Division: </b>
            {division}
          </Typography>
          <br />
          <Typography variant="caption" color={"secondary.dark"}>
            <b>Email: </b>
            {<a href={`mailto:${email}`}>{email}</a>}
          </Typography>
          <br />
          <Typography variant="caption" color={"secondary.dark"}>
            <b>Phone: </b>
            {phone}
          </Typography>
          <br />
          <Typography variant="caption" color={"secondary.dark"}>
            <b>Hire Date: </b>
            {hireDate}
          </Typography>

          <CardActions>
            <Link
              to={`/profile/${currentUser.id}/messages`}
              className="react-link"
            >
              <Box display="flex" flexDirection="row">
                <i
                  className="fa fa-comment"
                  style={{
                    fontSize: "25px",
                    marginRight: "5px",
                    color: "#00539A",
                  }}
                  aria-hidden="true"
                ></i>
                <Typography
                  color={"primary"}
                  variant={"body1"}
                  fontWeight={"bold"}
                >
                  Message
                </Typography>
              </Box>
            </Link>

            {currentUser.owner ? (
              <Box
                display="flex"
                flexDirection="row"
                ml={2}
                onClick={handleOpen}
              >
                <Button variant="contained" color="white">
                  <Typography color={"primary"} variant={"body1"}>
                    Edit
                  </Typography>
                </Button>
              </Box>
            ) : null}
          </CardActions>
        </CardContent>
      </Box>
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
            <CardContent
              sx={{ backgroundColor: "#fff" }}
              component="form"
              onSubmit={handleUserProfileSubmit}
            >
              <Grid
                container
                flexDirection={"row"}
                justifyContent={"left"}
                alignContent={"center"}
                spacing={5}
              >
                <Grid item xs>
                  <TextField
                    id="update-first-name"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={
                      userProfileForm != null ? userProfileForm.first_name : ""
                    }
                    name="first_name"
                    onChange={handleUserProfile}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="update-last-name"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={userProfileForm.last_name}
                    name="last_name"
                    onChange={handleUserProfile}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                flexDirection={"row"}
                justifyContent={"left"}
                alignContent={"center"}
                spacing={5}
                mt={1}
              >
                <Grid item xs>
                  <TextField
                    id="update-email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={userProfileForm.email}
                    name="email"
                    onChange={handleUserProfile}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="update-phone"
                    label="Phone"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    value={userProfileForm.phone}
                    name="phone"
                    onChange={handleUserProfile}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                flexDirection={"row"}
                justifyContent={"left"}
                alignContent={"center"}
                spacing={5}
                mt={1}
              >
                <Grid item xs>
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
                      {imageData === ""
                        ? "Change profile image"
                        : imageData.name}
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

                <Button onClick={handleUserProfileSubmit}>Submit</Button>
              </CardActions>
            </CardContent>
          </Card>
        </Container>
      </Modal>
    </Card>
  );
}
