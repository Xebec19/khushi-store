import React from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";
import useHttp from "@/hooks/use-http";
import LoaderUI from "../UI/LoaderUI";
import classes from "../../styles/product.module.css";

const CategoryCard = ({ id, title, url }) => {
  return (
    <Card className={classes.categoryCard} variant="outlined">
      <Link href={`/search?categoryId=${id}`}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={url} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
              {title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
};

const CategoryList = ({ data }) => {
  if (!data || !data.length) {
    return (
      <Typography variant="subtitle2" color="body.secondary" component="div">
        No Category Found!
      </Typography>
    );
  }

  return (
    <div className={classes.categoryList}>
      {data.map((item: { id: any; title: any; url: any }) => (
        <CategoryCard
          key={crypto.randomUUID()}
          id={item.id}
          title={item.title}
          url={item.url}
        />
      ))}
    </div>
  );
};

const Categories = () => {
  let instance = useHttp();

  let [categories, setCategories] = React.useState([]);
  let [loading, setLoading] = React.useState(false);

  const fetchCategories = React.useCallback(async () => {
    setLoading(true);
    try {
      let { data: response } = await instance.get("product/v1/category-list");
      if (response.status) {
        let newCategories = response.payload.map(
          (rec: {
            category_id: any;
            category_name: any;
            image_url: { String: any };
          }) => ({
            id: rec?.category_id,
            title: rec?.category_name,
            url: rec?.image_url.String,
          })
        );
        setCategories(newCategories);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={classes.categoryContainer}>
      <Typography
        variant="h6"
        color="body.secondary"
        component="div"
        gutterBottom
      >
        Categories
      </Typography>
      {loading ? <LoaderUI /> : <CategoryList data={categories} />}
    </div>
  );
};

export default Categories;
