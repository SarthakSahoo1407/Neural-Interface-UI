import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './App.css';

// import IP from "./IP";

const MyPage = () => {
  const [optimizer, setOptimizer] = useState("Adam");
  const [lossFunction, setLossFunction] = useState("BinaryCrossentropy");
  const [learningRate, setLearningRate] = useState(0.01);
  const [batchSize, setBatchSize] = useState(1);
  const [epochs, setEpochs] = useState(1);
  const [validation_split, setvalidation_Split] = useState(0);

  const lossFunc = {
    "Binary Crossentropy": "BinaryCrossentropy",
    "Sparse Categorical Crossentropy": "SparseCategoricalCrossentropy",
    "Categorical Crossentropy": "CategoricalCrossentropy",
    Huber: "Huber",
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
  // ip_add = IP;

  const handleGoToSecondPage = async () => {
    console.log(optimizer, lossFunction, learningRate, batchSize, epochs,validation_split);
    await fetch(
      `http://10.130.0.248:8000/api/hyperparameters?optimizer=${encodeURIComponent(
        optimizer
      )}&loss=${encodeURIComponent(
        lossFunction
      )}&learning_rate=${encodeURIComponent(
        learningRate
      )}&epochs=${encodeURIComponent(
        epochs
      )}&batch_size=${encodeURIComponent(
        batchSize
      )}&validation_split=${encodeURIComponent(
        validation_split
      )}`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
        body: "",
      }
    );
    await establishWebSocketConnection();
  };

  // Function to establish WebSocket connection
  const establishWebSocketConnection = () => {
    const socket = new WebSocket("ws://10.130.0.248:8000/ws");

    socket.onopen = () => {z
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      setProgress(parseInt(event.data));
      console.log(event.data);
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
  }


  const [progress, setProgress] = useState(0);
  const [ws, setWs] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Input Page</h1>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Optimizers:</label>
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

      <div className="mb-4">
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

      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Learning Rate:</label>
        <input
          type="number"
          value={learningRate}
          onChange={handleLearningRateChange}
          className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">validation_Split:</label>
        <input
          type="number"

          value={validation_split}
          onChange={handlevalidation_SplitChange}
          className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Batch Size:</label>
        <input
          type="number"
          value={batchSize}
          onChange={handleBatchSizeChange}
          className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Epochs:</label>
        <input
          type="number"
          value={epochs}
          onChange={handleEpochsChange}
          className="w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <button
        className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
        onClick={handleGoToSecondPage}
      >
        Neural Page
      </button>
    </div>
  );
};

export default MyPage;


