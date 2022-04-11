import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";
import { contractABI, contractAddress } from "../utils/constants";
import {
  contractABI as cfAbi,
  contractAddress as cfAddress,
} from "../contract/CampaignFactory";

const MyWeb3 = () => {
  const web3 = new Web3(window.web3.currentProvider);

  const [account, setAccount] = useState("null");
  const [Counts, setCounts] = useState(0);
  const myContract = new web3.eth.Contract(contractABI, contractAddress); // 创建了一个份合约的本地代替版本
  const cfContract = new web3.eth.Contract(cfAbi, cfAddress); // 创建了一个份合约的本地代替版本
  // console.log(myContract);

  useEffect(() => {
    web3.eth.getAccounts().then((x) => {
      setAccount(x);
    });
    getCounts();
  }, []);

  const addToBlockchain = async () => {
    try {
      const txHash = await myContract.methods
        .addToBlockchain(
          "0xF1499cF08A3CEE06445a8477DA69ae4d8896b1f1",
          "121",
          "mmmm",
          "kkkkk"
        )
        .send({ from: account[0] })
        .on("transactionHash", function (hash) {
          console.log(hash);
        })
        .on("receipt", function (receipt) {
          console.log("SUCCESS!!!");
        });
    } catch (error) {
      console.log("error!!!!!");
      console.error(error);
    }
  };

  const getCounts = async () => {
    console.log({ account });
    const count = await myContract.methods.getTransactionCount().call();
    console.log(count);
    setCounts(count);
  };

  const getAllTransactions = async () => {
    const Transactions = await myContract.methods.getAllTransactions().call();
    console.log(Transactions);
  };

  return (
    <div>
      <h2>account: {account}</h2>
      <p>TransactionCount:{Counts}</p>
      <div>
        addtoblockchain
        <button onClick={addToBlockchain}>BTN</button>
      </div>
      <div>
        getAllTransactions <button onClick={getAllTransactions}> BTN</button>
      </div>
    </div>
  );
};

export default MyWeb3;
