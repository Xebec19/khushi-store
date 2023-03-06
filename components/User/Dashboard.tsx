import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import classes from "../../styles/user.module.css";
import ButtonUI from "../UI/ButtonUI";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import Footer from "../UI/Footer";

const Dashboard = () => {
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
      <Card sx={{ m: 1 }} variant="outlined">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="User profile pic">
              R
            </Avatar>
          }
          title="Rohan"
          subheader="rohan@gmail.com"
        />
        <CardContent>
          <ButtonUI variant="outlined" fullWidth>
            Edit Profile
          </ButtonUI>
          <List>
            <ListItem>
              <ListItemIcon>
                <FavoriteBorderOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Wishlist</ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <ShoppingCartOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Cart</ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <CardGiftcardOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Orders</ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <EmailOutlinedIcon />
              </ListItemIcon>
              <ListItemText>Contact Us</ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
      <Typography color="text.secondary" sx={{ m: 1 }}>
        Build by Rohan Thakur
      </Typography>
      <Typography color="text.secondary" sx={{ m: 1 }}></Typography>
    </div>
  );
};

export default Dashboard;
