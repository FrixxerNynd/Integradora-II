import React from "react";
import { CheckCircle, AlertTriangle, Info, Activity } from "lucide-react";
import "./ActivityFeed.css";

const iconMap = {
  "check-circle": CheckCircle,
  "alert-triangle": AlertTriangle,
  info: Info,
  activity: Activity,
};

const ActivityFeed = ({ activities, title = "Recent Activity" }) => {
  return (
    <div className="activity-feed">
      <div className="activity-header">
        <h3 className="activity-title">{title}</h3>
      </div>

      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = iconMap[activity.icon] || Activity;
          return (
            <div
              key={activity.id}
              className={`activity-item activity-item--${activity.type}`}
            >
              <div className="activity-icon">
                <Icon size={16} />
              </div>

              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityFeed;
