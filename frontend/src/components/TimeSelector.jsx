import { useState, useEffect } from "react";

const TimeSelector = ({ handleInputs }) => {
  const [selectedTime, setSelectedTime] = useState({
    hour: 7,
    minute: 30,
    period: "PM",
  });

  useEffect(() => {
    handleInputs("formData", { time: selectedTime });
  }, [selectedTime.hour, selectedTime.minute, selectedTime.period]);

  const handleTimeChange = (type, value) => {
    setSelectedTime((prevTime) => ({
      ...prevTime,
      [type]: value,
    }));
  };

  return (
    <div className="flex space-x-2">
      {/* Hour */}
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedTime.hour}
        onChange={(e) => handleTimeChange('hour', parseInt(e.target.value, 10))}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={`hour-${i+1}`} value={i+1}>{i + 1}</option>
        ))}
      </select>

      {/* Minute */}
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedTime.minute}
        onChange={(e) => handleTimeChange('minute', parseInt(e.target.value, 10))}
      >
        {Array.from({ length: 60 }, (_, i) => (
          <option key={`minute-${i}`} value={i}>{i < 10 ? `0${i}` : i}</option>
        ))}
      </select>

      {/* AM / PM */}
      <select
        className="select select-bordered w-full max-w-xs"
        value={selectedTime.period}
        onChange={(e) => handleTimeChange('period', e.target.value)}
      >
        {['AM', 'PM'].map((period) => (
          <option key={period} value={period}>{period}</option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector;
