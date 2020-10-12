import React, { useState, useEffect } from "react";
import accountService from "./services/accountServices";
import coinService from "./services/coinServices";
import CustomTable from "./components/CustomTable";
import AccountBalance from "./components/AccountBalance";
import HistoricPrices from "./components/HistoricPrices";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [coins, setCoins] = useState([]);
  const [date, setDate] = useState("");
  const [totalAccountValue, setTotalAccountValue] = useState(0);
  const [modifiedAccs, setModifiedAccs] = useState([]);
  const [historicAccountValue, setHistoricAccountValue] = useState(0);

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
    setModifiedAccs(modifyAccounts());
  });

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

      total = total + converted;

      modifiedAccounts[i].convertedBalance = converted.toFixed(2);

      //Also moving out the balance.amount field so that antDesign table kan read it.
      modifiedAccounts[i].balanceAmount = modifiedAccounts[i].balance.amount;

      //adding market cap fields
      modifiedAccounts[i].marketCap = commonCoins[i].market_cap;
      modifiedAccounts[i].marketCapRank = commonCoins[i].market_cap_rank;

      //adding the id from commonCoins for use with gecko API to fetch history
      modifiedAccounts[i].coinId = commonCoins[i].id;
    }

    setTotalAccountValue(total.toFixed(2));

    //return an array sorted on the converted currency
    return modifiedAccounts;
  };

  const handleDateChange = (date, dateString) => {
    setDate(dateString);
    totalHistory(dateString);
  };

  const totalHistory = (date) => {
    let total = 0;

    if (date) {
      for (let i = 0; i < modifiedAccs.length; i++) {
        coinService
          .getCoinHistory(modifiedAccs[i].coinId, date)
          .then((response) => {
            let nokValue =
              response.market_data.current_price.nok *
              modifiedAccs[i].balanceAmount;
            total = total + nokValue;
            setHistoricAccountValue(total.toFixed(2));
          })
          .catch((error) => console.log(error));
      }
    } else {
      console.log("cleared date");
    }
  };

  return (
    <div>
      <h1>Stacc Coding Challenge</h1>
      <h2>My Cryptocurrency accounts</h2>
      <HistoricPrices
        onDateChange={handleDateChange}
        selectedDate={date}
        historicValue={historicAccountValue}
      />
      <AccountBalance total={totalAccountValue} />
      <CustomTable accounts={modifiedAccs} />
    </div>
  );
};

export default App;
