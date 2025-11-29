// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";

// ReactDOM.hydrateRoot(
//   document.getElementById("root"),
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeadProvider } from "react-head";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HeadProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HeadProvider>
  </React.StrictMode>
);


