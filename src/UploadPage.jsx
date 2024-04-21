import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./App.css";
import "./index.css";
import Select from "react-select";
import { Background } from "reactflow";

function UploadPage() {
  const ip = "http://10.130.1.248:8000";

  // const [file, setFile] = useState(null);
  // const [headers, setHeaders] = useState([]);
  // const [selectedFeatures, setSelectedFeatures] = useState([]);
  // const [selectedTargets, setSelectedTargets] = useState([]);
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedTargets, setSelectedTargets] = useState([]);

  useEffect(() => {
    // Load data from local storage if available
    const uploadData = JSON.parse(localStorage.getItem("uploadData"));
    if (uploadData) {
      setFile(uploadData.file);
      setSelectedFeatures(uploadData.selectedFeatures);
      setSelectedTargets(uploadData.selectedTargets);
    }
  }, []); 

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
    // console.log();
    // const data = {
    //   selectedFeatures,
    //   selectedTargets,
    // };
    // console.log(JSON.stringify(data));
    // if (!file) {
    //   console.error("No file selected.");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("features", selectedFeatures.join(","));
    // formData.append("targets", selectedTargets.join(","));
    // formData.append("file", file);

    // fetch("http://192.168.51.208:8000/api/file", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     console.log("API Response:", data);
    //     // Redirect to the second page or handle response as needed
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with the API request:", error);
    //   });
    const dataToStore = {
      file: file ? file.name : null,
      selectedFeatures,
      selectedTargets,
    };

    // Store data in local storage
    localStorage.setItem("uploadData", JSON.stringify(dataToStore));

    console.log(JSON.stringify(dataToStore));

    if (!file) {
      console.error("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("features", selectedFeatures.join(","));
    formData.append("targets", selectedTargets.join(","));
    formData.append("file", file);

    fetch("http://10.130.1.3:8000/api/file", {
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
        // For example:
        // window.location.href = "/app"; // Redirect to the next page
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
    <div className="w-screen h-screen flex justify-center items-center"  >
    <div className="nav w-full px-6 py-2 items-center flex flex-row justify-between absolute top-0 z-20" >
      <div className="log flex flex-row gap-3 w-[18%] p-4  justify-center items-center">
        <img className="w-[2.8vw]" src="public/final.png" alt="" />
        <h1 className="font-bold text-[1.7vw] capitalize text-[#414141]">
          Neural-map
        </h1>
      </div>
      <div className="items capitalize font-semibold w-1/2 text-white text-[1.2vw] flex flex-row gap-4 z-10 justify-end">
        <h4 className="cursor-pointer px-3 py-2 rounded-md w-[18%] flex justify-center items-center bg-[#9333ea] hover:bg-[#9856d6]">
          About us
        </h4>
        <h4 className="cursor-pointer px-3 py-2 rounded-md w-[18%] flex justify-center items-center bg-[#2563eb] hover:bg-[#5c75cc]">
          Contact us
        </h4>
      </div>
    </div>
    <div className="w-[35vw] h-[65vh] shadow-2xl px-[0.7vw] py-[2.4vw] bg-white rounded-md flex flex-col items-center justify-between">
      {/* main div */}
      <div className="text-[#414141] text-[0.9vw] font-bold capitalize">
        {/* title div */}
        <h1>Upload DataSet</h1>
      </div>
      {/* file upload div */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="text-[1vw] font-semibold text-[#5f5f5f]
          file:mx-[9%] file:py-2 file:px-4 file:rounded-md file:bg-[#16a34a]
          file:border-0 file:text-[1vw] file:font-bold file:self-center 
         file:text-[#ffffff] hover:file:translate-y-[0.3px] hover:file:text-[#fbf2fc]
          hover:file:bg-[#4ba76d] file:cursor-pointer"
      />{" "}
      <div className="w-3/4 flex flex-col gap-[0.2vw]">
        {/* feature selection div */}
        <h3 className="text-[#5f5f5f] font-semibold text-[1.1vw] w-1/6">
          Features:
        </h3>
        {/* Data entry div */}
        <div className="flex flex-row justify-center items-center gap-3 ">
          {/* feature drop down div */}
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
            className="w-3/4 "
          />
          {/* select all button div */}
          <button
            onClick={handleSelectAllFeatures}
            className="px-4 py-2 w-1/4 text-sm font-medium text-white bg-[#16a34a] rounded-md hover:bg-[#4ba76d]"
          >
            Select All
          </button>
        </div>
      </div>
      <div className="w-3/4 flex flex-col gap-[0.2vw]">
        {/* target selection div */}

        <h3 className="text-[#5f5f5f] font-semibold text-[1.1vw] w-1/6">
          Targets:
        </h3>
        <div>
          {/* target drop down div */}
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
            className="w-full border-none active:outline-none "
          />
        </div>
      </div>
      {/* submit button div */}
      <Link to="/app" className="">
        <button
          className="w-[200px] h-[45px] flex items-center justify-center text-[1.2vw] mt-4 capitalize font-semibold text-white bg-[#16a34a] rounded-md hover:bg-[#4ba76d] hover:translate-y-[0.3px]"
          onClick={handleGoToSecondPage}
        >
          Submit
        </button>
      </Link>
    </div>
  </div>
  );
}
export default UploadPage;
