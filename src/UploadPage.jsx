import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./App.css";
import "./index.css";
import Select from "react-select";

function UploadPage() {
  const ip = 'http://10.130.1.248:8000';
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([]);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      const lines = result.split("\n");
      if (lines.length > 0) {
        const headers = lines[0].split(",").map((header) => header.trim());
        setHeaders(headers);
        setSelectedFeatures([]); // No option selected initially
        setSelectedTargets([]); // No option selected initially
      }
    };
    reader.readAsText(uploadedFile);
  };

  const handleSelectAllFeatures = () => {
    setSelectedFeatures(headers);
  };

  const handleSelectAllTargets = () => {
    setSelectedTargets(headers);
  };

  const handleGoToSecondPage = () => {
    console.log();
    const data = {
      selectedFeatures,
      selectedTargets,
    };
    console.log(JSON.stringify(data));
    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("features", selectedFeatures.join(","));
    formData.append("targets", selectedTargets.join(","));
    formData.append("file", file);

    fetch("http://192.168.51.208:8000/api/file", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        // Redirect to the second page or handle response as needed
      })
      .catch((error) => {
        console.error("There was a problem with the API request:", error);
      });
  };

  // return (
  //   <div className="flex ">
  //     <div className="flex  items-center  justify-center h-screen w-screen">
  //       <div className="text-center">
  //         <h1 className="mb-8 text-4xl  font-bold  text-gray-800">
  //           Upload Page
  //         </h1>
  // <input
  //   type="file"
  //   accept=".csv"
  //   onChange={handleFileChange}
  //   className="block mb-4 w-full text-sm text-slate-500
  //   file:mr-4 file:py-2 file:px-4 file:rounded-md
  //   file:border-0 file:text-sm file:font-semibold
  //   file:bg-blue-50 file:text-blue-500
  //   hover:file:bg-pink-100"
  // />
  //         <div className="flex flex-col w-[30vw] justify-between">
  //           <div className="mr-8 flex flex-col justify-start items-start">
  //             <div className="flex flex-row w-full gap-3">
  // <h3 className="w-1/4 font-semibold  text-gray-900 dark:text-white">
  //   Features
  // </h3>
  // <div className="w-2/4  ">
  //   <Select
  //     isMulti
  //     options={headers.map((header) => ({
  //       value: header,
  //       label: header,
  //     }))}
  //     value={selectedFeatures.map((feature) => ({
  //       value: feature,
  //       label: feature,
  //     }))}
  //     onChange={(selectedOptions) => {
  //       setSelectedFeatures(
  //         selectedOptions.map((option) => option.value)
  //       );
  //     }}
  //     className="w-full "
  //   />
  //               </div>
  // <button
  //   onClick={handleSelectAllFeatures}
  //   className="w-1/4 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
  // >
  //   Select All
  // </button>
  //             </div>
  //             <div className="flex flex-row w-full justify-between">
  //               <h3 className="font-semibold w-1/4 text-gray-900 dark:text-white">
  //                 Targets
  //               </h3>
  //               <Select
  //                 isMulti
  //                 options={headers.map((header) => ({
  //                   value: header,
  //                   label: header,
  //                 }))}
  //                 value={selectedTargets.map((target) => ({
  //                   value: target,
  //                   label: target,
  //                 }))}
  //                 onChange={(selectedOptions) => {
  //                   setSelectedTargets(
  //                     selectedOptions.map((option) => option.value)
  //                   );
  //                 }}
  //                 className="w-3/4 px-"
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         <Link to="/app" className="text-white">
  //           <button
  //             className="px-6 py-3 text-lg font-semibold self-center ml-6 text-white bg-blue-500 rounded hover:bg-blue-600"
  //             onClick={handleGoToSecondPage}
  //           >
  //             HyperParameters
  //           </button>
  //         </Link>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    // <div className="flex flex-col p-8 justify-between bg-[#f0f9fb] rounded-lg">
    //   {/* main div */}
    //   <div className="font-semibold capitalize ">
    //     {/* title div */}
    //     <h1>Upload DataSet</h1>
    //   </div>
    //   <div>
    //     {/* file upload div */}
    //     <input
    //       type="file"
    //       accept=".csv"
    //       onChange={handleFileChange}
    //       className="block mb-4 w-full text-sm text-slate-500
    //         file:mr-4 file:py-2 file:px-4 file:rounded-md
    //         file:border-0 file:text-sm file:font-semibold
    //         file:bg-blue-50 file:text-blue-500
    //         hover:file:bg-pink-100"
    //     />{" "}
    //   </div>
    //   <div>
    //     {/* Data entry div */}
    //     <div>
    //       {/* feature selection div */}
    //       <div>
    //         <h3>Features</h3>
    //       </div>
    //       <div>
    //         {/* feature drop down div */}
    //         <Select
    //           isMulti
    //           options={headers.map((header) => ({
    //             value: header,
    //             label: header,
    //           }))}
    //           value={selectedFeatures.map((feature) => ({
    //             value: feature,
    //             label: feature,
    //           }))}
    //           onChange={(selectedOptions) => {
    //             setSelectedFeatures(
    //               selectedOptions.map((option) => option.value)
    //             );
    //           }}
    //           className="w-full "
    //         />
    //       </div>
    //       <div>
    //         {/* select all button div */}
    //         <button
    //           onClick={handleSelectAllFeatures}
    //           className="w-1/4 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
    //         >
    //           Select All
    //         </button>
    //       </div>
    //     </div>
    //     <div>
    //       {/* target selection div */}
    //       <div>
    //         <h3>Targets</h3>
    //       </div>
    //       <div>
    //         {/* target drop down div */}
    //         <Select
    //           isMulti
    //           options={headers.map((header) => ({
    //             value: header,
    //             label: header,
    //           }))}
    //           value={selectedTargets.map((target) => ({
    //             value: target,
    //             label: target,
    //           }))}
    //           onChange={(selectedOptions) => {
    //             setSelectedTargets(
    //               selectedOptions.map((option) => option.value)
    //             );
    //           }}
    //           className="w-full "
    //         />
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     {/* submit button div */}
    //     <Link to="/app" className="text-white">
    //       <button
    //         className="px-6 py-3 text-lg font-semibold self-center ml-6 text-white bg-blue-500 rounded hover:bg-blue-600"
    //         onClick={handleGoToSecondPage}
    //       >
    //         HyperParameters
    //       </button>
    //     </Link>
    //   </div>
    // </div>

    <div className="flex flex-col w-full items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Upload DataSet</h1>
        </div>

        <div className="mb-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full px-4 py-2 rounded-md border border-gray-300 text-sm font-semibold bg-blue-50 text-blue-500 hover:bg-blue-100 focus:outline-none focus:bg-blue-100"
          />
        </div>
        <div className="mb-6">
          <div className="mb-4 flex flex-row items-center justify-between gap-3">
            <h3 className="text-lg font-semibold mb-2">Features</h3>
            <div className="">
              <Select
                isMulti
                options={headers.map((header) => ({
                  value: header,
                  label: header,
                }))}
                value={selectedFeatures.map((feature) => ({
                  value: feature,
                  label: feature,
                }))}
                onChange={(selectedOptions) => {
                  setSelectedFeatures(
                    selectedOptions.map((option) => option.value)
                  );
                }}
                className="w-full "
              />
            </div>
              <button
                onClick={handleSelectAllFeatures}
                className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Select All
              </button>
          </div>
          <div className="flex flex-row gap-9">
            <h3 className="text-lg font-semibold mb-2">Targets</h3>
            <div className="flex items-center">
              <Select
                isMulti
                options={headers.map((header) => ({
                  value: header,
                  label: header,
                }))}
                value={selectedTargets.map((target) => ({
                  value: target,
                  label: target,
                }))}
                onChange={(selectedOptions) => {
                  setSelectedTargets(
                    selectedOptions.map((option) => option.value)
                  );
                }}
                className="w-full "
              />
            </div>
          </div>
        </div>
        <div>
          <Link to="/app" className="text-white">
            <button
              className="w-full px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
              onClick={handleGoToSecondPage}
            >
              HyperParameters
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default UploadPage;
