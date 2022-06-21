import "../styles/globals.css";
import Router from "next/router";
import ProgressBar from "@badrap/bar-of-progress";
import Layout from "../app/layout/Layout";
import "mapbox-gl/dist/mapbox-gl.css";
import Provider from "../app/store/store";
import { Toaster } from "react-hot-toast";


const progress = new ProgressBar({
  size: 4,
  color: "#63cf50",
  className: "bar-of-progress",
  delay: 100,
});

function MyApp({ Component, pageProps }) {
  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routerChangeComplete", progress.finish);
  Router.events.on("routerChangeError", progress.finish);

  return (
    <Provider>
      <Toaster  position="bottom-center" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
