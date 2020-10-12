import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";

const defaultSort = (a, b) => a-b;


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
      multiple: 3,
    },
  },
  {
    title: "NOK Value",
    dataIndex: "convertedBalance",
    key: "convertedBalance",
    sorter: {
      compare: (a, b) => a.convertedBalance - b.convertedBalance,
      multiple: 4,
    },
    defaultSortOrder: "descend"
  },
  {
    title: "Market Cap",
    dataIndex: "marketCap",
    key: "marketCap",
    sorter: {
      compare: (a, b) => a.marketCap - b.marketCap,
      multiple: 2,
    },
  },
  {
    title: "Market Cap Rank",
    dataIndex: "marketCapRank",
    key: "marketCapRank",
    sorter: {
      compare: (a, b) => a.marketCapRank - b.marketCapRank,
      multiple: 1,
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
      
    />
  );
};


export default CustomTable;