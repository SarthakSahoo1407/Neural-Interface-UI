// import React, { useState, useEffect } from "react";
// import "./App.css";
// import SyntaxHighlighter from "react-syntax-highlighter";
// import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { CircularProgressbar } from "react-circular-progressbar";
// import ChangingProgressProvider from "./ChangingProgressProvider";

// import "react-circular-progressbar/dist/styles.css";

// // import IP from "./IP";

// const MyPage = () => {
//   const [optimizer, setOptimizer] = useState("Adam");
//   const [lossFunction, setLossFunction] = useState("BinaryCrossentropy");
//   const [learningRate, setLearningRate] = useState(0.01);
//   const [batchSize, setBatchSize] = useState(1);
//   const [epochs, setEpochs] = useState(1);
//   const [validation_split, setvalidation_Split] = useState(0);
//   const [codeString, setCodeString] = useState("");
//   const [webMessage, setWebMessage] = useState("");
//   const [totalEpoch, setTotalEpoch] = useState("");
//   const [currentEpoch, setCurrentEpoch] = useState("");
//   const [stepsPerEpoch, setStepsPerEpoch] = useState("");
//   const [currentStep, setCurrentStep] = useState("");
//   const [percent, setPercent] = useState(0);
//   const [trainLoss, setTrainLoss] = useState("");

//   // console.log(typeof(websocketData.totalEpoch))
//   const webMessageStr = `  totalEpoch: ${totalEpoch},
//   currentEpoch: ${currentEpoch},
//   stepsPerEpoch: ${stepsPerEpoch},
//   currentStep: ${currentStep},
//   percent: ${Math.round(percent * 100) / 100} %,
//   trainLoss: ${Math.round(trainLoss * 100) / 100}`;

//   const lossFunc = {
//     "Binary Crossentropy": "BinaryCrossentropy",
//     "Sparse Categorical Crossentropy": "SparseCategoricalCrossentropy",
//     "Categorical Crossentropy": "CategoricalCrossentropy",
//     Huber: "Huber",
//     "Mean Absolute Error": "MeanAbsoluteError",
//     "Mean Sqaured Error": "MeanSquaredError",
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://10.130.1.152:8000/api/getCode", {
//         headers: {
//           accept: "application/json",
//         },
//       });
//       const data = await response.json();
//       setCodeString(data);
//       // console.log('data',data);
//     } catch (error) {
//       console.error("Error fetching code string:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

// const opt = {
//   Adam: "Adam",
//   SGD: "SGD",
//   Adagrad: "Adagrad",
//   Adadelta: "Adadelta",
//   RMSprop: "RMSprop",
// };
//   // ip_add = IP;

//   const handleGoToSecondPage = async () => {
//     console.log(
//       optimizer,
//       lossFunction,
//       learningRate,
//       batchSize,
//       epochs,
//       validation_split
//     );
//     await fetch(
//       `http://10.130.1.152:8000/api/hyperparameters?optimizer=${encodeURIComponent(
//         optimizer
//       )}&loss=${encodeURIComponent(
//         lossFunction
//       )}&learning_rate=${encodeURIComponent(
//         learningRate
//       )}&epochs=${encodeURIComponent(epochs)}&batch_size=${encodeURIComponent(
//         batchSize
//       )}&validation_split=${encodeURIComponent(validation_split)}`,
//       {
//         method: "POST",
//         headers: {
//           accept: "application/json",
//           "content-type": "application/x-www-form-urlencoded",
//         },
//         body: "",
//       }
//     );
//     await establishWebSocketConnection();
//   };

//   // Function to establish WebSocket connection
//   const establishWebSocketConnection = () => {
//     const socket = new WebSocket("ws://10.130.1.152:8000/ws");

//     socket.onopen = () => {
//       console.log("WebSocket connected");
//     };

//     socket.onmessage = (event) => {
//       // console.log("WebSocket message received:", event.data);
//       const parsedData = JSON.parse(event.data);
//       setTotalEpoch(parsedData.totalEpoch);
//       setCurrentEpoch(parsedData.currentEpoch);
//       setStepsPerEpoch(parsedData.stepsPerEpoch);
//       setCurrentStep(parsedData.currentStep);
//       setPercent(parsedData.percent);
//       setTrainLoss(parsedData.trainLoss);

