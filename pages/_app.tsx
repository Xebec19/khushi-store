import type { AppProps } from "next/app";
import "../styles/global.css";
import store from "../store/index";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
