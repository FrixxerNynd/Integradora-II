import React, { useState } from "react";
import { Calendar, Filter } from "lucide-react";
import "./DateFilter.css";

const DateFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    period: "today",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const periods = [
    { value: "custom", label: "Personalizado" },
  ];

  const handlePeriodChange = (period) => {
    const newFilters = { ...filters, period };

    if (period !== "custom") {
      // Auto-generate dates based on period
      const endDate = new Date();
      const startDate = new Date();

      switch (period) {
        case "today":
          startDate.setHours(0, 0, 0, 0);
          break;
        case "week":
          startDate.setDate(startDate.getDate() - 7);
          break;
        case "month":
          startDate.setDate(startDate.getDate() - 30);
          break;
      }

      newFilters.startDate = startDate.toISOString().split("T")[0];
      newFilters.endDate = endDate.toISOString().split("T")[0];
    }

    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleDateChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <div className="date-filter-container">
      <button
        className="filter-toggle"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Filter size={16} />
        <span>Filtros</span>
      </button>

      {isExpanded && (
        <div className="filter-dropdown">
          <div className="filter-section">
            <label>Período:</label>
            <div className="period-buttons">
              {periods.map((period) => (
                <button
                  key={period.value}
                  className={`period-btn ${
                    filters.period === period.value ? "active" : ""
                  }`}
                  onClick={() => handlePeriodChange(period.value)}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>

          {filters.period === "custom" && (
            <div className="custom-date-section">
              <div className="date-input-group">
                <div className="date-input">
                  <Calendar size={14} />
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) =>
                      handleDateChange("startDate", e.target.value)
                    }
                    placeholder="Fecha inicio"
                  />
                </div>
                <span className="date-separator">-</span>
                <div className="date-input">
                  <Calendar size={14} />
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) =>
                      handleDateChange("endDate", e.target.value)
                    }
                    placeholder="Fecha fin"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateFilter;
