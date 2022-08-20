import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
// import axios from "axios";
// import { login } from "../actions/userActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "../actions/userActions";

const theme = createTheme();

const Userprofile = ({ history }) => {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  // const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState();
  // const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      setfirst_name(userInfo.first_name);
      setlast_name(userInfo.last_name);
      setEmail(userInfo.email);
      setphoneNumber(userInfo.phoneNumber);
      setPic(userInfo.pic);
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    // setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(first_name, last_name, email, phoneNumber, password, pic);
    dispatch(
      updateProfile({
        first_name,
        last_name,
        email,
        phoneNumber,
        password,
        pic,
      })
    );
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          {/* <CssBaseline /> */}
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h4">
              Edit Profile
            </Typography>
            <Avatar
              src={userInfo?.pic}
              sx={{ m: 2, width: 120, height: 120, bgcolor: "secondary.main" }}
            ></Avatar>

            <Box
              component="form"
              onSubmit={submitHandler}
              //   noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="first_name"
                    fullWidth
                    id="first_name"
                    label="First Name"
                    value={first_name}
                    onChange={(e) => setfirst_name(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="last_name"
                    label="Last Name"
                    name="last_name"
                    value={last_name}
                    autoComplete="family-name"
                    onChange={(e) => setlast_name(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    //   id="email"
                    label="Phone Number"
                    type="number"
                    // inputProps={{ min: "0", max: "10", step: "1" }}
                    //   name="email"
                    //   autoComplete="email"
                    value={phoneNumber}
                    onChange={(e) => setphoneNumber(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    //   name="password"
                    label="Password"
                    type="password"
                    //   id="password"
                    //   autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <TextField
                    fullWidth
                    //   name="password"
                    label="Confirm Password"
                    type="password"
                    //   id="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    //   name="file"
                    color="secondary"
                    //   label="Profile Picture"
                    //   focused
                    type="file"
                    // value={pic}
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Update
              </Button>
            </Box>
          </Box>
        </Container>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </ThemeProvider>
    </div>
  );
};

export default Userprofile;
