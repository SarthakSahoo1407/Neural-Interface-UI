import React, { useState, useEffect } from "react";
import "./App.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CircularProgressbar } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";
import ProgressGrid from "./ProgressCard";


import "react-circular-progressbar/dist/styles.css";

const MyPage = () => {
  const ip = "10.130.0.142:8000";

  const [optimizer, setOptimizer] = useState("Adam");
  const [lossFunction, setLossFunction] = useState("BinaryCrossentropy");
  const [learningRate, setLearningRate] = useState(0.01);
  const [batchSize, setBatchSize] = useState(1);
  const [epochs, setEpochs] = useState(1);
  const [validation_split, setvalidation_Split] = useState(0);
  const [codeString, setCodeString] = useState("");
  var [webMessage, setWebMessage] = useState("");
  const [totalEpoch, setTotalEpoch] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [stepsPerEpoch, setStepsPerEpoch] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [percent, setPercent] = useState(0);
  const [val_loss, setValLoss] = useState(0);
  const [isWebSocketConnected, setIsWebSocketConnected] = useState(false); // State to track WebSocket connection status
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track whether form is submitting


  const [trainLoss, setTrainLoss] = useState(0);

  webMessage = `  totalEpoch: ${parseInt(totalEpoch)},
  currentEpoch: ${parseInt(currentEpoch)},
  stepsPerEpoch: ${parseInt(stepsPerEpoch)},
  currentStep: ${parseInt(currentStep)},
  percent: ${Math.round(percent * 100) / 100} %,
  trainLoss: ${Math.round(trainLoss * 100) / 100}`;

  const progressData = [
    {
      title: "Current Epoch",
      value: Math.round((currentEpoch / totalEpoch) * 100),
      text: `${Math.round(currentEpoch)}`,
    },
    {
      title: "Current Step",
      value: Math.round((currentStep / stepsPerEpoch) * 100),
      text: `${Math.round(currentStep)}`,
    },
    {
      title: "Percent",
      value: Math.round(percent),
      text: `${Math.round(percent)}%`,
    },
    {
      title: "Train Loss",
      value: Math.round(100 * 100) / 100,
      text: `${Math.round(trainLoss * 100) / 100}`,
    },
    {
      title: "Valid Loss",
      value: Math.round(100 * 100) / 100,
      text: `${Math.round(val_loss * 100) / 100}`,
    },
  ];

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([codeString], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "gen-code.py";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  const downloadModel = async () => {
    // try {
    //   const response = await fetch('http://192.168.83.208:8000/api/model', {
    //     headers: {
    //       'accept': 'application/json'
    //     }
    //   });
    try {
      const response = await fetch('/api/model', {
        headers: {
          'accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to download model');
      }
  
      // Convert response to blob
      const blob = await response.blob();
  
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
  
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'model.zip'); // Set the filename for the downloaded file
      document.body.appendChild(link);
  
      // Trigger the download
      link.click();
  
      // Clean up
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading model:', error);
    }
  };


  // console.log(typeof(currentEpoch))
  const lossFunc = {
    "Binary Crossentropy": "BinaryCrossentropy",
    "Sparse Categorical Crossentropy": "SparseCategoricalCrossentropy",
    "Categorical Crossentropy": "CategoricalCrossentropy",
    "Huber": "Huber",
    "Mean Absolute Error": "MeanAbsoluteError",
    "Mean Sqaured Error": "MeanSquaredError",
  };
  const opt = {
    Adam: "Adam",
    SGD: "SGD",
    Adagrad: "Adagrad",
    Adadelta: "Adadelta",
    RMSprop: "RMSprop",
  };

  const fetchData = async () => {
    // try {
    //   const response = await fetch(`http://192.168.83.208:8000/api/getCode`, {
    //     headers: {
    //       accept: "application/json",
    //     },
    //   });
    try {
      const response = await fetch(`/api/getCode`, {
        headers: {
          accept: "application/json",
        },
      });
      const data = await response.json();
      setCodeString(data);
    } catch (error) {
      console.error("Error fetching code string:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGoToSecondPage = async () => {
    try {
      // const response = await fetch(
      //   `http://192.168.83.208:8000/api/hyperparameters?optimizer=${encodeURIComponent(
      //     optimizer
      //   )}&loss=${encodeURIComponent(
      //     lossFunction
      //   )}&learning_rate=${encodeURIComponent(
      //     learningRate
      //   )}&epochs=${encodeURIComponent(epochs)}&batch_size=${encodeURIComponent(
      //     batchSize
      //   )}&validation_split=${encodeURIComponent(validation_split)}`,
      //   {
      //     method: "POST",
      //     headers: {
      //       accept: "application/json",
      //       "content-type": "application/x-www-form-urlencoded",
      //     },
      //     body: "",
      //   }
      // );
      const response = await fetch(
        `/api/hyperparameters?optimizer=${encodeURIComponent(
          optimizer
        )}&loss=${encodeURIComponent(
          lossFunction
        )}&learning_rate=${encodeURIComponent(
          learningRate
        )}&epochs=${encodeURIComponent(epochs)}&batch_size=${encodeURIComponent(
          batchSize
        )}&validation_split=${encodeURIComponent(validation_split)}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/x-www-form-urlencoded",
          },
          body: "",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      await establishWebSocketConnection();
      const currentTime = new Date().toLocaleString();
      const newData = `\n\nTrain Loss: ${trainLoss}\nCurrent Time: ${currentTime}`;
      const existingData = localStorage.getItem("dataset_info.txt");

      const combinedData = `${existingData}${newData}`;

      localStorage.setItem("datasetinfo.txt", combinedData);

      

    } catch (error) {
      console.error("Error sending hyperparameters:", error);
    }
    finally{
      setIsSubmitting(false); // Stop submitting
      console
    }
  };
  const [ws, setWs] = useState(null);
  const establishWebSocketConnection = () => {
    // const socket = new WebSocket(`ws://192.168.83.208:8000/ws`);
    const socket = new WebSocket(`ws://192.168.83.208:8000/ws`); //change this only - websocket

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsWebSocketConnected(true); // Set WebSocket connection status to true when connected

    };

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      // console.log(parsedData)
      setTotalEpoch(parsedData.total_Epoch);
      setCurrentEpoch(parsedData.current_epoch);
      setStepsPerEpoch(parsedData.step_per_epoch);
      setCurrentStep(parsedData.current_step);
      setPercent(parsedData.percent);
      setTrainLoss(parsedData.train_loss);
      setValLoss(parsedData.val_loss);

      setWebMessage(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsWebSocketConnected(false); // Set WebSocket connection status to false when disconnected

      
    };

    setWs(socket);
  };

  const handleOptimizerChange = (e) => {
    setOptimizer(e.target.value);
  };

  const handleLossFunctionChange = (e) => {
    setLossFunction(e.target.value);
  };

  const handleLearningRateChange = (e) => {
    setLearningRate(parseFloat(e.target.value));
  };

  const handleBatchSizeChange = (e) => {
    setBatchSize(parseInt(e.target.value));
  };

  const handleEpochsChange = (e) => {
    setEpochs(parseInt(e.target.value));
  };
  const handlevalidation_SplitChange = (e) => {
    setvalidation_Split(parseFloat(e.target.value));
  };

  const webMessageStr = `  totalEpoch: ${totalEpoch},
  currentEpoch: ${currentEpoch},
  stepsPerEpoch: ${stepsPerEpoch},
  currentStep: ${currentStep},
  percent: ${Math.round(percent * 100) / 100} %,
  trainLoss: ${Math.round(trainLoss * 100) / 100}`;

  return (
    <div className="bg-[#f9f9f9]  w-screen px-[20%] py-[3vw]">
      {/*input fields */}
      <h1 className="font-bold text-[1.7vw] capitalize text-[#414141] p-4">
        Parameters
      </h1>
      <div className="inputs mb-5 rounded-2xl bg-white p-6 shadow-xl w-full flex gap-[3vw] flex-col">
        <div className="fields flex flex-row">
          <div className="part1 w-1/2 flex flex-col gap-[3vw] px-5">
            <div className="flex flex-col gap-2">
              {/* drop down */}
              <label className="text-[#5f5f5f] font-semibold text-[1.1vw]">
                Optimizers:
              </label>
              <select
                className="bg-white w-full focus:outline-none text-[#5f5f5f] border-b-2 border-gray shadow-2xl font-normal"
                value={optimizer}
                onChange={handleOptimizerChange}
              >
                {Object.keys(opt).map((key) => (
                  <option key={key} value={opt[key]}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              {/* input field */}
              <label className="text-[#5f5f5f] font-semibold text-[1.1vw]">
                Learning Rate:
              </label>
              <input
                className="bg-white w-full focus:outline-none text-[#5f5f5f] border-b-2 border-gray shadow-2xl font-normal"
                type="number"
                value={learningRate}
                onChange={handleLearningRateChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              {/* input field */}
              <label className="text-[#5f5f5f] font-semibold text-[1.1vw]">
                Batch Size:
              </label>
              <input
                className="bg-white w-full focus:outline-none text-[#5f5f5f] border-b-2 border-gray shadow-2xl font-normal"
                type="number"
                value={batchSize}
                onChange={handleBatchSizeChange}
              />
            </div>
          </div>
          <div className="part2 w-1/2 flex flex-col gap-[3vw] px-5">
            <div className="flex flex-col gap-2">
              {/* dropdown */}
              <label className="text-[#5f5f5f] font-semibold text-[1.1vw]">
                Loss Function:
              </label>
              <select
                className="bg-white w-full focus:outline-none text-[#5f5f5f] border-b-2 border-gray shadow-2xl font-normal"
                value={lossFunction}
                onChange={handleLossFunctionChange}
              >
                {Object.keys(lossFunc).map((key) => (
                  <option key={key} value={lossFunc[key]}>
                    {key}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              {/* input field */}
              <label className="text-[#5f5f5f] font-semibold text-[1.1vw]">
                validation_Split:
              </label>
              <input
                className="bg-white w-full focus:outline-none text-[#5f5f5f] border-b-2 border-gray shadow-2xl font-normal"
                type="number"
                value={validation_split}
                onChange={handlevalidation_SplitChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              {/* input field */}
              <label className="text-[#5f5f5f] font-semibold text-[1.1vw]">
                Epochs:
              </label>
              <input
                className="bg-white w-full focus:outline-none text-[#5f5f5f] border-b-2 border-gray shadow-2xl font-normal"
                type="number"
                value={epochs}
                onChange={handleEpochsChange}
              />
            </div>
          </div>
        </div>
        <button
          disabled={isWebSocketConnected || isSubmitting} // Disable button if WebSocket is connected or form is submitting
          className="px-4 py-2 w-1/4 text-[1.2vw] self-center font-semibold text-white bg-[#16a34a] rounded-lg hover:bg-[#41a967]"
          onClick={handleGoToSecondPage}
        >
          Submit
        </button>
      </div>

      <h1 className="font-bold text-[1.7vw] capitalize text-[#5f5f5f] p-4">
        Progress
      </h1>
      <ProgressGrid progressData={progressData} />

      {/* <h1 className="font-bold text-[1.7vw] capitalize text-[#5f5f5f] p-4 ">
        Train-Loss
      </h1>
      <div className="shadow-xl rounded-2xl bg-white py-2 px-1 ">
        
      </div> */}

      <h1 className="font-bold text-[1.7vw] capitalize text-[#5f5f5f] p-4 ">
        Generated-Code
      </h1>

     
      <div className="shadow-xl rounded-2xl bg-white py-2 px-1 ">
        {/* code gen part */}
        <SyntaxHighlighter
          language="python"
          style={vs}
          customStyle={{
            padding: "20px",
          }}
          wrapLongLines={true}
        >
          {codeString}
        </SyntaxHighlighter>
      </div>
      <button
          className="px-4 py-2 mt-4 text-[1.2vw] font-semibold text-white bg-[#16a34a] rounded-lg hover:bg-[#41a967]"
          onClick={downloadCode}
        >
          Download Code
        </button>
        <hr className="p-2 mt-10"></hr>
        <h1 className="font-bold text-[1.7vw] capitalize text-[#5f5f5f] p-4 ">
        Model
      </h1>
        <button
          className="px-4 py-2 mt-4 text-[1.2vw] font-semibold text-white bg-[#16a34a] rounded-lg hover:bg-[#41a967]"
          onClick={downloadModel}
        >
          Download Model
        </button>
    </div>
  );
};

export default MyPage;

{
  /* <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-6 w-full mb-5 ">
        {/* 6 card div */
}
{
  /* <div className="bg-white flex flex-col  item-center px-8 py-4 gap-7 shadow-xl w-full h-[30vh] rounded-2xl p-2">
          <h1 className="text-black font-bold text-xl">Total Epochs</h1>
          <CircularProgressbar
              className="w-4/6 h-4/6"
              value={Math.round((totalEpoch / 100) * 100  )}
              text={`${Math.round(totalEpoch)}%`
            }
            />
        </div> */
}

// <div className="bg-white flex flex-col  item-center px-8 py-4 gap-7 shadow-xl w-full h-[30vh] rounded-2xl p-2">
//   <h1 className="text-black font-bold text-xl">Current Epoch</h1>
//   <CircularProgressbar
//       className="w-4/6 h-4/6"
//       value={Math.round((currentEpoch / totalEpoch)* 100)}
//       text={`${Math.round(currentEpoch)}`
//     }
//     />
// </div>
{
  /* <div className="bg-white flex flex-col  item-center px-8 py-4 gap-7 shadow-xl w-full h-[30vh] rounded-2xl p-2">
          <h1 className="text-black font-bold text-xl">Steps Per Epochs</h1>
          <CircularProgressbar
              className="w-4/6 h-4/6"
              value={Math.round(percent)}
              text={`${Math.round(stepsPerEpoch)}%`
            }
            />
        </div> */
}
// <div className="bg-white flex flex-col  item-center px-8 py-4 gap-7 shadow-xl w-full h-[30vh] rounded-2xl p-2">
//   <h1 className="text-black font-bold text-xl">Current Step</h1>
//   <CircularProgressbar
//       className="w-4/6 h-4/6"
//       value={Math.round((currentStep / stepsPerEpoch) * 100)}
//       text={`${Math.round(currentStep)}`
//     }
//     />
// </div>
// <div className="bg-white flex flex-col  item-center px-8 py-4 gap-7 shadow-xl w-full h-[30vh] rounded-2xl p-2">
//   <h1 className="text-black font-bold text-xl">Percent</h1>
//   <CircularProgressbar
//       className="w-4/6 h-4/6"
//       value={Math.round(percent)}
//       text={`${Math.round(percent)}%`
//     }
//     />
// </div>
// <div className="bg-white flex flex-col  item-center px-8 py-4 gap-7 shadow-xl w-full h-[30vh] rounded-2xl p-2">
//   <h1 className="text-black font-bold text-xl">Train loss</h1>
//   <CircularProgressbar
//       className="w-4/6 h-4/6"
//       value={Math.round(trainLoss * 100) / 100}

//       text={`${Math.round(trainLoss * 100) / 100}`

//     }
//     />
// </div>
// </div> */}
