import { useEffect, useState } from "react";

const Web3login = () => {
  const { ethereum } = window; // 安装了 metamask后  window就有个ethereum的对象
  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    try {
      if (!ethereum) return window.alert("please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum Object.");
    }
  };
  return <div>Web3login,account:{currentAccount}</div>;
};

export default Web3login;
