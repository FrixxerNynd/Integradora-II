import React from "react";
import {
  Thermometer,
  Droplets,
  Gauge,
  Wind,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import "./SensorCard.css";

const iconMap = {
  thermometer: Thermometer,
  droplets: Droplets,
  gauge: Gauge,
  wind: Wind,
};

const SensorCard = ({ sensor }) => {
  const Icon = iconMap[sensor.icon] || Thermometer;
  const TrendIcon = sensor.isPositive ? TrendingUp : TrendingDown;

  return (
    <div className={`sensor-card sensor-card--${sensor.color}`}>
      <div className="sensor-card__header">
        <div className="sensor-card__icon">
          <Icon size={24} />
        </div>
        <div className="sensor-card__trend">
          <TrendIcon size={16} />
          <span>{sensor.trend}</span>
        </div>
      </div>

      <div className="sensor-card__content">
        <h3 className="sensor-card__title">{sensor.title}</h3>
        <div className="sensor-card__value">{sensor.value}</div>
      </div>

      <div className="sensor-card__footer">
        <div className="sensor-card__status">
          <div
            className={`status-indicator ${
              sensor.isPositive ? "positive" : "negative"
            }`}
          ></div>
          <span>Compared to last hour</span>
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
