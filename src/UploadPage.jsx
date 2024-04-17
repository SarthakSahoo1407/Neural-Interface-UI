import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";



import "./App.css";
import "./index.css";
import Select from "react-select";

function UploadPage() {
  const [file, setFile] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const [selectedTargets, setSelectedTargets] = useState([]);
  const apiUrl = "http://10.130.1.152:8000";
  console.log("apiUrl", apiUrl);

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

    fetch("http://10.130.1.152:8000/api/file", {
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

  return (
    <div className="flex ">
      <div className="flex  items-center  justify-center h-screen w-screen">
        <div className="text-center">
          <h1 className="mb-8 text-4xl  font-bold  text-gray-800">
            Upload Page
          </h1>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block mb-4 w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4 file:rounded-md
            file:border-0 file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-500
            hover:file:bg-pink-100"
          />
          <div className="flex flex-col w-[30vw] justify-between">
            <div className="mr-8 flex flex-col items-start">
              <div className="flex flex-row p-1 items-center">
                <h3 className="mb-4 mr-4  mt-1 font-semibold  text-gray-900 dark:text-white">
                  Features
                </h3>
                <div className="flex items-center w-[200vw]">
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
                    className="w-[18vw]"
                  />
                  <button
                    onClick={handleSelectAllFeatures}
                    className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                  >
                    Select All
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-row">
              <h3 className="mb-4  mr-8 mt-1 flex flex-col items-start font-semibold text-gray-900 dark:text-white">
                Targets
              </h3>
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
                className="w-[18vw]"
              />
            </div>
          </div>

          <Link to="/app" className="text-white">
            <button
              className="px-6 py-3 text-lg font-semibold self-center ml-6 text-white bg-blue-500 rounded hover:bg-blue-600"
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
  

