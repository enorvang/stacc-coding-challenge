import React from "react";

const Account = ({ account }) => {
  return (
    <li>
      Name: {account.name}. Current balance: {account.balance.amount}. In NOK:{" "}
      {account.balance.nok}
    </li>
  );
};

export default Account;
