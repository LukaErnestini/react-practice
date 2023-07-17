import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import StarRating from "./StarRating.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} defaultRating={3} />
    <StarRating maxRating={10} size={20} />
    <StarRating messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />
  </React.StrictMode>
);
