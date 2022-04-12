const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

const mnemonic = process.env.MNEMONIC;
const url = process.env.RPC_URL;
const RopstenUrl = process.env.ropsten_URL;

module.exports = {
  networks: {
    development: {
      // ganache
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    cldev: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ganache: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    binance_testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://data-seed-prebsc-1-s1.binance.org:8545"
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    kovan: {
      provider: () => {
        return new HDWalletProvider(
          "nature sample disorder alpha blame pepper stock adjust broken calm decline rib",
          "wss://kovan.infura.io/ws/v3/8906784eb4ea4d43947f35dea6525244"
        );
      },
      network_id: "42",
      skipDryRun: true,
    },
    ropsten: {
      provider: () => {
        return new HDWalletProvider(
          "nature sample disorder alpha blame pepper stock adjust broken calm decline rib",
          "wss://ropsten.infura.io/ws/v3/8906784eb4ea4d43947f35dea6525244"
        );
      },
      network_id: "3", // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    rinkeby: {
      provider: () => {
        return new HDWalletProvider(
          "nature sample disorder alpha blame pepper stock adjust broken calm decline rib",
          "wss://rinkeby.infura.io/ws/v3/8906784eb4ea4d43947f35dea6525244"
        );
      },
      network_id: "4",
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },

  contracts_directory: "./src/contracts",
  contracts_build_directory: "./src/abis",

  compilers: {
    solc: {
      version: "^0.8.0",
      optimizer: {
        enabled: "true",
        runs: 200,
      },
    },
  },
};
