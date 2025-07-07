import React from "react";
import "./CircularProgress.css";

const CircularProgress = ({
  percentage,
  title,
  size = 150,
  strokeWidth = 10,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="circular-progress-container">
      <div className="circular-progress-header">
        <h3 className="circular-progress-title">{title}</h3>
      </div>

      <div
        className="circular-progress-wrapper"
        style={{ width: size, height: size }}
      >
        <svg className="circular-progress-svg" width={size} height={size}>
          {/* Background circle */}
          <circle
            className="circular-progress-bg"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />

          {/* Progress circle */}
          <circle
            className="circular-progress-bar"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>

        <div className="circular-progress-content">
          <span className="circular-progress-percentage">{percentage}%</span>
          <span className="circular-progress-label">Humedad</span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
