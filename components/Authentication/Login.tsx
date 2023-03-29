import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import classes from "../../styles/authentication.module.css";
import React from "react";
import { red } from "@mui/material/colors";
import ButtonUI from "../UI/ButtonUI";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useFormik } from "formik";
import * as yup from "yup";
import { login } from "@/store/auth";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should of minimum 8 characters long")
    .required("Password is required"),
});

/**
 * @description it renders a card which allows user to sign in using an account
 * @param {Object} setShowLogin func to update whether to show login or register card
 */
const Login = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  return (
    <div>
      <Typography
        variant="h6"
        color="text.secondary"
        component="div"
        className={classes.title}
      >
        Khushi Store
      </Typography>
      <Card className={classes.form}>
        <form onSubmit={formik.handleSubmit}>
          <CardHeader title="Login" subheader="Enter your credentials" />
          <CardContent>
            <TextField
              id="email"
              fullWidth
              name="email"
              label="Email"
              variant="outlined"
              className={classes.formInput}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              id="password"
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              className={classes.formInput}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <ButtonUI variant="contained" fullWidth type="submit">
              Login
            </ButtonUI>
          </CardContent>
          <CardActions className={classes.actions}>
            <ButtonUI size="small">Forgot Password</ButtonUI>

            <ButtonUI
              onClick={setShowLogin.bind(null, false)}
              variant="contained"
              size="small"
            >
              Register
            </ButtonUI>
          </CardActions>
        </form>
      </Card>
      <div className={classes.socialLoginWrapper}>
        <Typography color="text.secondary" component="div">
          or you can login with
        </Typography>
        <div className={classes.socialIconList}>
          <GoogleIcon className={classes.socialIcon} />
          <FacebookIcon className={classes.socialIcon} />
          <TwitterIcon className={classes.socialIcon} />
        </div>
        <Typography color="text.secondary" component="div">
          Privacy policy & Terms and conditions
        </Typography>
      </div>
    </div>
  );
};

export default Login;
