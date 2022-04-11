import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";

import {
  contractABI as cfAbi,
  contractAddress as cfAddress,
  campaignAbi,
} from "../contract/CampaignFactory";

const CreateCampaign = () => {
  const web3 = new Web3(window.web3.currentProvider);

  const [account, setAccount] = useState("null");
  const [addarry, setaddarry] = useState("");
  const [contruCount, setContruCount] = useState(0);

  const cfContract = new web3.eth.Contract(cfAbi, cfAddress); // 创建了一个份合约的本地代替版本
  const campaignContract = new web3.eth.Contract(
    campaignAbi,
    "0xE302A373f8B02dD673b8E615AF8c48cE1D878610"
  ); // 创建了一个份合约的本地代替版本

  // console.log(myContract);

  useEffect(() => {
    web3.eth.getAccounts().then((x) => {
      setAccount(x);
    });
  }, []);

  // campaignfactory 合约交互
  const getCampaignAddress = async () => {
    const addarry = await cfContract.methods.getCampaignAddress().call();
    setaddarry(addarry);
  };

  const CampaignCreator = async () => {
    try {
      const txHash = await cfContract.methods
        .CampaignCreator("1000")
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

  // campaign 合约交互

  const getCampaignManager = async () => {
    const manager = await campaignContract.methods.manager().call();
    console.log(manager);
  };
  // 捐款
  const contrubute = async () => {
    try {
      const txHash = await campaignContract.methods
        .contribute()
        .send({ from: account[0], value: 200 })
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
  // 查询捐款人数

  const constributerCount = async () => {
    const count = await campaignContract.methods.constributerCount().call();
    setContruCount(count);
  };
  return (
    <div>
      CreateCampaign
      <div>account:{account}</div>
      <div>
        create a campaign
        <button onClick={CampaignCreator}>BTN</button>
      </div>
      <div>
        getCampaignAddress:{addarry}
        <button onClick={getCampaignAddress}>BTN</button>
      </div>
      <div>
        manager:
        <button onClick={getCampaignManager}>BTN</button>
      </div>
      <div>
        contrubute:
        <button onClick={contrubute}>BTN</button>
      </div>
      <div>
        ContruCount:{contruCount}
        <button onClick={constributerCount}>BTN</button>
      </div>
    </div>
  );
};

export default CreateCampaign;
