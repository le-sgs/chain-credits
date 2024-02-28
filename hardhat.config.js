require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    ganache: {
      url: "http://127.0.0.1:8545",
      // No need to specify accounts for Ganache if you're using the default accounts it provides.
      // If you have specific accounts you'd like to use from Ganache, you can specify their private keys here.
    }
  }
};
