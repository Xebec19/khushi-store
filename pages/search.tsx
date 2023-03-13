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
} from "react-instantsearch-hooks-web";
import { getServerState } from "react-instantsearch-hooks-server";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import singletonRouter from "next/router";
import { createInstantSearchRouterNext } from "react-instantsearch-hooks-router-nextjs";
import NavigationUI from "@/components/UI/NavigationUI";
import { Grid } from "@mui/material";
import HeaderUI from "@/components/UI/HeaderUI";
import Layout from "@/components/UI/LayoutUI";
import LayoutUI from "@/components/UI/LayoutUI";
import Footer from "@/components/UI/Footer";

const searchClient = algoliasearch(
  "QXZP1BIGWI",
  "eee6e7a810e9bfc9c8c8e9643820170f"
);

function Hit({ hit }) {
  return (
    <article>
      <img src={hit.image} alt={hit.product_name} />
      <p>{hit.category_name}</p>
      <p>{hit.product_name}</p>
      <h1>
        <Highlight attribute="name" hit={hit} />
      </h1>
      <p>${hit.price}</p>
    </article>
  );
}

const transformItems = (items: any[]) => {
  return items.map((item) => ({
    ...item,
    label: item.label.toUpperCase(),
  }));
};

export default function SearchPage({ serverState, serverUrl }) {
  return (
    <>
      <InstantSearchSSRProvider {...serverState}>
        <InstantSearch
          searchClient={searchClient}
          indexName="bazaar_index"
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
              <Grid item md={12}>
                <SearchBox />
              </Grid>
              <Grid item md={4} xs={12}>
                <DynamicWidgets>
                  <HierarchicalMenu
                    attributes={["hierarchical.lvl0", "hierarchical.lvl1"]}
                  />
                  <RefinementList
                    attribute="category_name"
                    searchable={true}
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