//       setWebMessage(event.data);
//     };

//     socket.onclose = () => {
//       console.log("WebSocket disconnected");
//     };

//     setWs(socket);
//   };

//   const handleOptimizerChange = (e) => {
//     setOptimizer(e.target.value);
//   };

//   const handleLossFunctionChange = (e) => {
//     setLossFunction(e.target.value);
//   };

//   const handleLearningRateChange = (e) => {
//     setLearningRate(parseFloat(e.target.value));
//   };

//   const handleBatchSizeChange = (e) => {
//     setBatchSize(parseInt(e.target.value));
//   };

//   const handleEpochsChange = (e) => {
//     setEpochs(parseInt(e.target.value));
//   };
//   const handlevalidation_SplitChange = (e) => {
//     setvalidation_Split(parseFloat(e.target.value));
//   };

//   // const [progress, setProgress] = useState(0);
//   const [ws, setWs] = useState(null);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Input Page</h1>

//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-1">Optimizers:</label>
//         <select
//           className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//           value={optimizer}
//           onChange={handleOptimizerChange}
//         >
//           {Object.keys(opt).map((key) => (
//             <option key={key} value={opt[key]}>
//               {key}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-1">Loss Function:</label>
//         <select
//           className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//           value={lossFunction}
//           onChange={handleLossFunctionChange}
//         >
//           {Object.keys(lossFunc).map((key) => (
//             <option key={key} value={lossFunc[key]}>
//               {key}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-1">Learning Rate:</label>
//         <input
//           type="number"
//           value={learningRate}
//           onChange={handleLearningRateChange}
//           className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-1">
//           validation_Split:
//         </label>
//         <input
//           type="number"
//           value={validation_split}
//           onChange={handlevalidation_SplitChange}
//           className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-1">Batch Size:</label>
//         <input
//           type="number"
//           value={batchSize}
//           onChange={handleBatchSizeChange}
//           className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-bold mb-1">Epochs:</label>
//         <input
//           type="number"
//           value={epochs}
//           onChange={handleEpochsChange}
//           className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//         />
//       </div>

//       <button
//         className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
//         onClick={handleGoToSecondPage}
//       >
//         Neural Page
//       </button>

//       <div className="grid place-items-center mt-8">
//         <div className="max-w-full min-w-[25rem]  rounded-md overflow-hidden">
//           <div className="px-4 py-2">
//             <SyntaxHighlighter
//               language="json"
//               style={atomOneDark}
//               className="text-left"
//               customStyle={{
//                 padding: "20px",
//               }}
//               wrapLongLines={true}
//             >
//               {/* {console.log("codeString:", codeString)} */}
//               {webMessageStr}
//             </SyntaxHighlighter>
//           </div>
//         </div>
//         <div className="mt-8">
//           {/* <h2 className="text-xl font-bold mb-2">WebSocket Data</h2> */}
//           <div style={{ width: 50, height: 50 }}>
//             <CircularProgressbar
//               value={Math.round(percent)}
//               text={`${Math.round(percent)}%`}
//             />
//           </div>
//           {/* <p>Percent: {websocketData.percent}</p> */}
//         </div>
//       </div>

//       <div className="grid place-items-center mt-8">
//         <div className="max-w-full min-w-[25rem]  rounded-md overflow-hidden">
//           <div className="px-4 py-2">
//             <SyntaxHighlighter
//               language="python"
//               style={atomOneDark}
//               className="text-left"
//               customStyle={{
//                 padding: "20px",
//               }}
//               wrapLongLines={true}
//             >
//               {/* {console.log("codeString:", codeString)} */}
//               {codeString}
//             </SyntaxHighlighter>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyPage;

import React, { useState, useEffect } from "react";
import "./App.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CircularProgressbar } from "react-circular-progressbar";
import ChangingProgressProvider from "./ChangingProgressProvider";

import "react-circular-progressbar/dist/styles.css";

