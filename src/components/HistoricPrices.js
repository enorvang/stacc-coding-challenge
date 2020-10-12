import React from "react";
import { DatePicker } from "antd";

const dateFormat = "DD-MM-YYYY";

const HistoricPrices = ({ onDateChange, selectedDate, historicValue }) => {

  const textToShow = selectedDate === "" ? "" : `On ${selectedDate}, the account was worth a total of ${historicValue} NOK`
  return (
    <div>
      <h3>Select date to view historic prices:</h3>
      <DatePicker format={dateFormat} onChange={onDateChange}/>
      <p>{textToShow}</p>
    </div>
  );
};

export default HistoricPrices;
