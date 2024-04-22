import React, { useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Panel,
  Background,
  BackgroundVariant,
} from "reactflow";
import { Link } from "react-router-dom";
import { shallow } from "zustand/shallow";
import { useStore } from "./store";
import { tw } from "twind";
import Osc from "./nodes/Osc";
import Amp from "./nodes/amp";
import Out from "./nodes/out";
import layers from "./layer.json"; // Import the layer.json file

import "reactflow/dist/style.css";

const nodeTypes = {
  osc: Osc,
  amp: Amp,
  out: Out,
};

// const flowKey = "example-flow";

function generateId() {
  const randomPrefix = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0"); // 4-digit numeric prefix
  const randomChars = Math.random().toString(36).slice(2, 7); // 5 random alphanumeric chars
  return `${randomPrefix}${randomChars}`;
}

const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onNodesDelete: store.onNodesDelete,
  onEdgesChange: store.onEdgesChange,
  onEdgesDelete: store.onEdgesDelete,
  addEdge: store.addEdge,
  addOsc: () => store.createNode("osc"),
  addAmp: () => store.createNode("amp"),
  createNode: (nodeType) => {
    const id = generateId();
    store.addNode({
      id,
      type: nodeType,
    });
  },
});

export default function App() {
  const store = useStore(selector, shallow);
  const [logData, setLogData] = useState({});
  const { oscLayerType } = useStore();
  const { ampLayerType } = useStore();

  // const spacePressed = useKeyPress("Space");
  // const cmdAndSPressed = useKeyPress(["Meta+s", "Strg+s"]);

  const ip = "http://10.130.0.142:8000";

  let jsonData = {};
  const sendToApi = async () => {
    console.log(jsonData);
    try {
      const response = fetch(`http://10.130.0.142:8000/api/generate`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonData,
      });

      // console.log(response.text);
      const responseData = await response.text;
      console.log("API Response:", responseData);
      console.log("Data sent to backend:", jsonData);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };


  const handleLogClick = async () => {
    const values = {
      InputNode: [],
      HiddenNode: [],
    };
    const relation = {
      parentChildRelationship: [],
    };
    store.nodes
      .filter((node) => node.type === "osc")
      .forEach((node) => {
        const InputNode = {
          id: node.id,
          args: { ...node.data }, // Initialize args object with existing data
          type: oscLayerType,
        };

        layers.forEach((layer) => {
          if (layer.Name === node.data.type) {
            const params = layer.params;

            // Check if params.args is an array before attempting to iterate over it
            if (Array.isArray(params.args)) {
              params.args.forEach((arg) => {
                InputNode.args[arg] = ""; // Initialize with empty string
              });
            } else if (Object.keys(InputNode.args).length === 0) {
              // If args is empty, fill it with "it is empty"
              // const emptyfieldData = layers[parseInt(oscLayerType)].params.args ;
              // const js = JSON.stringify(emptyfieldData);
              const json1 = layers[parseInt(oscLayerType)].params.args;
              const json2 = layers[parseInt(oscLayerType)].params.kwargs;

              const concatenatedJSON = {
                ...json1,
                ...json2,
              };
              InputNode.args = concatenatedJSON;
              console.log();
            }
          }
        });

        values.InputNode.push(InputNode);
      });

    store.nodes
      .filter((node) => node.type === "amp")
      .forEach((node) => {
        const HiddenNode = {
          id: node.id,
          args: { ...node.data }, // Initialize args object with existing data
          type: ampLayerType,
        };

        layers.forEach((layer) => {
          if (layer.Name === node.data.type) {
            const params = layer.params;

            // Check if params.args is an array before attempting to iterate over it
            if (Array.isArray(params.args)) {
              params.args.forEach((arg) => {
                HiddenNode.args[arg] = ""; // Initialize with empty string
              });
            } else if (Object.keys(HiddenNode.args).length === 0) {
              // If args is empty, fill it with "it is empty"
              // const emptyfieldData = layers[parseInt(oscLayerType)].params.args ;
              // const js = JSON.stringify(emptyfieldData);
              const json1 = layers[parseInt(ampLayerType)].params.args;
              const json2 = layers[parseInt(ampLayerType)].params.kwargs;

              const concatenatedJSON = {
                ...json1,
                ...json2,
              };
              HiddenNode.args = concatenatedJSON;
              // console.log();
            }
          }
        });

        values.HiddenNode.push(HiddenNode);
      });


    const parentChildMap = {};
    store.edges.forEach((edge) => {
      const { source, target } = edge;
      if (!parentChildMap[source]) {
        parentChildMap[source] = [];
      }
      parentChildMap[source].push(target);
    });

    store.nodes.forEach((node) => {
      const children = parentChildMap[node.id] || [];
      children.forEach((childId) => {
        const parentName = node.id;
        const childName = childId;
        relation.parentChildRelationship.push({
          parent: parentName,
          child: childName,
        });
      });
    });


    // console.log(values);
    // console.log(relation);
    jsonData = { values, relation };
    jsonData = JSON.stringify({ values, relation }, null, 2);

    console.log(jsonData);
    // Create a blob with the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a URL for the blob
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "log_data.json";

    // Click the link to trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
    await sendToApi();
  };

  // Function to render input fields based on data from layer.json
  const renderInputFields = (nodeType) => {
    const layerParams = layers.find((layer) => layer.Type === nodeType)?.params
      ?.args;
    if (!layerParams || Object.keys(layerParams).length === 0) {
      const layerIndex = layers.findIndex((layer) => layer.Type === nodeType);
      if (layerIndex !== -1) {
        const layer = layers[layerIndex];
        const inputs = [];
        for (const [param, paramDesc] of Object.entries(layer.param_desc)) {
          inputs.push(
            <label key={param} className={tw("flex flex-col px-2 py-1")}>
              <p className={tw("text-xs font-bold mb-2")}>{param}</p>
              {paramDesc.type === "dropdown" ? (
                <select>
                  {paramDesc.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  className="nodrag block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  type={paramDesc.type}
                  defaultValue={
                    paramDesc.min !== undefined ? paramDesc.min : ""
                  }
                  min={paramDesc.min !== undefined ? paramDesc.min : undefined}
                  max={paramDesc.max !== undefined ? paramDesc.max : undefined}
                  step={paramDesc.type === "float" ? "any" : undefined}
                  // Handle input change here if needed
                />
              )}
            </label>
          );
        }
        return inputs;
      }
    } else {
      const inputs = [];
      for (const [param, defaultValue] of Object.entries(layerParams)) {
        inputs.push(
          <label key={param} className={tw("flex flex-col px-2 py-1")}>
            <p className={tw("text-xs font-bold mb-2")}>{param}</p>
            <input
              className="nodrag block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              type="text"
              defaultValue={defaultValue}
              // Handle input change here if needed
            />
            {/* Display default value for now, handle input change if needed */}
            <p className={tw("text-right text-xs")}>{defaultValue}</p>
          </label>
        );
      }
      return inputs;
    }
  };

  

  return (
    <ReactFlowProvider className="h-screen w-screen flex flex-col ">
      {/* <div className=" bg-sky-100 " style={{ width: '100vw', height: '100vh' }}> */}
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={store.nodes}
        edges={store.edges}
        onNodesChange={store.onNodesChange}
        onNodesDelete={store.onNodesDelete}
        onEdgesChange={store.onEdgesChange}
        onEdgesDelete={store.onEdgesDelete}
        onConnect={store.addEdge}
        fitView
        maxZoom={0.7}
        className="bg-black -100"
      >
        <Panel
          className="flex space-x-4 items-center justify-center py-6 absolute"
          position="bottom-left"
        >
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition duration-300"
            onClick={store.addOsc}
          >
            Input Node
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-green-500 text-white shadow-md hover:bg-green-600 transition duration-300"
            onClick={store.addAmp}
          >
            New Node
          </button>
          <Link to="/hyperparameter">
            <button
              className="px-4 py-2 rounded-lg bg-purple-500 text-white shadow-md hover:bg-purple-600 transition duration-300"
              onClick={handleLogClick}
            >
              Log Data
            </button> 
          </Link>
        </Panel>
        {/* <MiniMap nodeStrokeWidth={2} nodeColor={nodeColor} /> */}

        <Background gap={20} variant={BackgroundVariant.Dots} />
      </ReactFlow>
      {store.nodes.map((node) => (
        <div key={node.id}>{renderInputFields(node.type)}</div>
      ))}
      {/* </div> */}
    </ReactFlowProvider>
  );
  
}
