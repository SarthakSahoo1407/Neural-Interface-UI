

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import UploadPage from "./UploadPage";
// import { render, screen } from "@testing-library/react";

import SecondPage from "./App2";
// import { ReactFlowProvider } from "reactflow";
import MyPage from "./HyperParameters";

function App() {
  return (
    <Router  >
      <Routes>
        {" "}
        <Route path="/" element={<UploadPage />} />{" "}
        <Route path="/hyperparameter" element={<MyPage />} />{" "}
        <Route path="/app" element={
              <div className="h-screen w-screen">
                  <SecondPage />
              </div>
          }
        />
      </Routes>
    </Router>

  );
}

export default App;
