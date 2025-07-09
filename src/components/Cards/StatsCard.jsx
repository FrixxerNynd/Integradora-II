import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import "./StatsCard.css";

const StatsCard = ({ stats }) => {
  const TrendIcon = stats.isPositive ? TrendingUp : TrendingDown;

  return (
    <div className="stats-card">
      <div className="stats-card__content">
        <div className="stats-card__header">
          <h3 className="stats-card__title">{stats.title}</h3>
          <div
            className={`stats-card__change ${
              stats.isPositive ? "positive" : "negative"
            }`}
          >
            <TrendIcon size={16} />
            <span>{stats.change}</span>
          </div>
        </div>

        <div className="stats-card__value">{stats.value}</div>

        <div className="stats-card__footer">
          <div className="stats-card__bar">
            <div
              className="stats-card__progress"
              style={{ width: `${Math.random() * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
