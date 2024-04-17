import React, { useState, useEffect } from "react";

const DateSelector = ({ handleInputs }) => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState({
    year: currentDate.getFullYear(),
    month: currentDate.getMonth(),
    day: currentDate.getDate(),
  });

  const monthsInfo = generateMonthsInfo(currentDate);

  useEffect(() => {
    const daysInMonth = new Date(
      selectedDate.year,
      selectedDate.month + 1,
      0
    ).getDate();
    // Update days dropdown when the month or year changes
    if (selectedDate.day > daysInMonth) {
      setSelectedDate((prev) => ({ ...prev, day: daysInMonth }));
    }

    handleInputs("formData", {
      date: new Date(selectedDate.year, selectedDate.month, selectedDate.day),
    });
  }, [selectedDate.month, selectedDate.year, selectedDate.day]);

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value, 10);
    setSelectedDate((prev) => ({ ...prev, month: newMonth }));
  };

  const handleDayChange = (event) => {
    const newDay = parseInt(event.target.value, 10);
    setSelectedDate((prev) => ({ ...prev, day: newDay }));
  };

  return (
    <div className="flex">
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedDate.month}
        onChange={handleMonthChange}
      >
        {monthsInfo.map((month) => (
          <option key={month.month} value={month.index}>
            {month.month}
          </option>
        ))}
      </select>
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedDate.day}
        onChange={handleDayChange}
      >
        {Array.from(
          {
            length: new Date(
              selectedDate.year,
              selectedDate.month + 1,
              0
            ).getDate(),
          },
          (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default DateSelector;

const generateMonthsInfo = (startDate) => {
  let monthsInfo = [];
  let date = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  for (let i = 0; i < 3; i++) {
    let monthName = date.toLocaleString("default", { month: "long" });
    monthsInfo.push({
      month: monthName,
      index: date.getMonth(),
    });
    date.setMonth(date.getMonth() + 1);
  }
  return monthsInfo;
};
