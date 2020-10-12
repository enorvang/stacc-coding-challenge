import React from "react";
import { DatePicker } from "antd";



const dateFormat = "DD-MM-YYYY";

const disabledDates = (current) => {
  return current && current.valueOf() > Date.now();
};

const HistoricPrices = ({ onDateChange, selectedDate, historicValue }) => {

  const textToShow = selectedDate === "" ? "" : `On ${selectedDate}, the account was worth a total of ${historicValue} `
  return (
    <div>
      <h3>Select date to view historic prices:</h3>
      <DatePicker format={dateFormat} onChange={onDateChange} disabledDate={disabledDates}/>
      <p>{textToShow}</p>
    </div>
  );
};

export default HistoricPrices;
