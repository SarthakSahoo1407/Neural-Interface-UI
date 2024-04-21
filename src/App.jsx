// // App.jsx

// import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// import UploadPage from "./UploadPage";
// import SecondPage from "./App2";
// import { ReactFlowProvider } from "reactflow";

// function App() {
//   return (
//     <Router>
//         <Route path="/" exact>
//           <UploadPage />
//         </Route>
//         <Route path="/app">
//           <React.StrictMode>
//             <div style={{ width: "100vw", height: "100vh" }}>
//               <ReactFlowProvider>
//                 <SecondPage />
//               </ReactFlowProvider>
//             </div>
//           </React.StrictMode>
//         </Route>
//     </Router>
//   );
// }

// export default App;

// App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes
import UploadPage from "./UploadPage";
import SecondPage from "./App2";
import { ReactFlowProvider } from "reactflow";
import MyPage from "./HyperParameters";

function App() {
  return (
    <Router  >
      <Routes>
        {" "}
        <Route path="/" element={<UploadPage />} />{" "}
        <Route path="/hyperparameter" element={<MyPage />} />{" "}
        <Route
          path="/app"
          element={
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
