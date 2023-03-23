import React from "react";
import { renderToString } from "react-dom/server";
import algoliasearch from "algoliasearch/lite";
import {
  Highlight,
  Hits,
  InstantSearch,
  InstantSearchSSRProvider,
  RefinementList,
  HierarchicalMenu,
  useNumericMenu,
  DynamicWidgets,
  useRefinementList,
  SearchBox,
  useSearchBox,
  Configure,
} from "react-instantsearch-hooks-web";

import SearchIcon from "@mui/icons-material/Search";
import { getServerState } from "react-instantsearch-hooks-server";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import singletonRouter from "next/router";
import { createInstantSearchRouterNext } from "react-instantsearch-hooks-router-nextjs";
import NavigationUI from "@/components/UI/NavigationUI";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeaderUI from "@/components/UI/HeaderUI";
import Layout from "@/components/UI/LayoutUI";
import LayoutUI from "@/components/UI/LayoutUI";
import Footer from "@/components/UI/Footer";
import ButtonUI from "@/components/UI/ButtonUI";
import { AccountCircle, Category } from "@mui/icons-material";

const searchClient = algoliasearch(
  "QXZP1BIGWI",
  "eee6e7a810e9bfc9c8c8e9643820170f"
);

const PriceFilter = () => {
  const { hasNoResults, items, refine } = useNumericMenu({
    attribute: "price",
    items: [
      { label: "All" },
      { label: "Less than 200$", end: 200 },
      { label: "Between 200$ - 400$", start: 200, end: 400 },
      { label: "More than 400$", start: 400 },
    ],
  });

  return (
    <Accordion sx={{ ml: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panella-content"
        id="panella-header"
      >
        <Typography>Price Filter</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map((rec, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Checkbox
                  edge="start"
                  checked={rec.isRefined}
                  disableRipple
                  inputProps={{ "aria-labelledby": rec.label }}
                  onClick={refine.bind(null, rec.value)}
                />
              }
              disablePadding
            >
              <ListItemText id={index} primary={rec.label} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

function Hit({ hit }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={hit.image}
          alt={hit.product_name}
        />
        <CardContent>
          <CardHeader title={hit.product_name} subheader={hit.category_name} />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body.secondary" color="primary">
          ${hit.price}
        </Typography>
      </CardActions>
    </Card>
  );
}

const CategoryFilter = () => {
  let { items, refine } = useRefinementList({
    attribute: "category_name",
  });

  return (
    <Accordion sx={{ ml: 1 }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panella-content"
        id="panella-header"
      >
        <Typography>Category</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map((item, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <Checkbox
                  edge="start"
                  checked={item.isRefined}
                  disableRipple
                  inputProps={{ "aria-labelledby": item.label }}
                  onClick={refine.bind(null, item.value)}
                />
              }
              disablePadding
            >
              <ListItemText id={index} primary={item.label} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default function SearchPage({ serverState, serverUrl }) {
  let [searchQuery, setSearchQuery] = React.useState(null);
  let searchRef = React.useRef("");

  const handleSearch = () => {
    setSearchQuery(searchRef.current.value);
  };

  return (
    <>
      <InstantSearchSSRProvider {...serverState}>
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME + ""}
          routing={{
            router: createInstantSearchRouterNext({
              singletonRouter,
              serverUrl,
            }),
          }}
        >
          <HeaderUI />
          <LayoutUI>
            <Grid container spacing={2}>
              <Configure query={searchRef.current.value} />
              <Grid
                item
                md={12}
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <TextField
                  id="search"
                  label="Search"
                  variant="standard"
                  inputRef={searchRef}
                  sx={{ ml: 1 }}
                  onChange={handleSearch}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <HierarchicalMenu
                  attributes={["hierarchical.lvl0", "hierarchical.lvl1"]}
                />
                <CategoryFilter />
                <PriceFilter />
              </Grid>
              <Grid item md={8} xs={12}>
                <Hits hitComponent={Hit} />
              </Grid>
            </Grid>
          </LayoutUI>
        </InstantSearch>
      </InstantSearchSSRProvider>
      <NavigationUI />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const protocol = req.headers.referer?.split("://")[0] || "https";
  const serverUrl = `${protocol}://${req.headers.host}${req.url}`;
  const serverState = await getServerState(
    <SearchPage serverUrl={serverUrl} />,
    { renderToString }
  );

  return {
    props: {
      serverState,
      serverUrl,
    },
  };
}
