import { Bars } from "react-loader-spinner";

const Loader = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Bars heigth="50" width="50" color="#63cf50" ariaLabel="loading-indicator" />
  </div>
);
export default Loader;
