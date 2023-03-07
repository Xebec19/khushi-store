import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import classes from "../styles/cart.module.css";

const Cart = () => {
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
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title="Cart" subheader="Your cart items" />
        <CardContent>
          <Stack spacing={1}>
            <h1>Product 1</h1>
            <h1>Product 1</h1>
            <h1>Product 1</h1>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cart;
