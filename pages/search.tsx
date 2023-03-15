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
  DynamicWidgets,
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
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import HeaderUI from "@/components/UI/HeaderUI";
import Layout from "@/components/UI/LayoutUI";
import LayoutUI from "@/components/UI/LayoutUI";
import Footer from "@/components/UI/Footer";
import ButtonUI from "@/components/UI/ButtonUI";

const searchClient = algoliasearch(
  "QXZP1BIGWI",
  "eee6e7a810e9bfc9c8c8e9643820170f"
);

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

const transformItems = (items: any[]) => {
  return items.map((item) => ({
    ...item,
    count: ` ${item.count} item(s)`,
    label: " " + item.label.toUpperCase(),
  }));
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
              <Grid item md={8} xs={8}>
                {/* <SearchBox /> */}
                <TextField sx={{ ml: 1 }} inputRef={searchRef} fullWidth />
              </Grid>
              <Grid item md={4} xs={4}>
                <IconButton onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              </Grid>
              <Grid item md={4} xs={12}>
                <DynamicWidgets>
                  <HierarchicalMenu
                    attributes={["hierarchical.lvl0", "hierarchical.lvl1"]}
                  />
                  <RefinementList
                    attribute="category_name"
                    searchablePlaceholder="Search categories"
                    transformItems={transformItems}
                  />
                </DynamicWidgets>
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