const MyPage = () => {
  const [optimizer, setOptimizer] = useState("Adam");
  const [lossFunction, setLossFunction] = useState("BinaryCrossentropy");
  const [learningRate, setLearningRate] = useState(0.01);
  const [batchSize, setBatchSize] = useState(1);
  const [epochs, setEpochs] = useState(1);
  const [validation_split, setvalidation_Split] = useState(0);
  const [codeString, setCodeString] = useState("");
  const [webMessage, setWebMessage] = useState("");
  const [totalEpoch, setTotalEpoch] = useState("");
  const [currentEpoch, setCurrentEpoch] = useState("");
  const [stepsPerEpoch, setStepsPerEpoch] = useState("");
  const [currentStep, setCurrentStep] = useState("");
  const [percent, setPercent] = useState(0);
  const [trainLoss, setTrainLoss] = useState("");

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
    try {
      const response = await fetch("http://10.130.1.152:8000/api/getCode", {
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
      const response = await fetch(
        `http://10.130.1.152:8000/api/hyperparameters?optimizer=${encodeURIComponent(
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
    } catch (error) {
      console.error("Error sending hyperparameters:", error);
    }
  };
  const [ws, setWs] = useState(null);
  const establishWebSocketConnection = () => {
    const socket = new WebSocket("ws://10.130.1.152:8000/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      setTotalEpoch(parsedData.totalEpoch);
      setCurrentEpoch(parsedData.currentEpoch);
      setStepsPerEpoch(parsedData.stepsPerEpoch);
      setCurrentStep(parsedData.currentStep);
      setPercent(parsedData.percent);
      setTrainLoss(parsedData.trainLoss);

      setWebMessage(event.data);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
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
    <div className="container mx-auto p-4 flex flex-col w-full">
      <h1 className="text-3xl font-bold mb-4">Input Page</h1>
      <div className="w-[40vw] flex flex-col self-center">
        <div className="mb-4 flex flex-col items-start">
          <label className="block text-sm font-bold mb-1 gap-2">Optimizers:</label>
          <select
            className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
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

        <div className="mb-4 flex flex-col items-start gap-2">
          <label className="block text-sm font-bold mb-1">Loss Function:</label>
          <select
            className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
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

        <div className="mb-4 flex flex-col items-start gap-2">
          <label className="block text-sm font-bold mb-1">Learning Rate:</label>
          <input
            type="number"
            value={learningRate}
            onChange={handleLearningRateChange}
            className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 flex flex-col items-start gap-2">
          <label className="block text-sm font-bold mb-1">
            validation_Split:
          </label>
          <input
            type="number"
            value={validation_split}
            onChange={handlevalidation_SplitChange}
            className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex flex-col items-start gap-2">
          <label className="block text-sm font-bold mb-1">Batch Size:</label>
          <input
            type="number"
            value={batchSize}
            onChange={handleBatchSizeChange}
            className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4 flex flex-col items-start gap-2">
          <label className="block text-sm font-bold mb-1">Epochs:</label>
          <input
            type="number"
            value={epochs}
            onChange={handleEpochsChange}
            className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <button
        className="w-[200px] px-6 py-3 flex self-center justify-center text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleGoToSecondPage}
      >
        Neural Page
      </button>
      <div className="flex flex-row justify-center gap-32 place-items-center mt-8">
        <div className="max-w-full min-w-[25rem]  rounded-md overflow-hidden">
          <div className="px-4 py-2">
            <SyntaxHighlighter
              language="json"
              style={atomOneDark}
              className="text-left"
              customStyle={{
                padding: "20px",
              }}
              wrapLongLines={true}
            >
              {webMessageStr}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="mt-8 max-w-[35%]">
          <div style={{ width: 100, height: 100 }}>
            <CircularProgressbar
              value={Math.round(percent)}
              text={`${Math.round(percent)}%`}
            />
          </div>
        </div>
      </div>

      <div className="grid place-items-center mt-8">
        <div className="max-w-full min-w-[25rem]  rounded-md overflow-hidden">
          <div className="px-4 py-2">
            <SyntaxHighlighter
              language="python"
              style={atomOneDark}
              className="text-left"
              customStyle={{
                padding: "20px",
              }}
              wrapLongLines={true}
            >
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
