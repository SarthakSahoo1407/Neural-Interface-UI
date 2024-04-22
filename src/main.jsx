import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";

// 👇 Don't forget to import the styles!
import "reactflow/dist/style.css";
import "./index.css";

const root = document.querySelector("#root");

ReactDOM.createRoot(root).render(

   <App/>
);
