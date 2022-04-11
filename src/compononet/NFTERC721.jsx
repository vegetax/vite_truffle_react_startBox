import React, { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";
import Simple721 from "../contract/Simple721.json";

const sampleTokenUri =
  "ipfs://Qmd9MCGtdVz2miNumBHDbvj8bigSgTwnr4SbyH6DNnpWdt?filename=0-PUG.json";

const NFTERC721 = () => {
  const web3 = new Web3(window.web3.currentProvider);

  const [simple721, setContract] = useState();
  const [name, setName] = useState("");
  const [accounts, setCurrentAccount] = useState("");
  useEffect(() => {
    getContract();
  }, []);
  const getContract = async () => {
    setCurrentAccount(await web3.eth.getAccounts());

    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Simple721.networks[networkId];
    const simple721 = new web3.eth.Contract(
      Simple721.abi,
      deployedNetwork && deployedNetwork.address
    );
    console.log(deployedNetwork.address);

    const _name = await simple721.methods.creatorname().call();
    setName(_name);
    setContract(simple721);
  };

  const mintNFT = async () => {
    try {
      simple721.methods
        .createCollectible(sampleTokenUri)
        .send({ from: accounts[0] })
        .on("transactionHash", function (hash) {
          console.log(hash);
        })
        .on("receipt", (receipt) => {
          console.log("SUCCESS!!!");
          const address = receipt.events.itemOnTheWay.returnValues.itemaddress;
          window.alert(`please sender price to ${address} `);
        });
    } catch (error) {
      console.log("error!!!!!");
      console.error(error);
    }
  };

  console.log(name);

  return (
    <div>
      Newtest
      <div>
        <button onClick={mintNFT}> Mint</button>
      </div>
    </div>
  );
};

export default NFTERC721;
