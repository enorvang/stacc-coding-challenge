import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";

const formatter = new Intl.NumberFormat('no-NO', {
  style: 'currency',
  currency: 'NOK',
});

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Balance",
    dataIndex: "balanceAmount",
    key: "balanceAmount",
    sorter: {
      compare: (a, b) => a.balanceAmount - b.balanceAmount,
      multiple: 2,
    },
  },
  {
    title: "NOK Value",
    dataIndex: "convertedBalance",
    key: "convertedBalance",
    sorter: {
      compare: (a, b) => a.convertedBalance - b.convertedBalance,
      multiple: 1,
    },
    defaultSortOrder: "descend",
    render: convertedBalance => (
      <p>{formatter.format(convertedBalance)}</p>
    )
  },
  {
    title: "Market Cap",
    dataIndex: "marketCap",
    key: "marketCap",
    sorter: {
      compare: (a, b) => a.marketCap - b.marketCap,
      multiple: 3,
    },
    render: marketCap => (
      <p>{formatter.format(marketCap)}</p>
    )
  },
  {
    title: "Market Cap Rank",
    dataIndex: "marketCapRank",
    key: "marketCapRank",
    sorter: {
      compare: (a, b) => a.marketCapRank - b.marketCapRank,
      multiple: 4,
    },
     
  },
];

/**
 * A wrapper class to customize our table
 * @param {*} accounts our data source. 
 */
const CustomTable = ({ accounts }) => {

  return (
    <Table
      dataSource={accounts}
      columns={columns}
      rowKey={(account) => account.id}
      expandable={{
        expandedRowRender: account => <p style={{margin: 0}}>Coin ID: {account.coinId} <br/> Wallet id: {account.id} <br/> Created: {account.created_at}</p>
      }}
      
    />
  );
};


export default CustomTable;