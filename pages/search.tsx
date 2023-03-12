import { renderToString } from "react-dom/server";
import algoliasearch from "algoliasearch/lite";
import {
  Highlight,
  Hits,
  InstantSearch,
  InstantSearchSSRProvider,
  SearchBox,
} from "react-instantsearch-hooks-web";
import { getServerState } from "react-instantsearch-hooks-server";
import { history } from "instantsearch.js/es/lib/routers/index.js";
import singletonRouter from "next/router";
import { createInstantSearchRouterNext } from "react-instantsearch-hooks-router-nextjs";
import NavigationUI from "@/components/UI/NavigationUI";

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
          <SearchBox />
          <Hits hitComponent={Hit} />
        </InstantSearch>
      </InstantSearchSSRProvider>
      <NavigationUI />
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
