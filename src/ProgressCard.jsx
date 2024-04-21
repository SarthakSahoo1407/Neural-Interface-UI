import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const ProgressCard = ({ title, value, text }) => {
  return (
    <div className="bg-white flex flex-col items-center px-8 py-4 gap-7 shadow-xl w-full h-[30vh] rounded-2xl p-2">
      <h1 className="text-[#5f5f5f] font-bold text-xl">{title}</h1>
      <CircularProgressbar 
        className="w-4/6 h-4/6" 
        value={value} 
        text={text}
        styles={buildStyles({
            textColor: "#5f5f5f",
            pathColor: "#16a34a",
            trailColor: "#d8f7e3"
          })} 
      
      />
    </div>
  );
};

const ProgressGrid = ({ progressData }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-6 w-full mb-5">
      {progressData.map((item, index) => (
        <ProgressCard
          key={index}
          title={item.title}
          value={item.value}
          text={item.text}
        />
      ))}
    </div>
  );
};

export default ProgressGrid;
