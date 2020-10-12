import React, { useState, useEffect } from "react";
import accountService from "./services/accountServices";
import coinService from "./services/coinServices";
import CustomTable from "./components/CustomTable";
import AccountBalance from "./components/AccountBalance";
import { DatePicker } from "antd";

const dateFormat = "DD-MM-YYYY";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [coins, setCoins] = useState([]);
  const [date, setDate] = useState("");
  const [totalAccountValue, setTotalAccountValue] = useState(0);
  const [modifiedAccs, setModifiedAccs] = useState([]);

  /**
   * Fetches all accounts
   */
  useEffect(() => {
    accountService
      .getAll()
      .then((fetchedAccounts) => {
        setAccounts(fetchedAccounts);
        console.log(fetchedAccounts);
      })
      .catch((error) => console.log(error));
  }, []);

  /**
   * Fetches all coins for the given currency
   */
  useEffect(() => {
    coinService
      .getAllCoinsForCurrency("nok")
      .then((coins) => setCoins(coins))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setModifiedAccs(modifyAccounts())
  })

  /**
   * Modifies the accounts array by converting currency and adding some extra info.
   */
  const modifyAccounts = () => {
    //get all currencies in accounts.
    let accountCurrencies = accounts.map((acc) =>
      acc.name.substring(0, 3).toLowerCase()
    );

    //get all common currencies from the large list of coins. sort it alphabetically.
    let commonCoins = coins
      .filter((coin) => accountCurrencies.includes(coin.symbol))
      .sort((a, b) => a.symbol.localeCompare(b.symbol));

    let modifiedAccounts = accounts;
    //sort all accounts.
    modifiedAccounts.sort((a, b) =>
      a.name
        .substring(0, 3)
        .toLowerCase()
        .localeCompare(b.name.substring(0, 3).toLowerCase())
    );

    let total = 0;
    for (let i = 0; i < commonCoins.length; i++) {
      //adds a new field "convertedBalance" to each account.
      let converted =
        Number(modifiedAccounts[i].balance.amount) *
        commonCoins[i].current_price;

      modifiedAccounts[i].convertedBalance = converted.toFixed(2);

      total = total + converted;
      //Also moving out the balance.amount field so that antDesign table kan read it.
      modifiedAccounts[i].balanceAmount = modifiedAccounts[i].balance.amount;

      //adding market cap fields
      modifiedAccounts[i].marketCap = commonCoins[i].market_cap;
      modifiedAccounts[i].marketCapRank = commonCoins[i].market_cap_rank;
    }

    setTotalAccountValue(total.toFixed(2));


    //return an array sorted on the converted currency
    return modifiedAccounts;
  };

  const onDateChange = (date, dateString) => {
    setDate(dateString);
    getHistoryForCoin("bitcoin", dateString);
  };

  const getHistoryForCoin = (id, date) => {
    coinService
      .getCoinHistory(id, date)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Stacc Coding Challenge</h1>
      <h2>My Cryptocurrency accounts</h2>
      <p>Selected date: {date.toString()}</p>
      <DatePicker format={dateFormat} onChange={onDateChange} />
      <AccountBalance total={totalAccountValue} />
      <CustomTable accounts={modifiedAccs} />
    </div>
  );
};

export default App;
