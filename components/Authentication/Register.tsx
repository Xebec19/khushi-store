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

const Register = () => {
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
        <CardHeader
          title="Register"
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          subheader="Create new account"
        />
        <CardContent>
          <TextField
            id="email"
            fullWidth
            label="Email"
            variant="outlined"
            className={classes.formInput}
          />
          <TextField
            id="password"
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            className={classes.formInput}
          />
          <TextField
            id="confirm-password"
            fullWidth
            label="Confirm Password"
            variant="outlined"
            type="password"
            className={classes.formInput}
          />
          <ButtonUI variant="contained" fullWidth>
            Register
          </ButtonUI>
        </CardContent>
        <CardActions className={classes.actions}>
          <ButtonUI size="small">Forgot Password</ButtonUI>

          <ButtonUI variant="contained" size="small">
            Login
          </ButtonUI>
        </CardActions>
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
