import React, { useState, useEffect } from 'react';
import { Handle } from 'reactflow';
import { shallow } from 'zustand/shallow';
import UniversalButton from "../Universal";

import { tw } from 'twind';
import { useStore } from '../store';
import layers from '../layer.json';

const selector = (id) => (store) => ({
  setParameters: (params) => store.updateNode(id, params),
  nodes: store.nodes,
});

export default function Amp({ id, data, nameField }) {
  const { setParameters } = useStore(selector(id), shallow);
  const [selectedLayer, setSelectedLayer] = useState(Object.keys(layers)[0]);
  const [inputData, setInputData] = useState(data);

  useEffect(() => {
    // Update input data when selectedLayer changes
    setInputData({ ...layers[selectedLayer].params.args, ...layers[selectedLayer].params.kwargs });
  }, [selectedLayer]);


  const handleParamChange = (key, value) => {
    const updatedData = { ...inputData, [key]: value };
    setInputData(updatedData);
    setParameters(updatedData);

  };


  const renderInputFields = () => {
    const layerParams = layers[selectedLayer];
    if (!layerParams || !layerParams.param_desc) return null;
    const splitIntoThreeColumns = (array) => {
      const thirdIndex = Math.ceil(array.length / 3);
      const firstColumn = array.slice(0, thirdIndex);
      const secondColumn = array.slice(thirdIndex, thirdIndex * 2);
      const thirdColumn = array.slice(thirdIndex * 2);
      return [firstColumn, secondColumn, thirdColumn];

    };

  
    const inputFields = [];
  
    // Function to render input field based on parameter description
    const renderInputField = (paramKey, paramDesc) => {
      const { type, options } = paramDesc;
      switch (type) {
        case "bool":
          return (
            <select
              className={tw(
                "w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              )}
              value={inputData[paramKey] || ""}
              onChange={(e) => handleParamChange(paramKey, e.target.value)}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          );
        case "dropdown":
          return (
            <select
              className={tw(
                "w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              )}
              value={inputData[paramKey] || ""}
              onChange={(e) => handleParamChange(paramKey, e.target.value)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          );
        default:
          return (
            <input
              className={tw(
                "w-full px-2 py-1 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              )}
              type="text"
              value={inputData[paramKey] || ""}
              onChange={(e) => handleParamChange(paramKey, e.target.value)}
            />
          );
      }
    };
  
    for (const [paramKey, paramDesc] of Object.entries(
      layerParams.param_desc
    )) {
      if (paramKey === "Type") continue;
      const inputField = (
        <div key={paramKey} className={tw("mb-2 w-full")}>
          <label className={tw("block text-sm font-bold mb-1")}>{paramKey}</label>
          {renderInputField(paramKey, paramDesc)}
        </div>
      );
      inputFields.push(inputField);
    }
  
    const [firstColumn, secondColumn, thirdColumn] = splitIntoThreeColumns(inputFields);
  
    return (
      <div className={tw('grid grid-cols-3 gap-4')}>
        <div>{firstColumn}</div>
        <div>{secondColumn}</div>
        <div>{thirdColumn}</div>
      </div>
    );
  };
    
  
  return (
    <div className={tw('rounded-md bg-white shadow-xl')}>
      <p className={tw('rounded-t-md px-2 py-1 bg-blue-500 text-white text-xl')}>Hidden Node</p>
      <label className={tw('flex flex-col px-2 py-1')}>
        <p className={tw('text-xs font-bold mb-2 mt-2')}>Layer Type</p>
        <select
          className="nodrag"
          value={selectedLayer}
          onChange={(e) => setSelectedLayer(e.target.value)}
        >
          {Object.keys(layers).map((layer) => (
            <option key={layer} value={layer}>
              {layers[layer].Type}
            </option>
          ))}
        </select>
      </label>
      {renderInputFields()}
      {/* <UniversalButton /> */}
      <Handle className={tw('w-3    h-3  bg-blue-500 ')} type="source" position="bottom" />
      <Handle  className={tw('w-3    h-3 bg-blue-500 ')} type="target" position="top" id={`${id}_input`} />
    </div>
  );
}
