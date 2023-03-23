import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import classes from "../../styles/authentication.module.css";
import React from "react";
import { red } from "@mui/material/colors";
import ButtonUI from "../UI/ButtonUI";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

/**
 * @description it renders a card which allows user to register an account
 * @param {Object} setShowLogin func to update whether to show login or register card
 */
const Register = ({ setShowLogin }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
          <CardHeader title="Register" subheader="Enter details" />
          <CardContent>
            <TextField
              id="firstName"
              fullWidth
              label="First Name"
              name="firstName"
              variant="outlined"
              className={classes.formInput}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              id="lastName"
              fullWidth
              name="lastName"
              label="Last Name"
              variant="outlined"
              className={classes.formInput}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
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
              name="password"
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
            <TextField
              id="confirm-password"
              name="confirmPassword"
              fullWidth
              label="Confirm Password"
              variant="outlined"
              type="password"
              className={classes.formInput}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <ButtonUI type="submit" variant="contained" fullWidth>
              Register
            </ButtonUI>
          </CardContent>
          <CardActions className={classes.actions}>
            <ButtonUI size="small">Forgot Password</ButtonUI>

            <ButtonUI
              onClick={setShowLogin.bind(null, true)}
              variant="contained"
              size="small"
            >
              Login
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
          Privacy policy
        </Typography>
      </div>
    </div>
  );
};

export default Register;
