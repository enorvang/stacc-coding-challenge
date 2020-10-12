import React, { useState, useEffect } from "react";
import accountService from "./services/accountServices";
import coinService from "./services/coinServices";
import CustomTable from "./components/CustomTable";

const App = () => {
  const [accounts, setAccounts] = useState([]);
  const [coins, setCoins] = useState([]);

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
    let accountsWithCurrencyConversion = accounts;
    //sort all accounts. should we do this when fetching in the useEffect instead? probably not, cause that might cause mutation on our accounts.
    accountsWithCurrencyConversion.sort((a, b) =>
      a.name
        .substring(0, 3)
        .toLowerCase()
        .localeCompare(b.name.substring(0, 3).toLowerCase())
    );

    for (let i = 0; i < commonCoins.length; i++) {
      //adds a new field to "nok" under balance with converted amount.
      accountsWithCurrencyConversion[i].convertedBalance = (
        Number(accountsWithCurrencyConversion[i].balance.amount) *
        commonCoins[i].current_price
      ).toFixed(2);

      //Also moving out the balance.amount field so that antDesign table kan read it.

      accountsWithCurrencyConversion[i].balanceAmount =
        accountsWithCurrencyConversion[i].balance.amount;

      //adding market cap fields
      accountsWithCurrencyConversion[i].marketCap = commonCoins[i].market_cap;
      accountsWithCurrencyConversion[i].marketCapRank =
        commonCoins[i].market_cap_rank;
    }
    //return an array sorted on the converted currency
    return accountsWithCurrencyConversion
    
  };

  /**
   * Pings the server.
   */
  const serverStatus = () => {
    coinService.pingServer().then((response) => {
      console.log(response);
      if (response.gecko_says === "(V3) To the Moon!") {
        alert("Server is live and running!");
      }
    });
  };

  return (
    <div>
      <h1>Stacc Coding Challenge</h1>
      <h2>My Cryptocurrency accounts</h2>
      <CustomTable accounts={modifyAccounts()} />
      <button onClick={() => serverStatus()}>Ping Server</button>
    </div>
  );
};

export default App;
