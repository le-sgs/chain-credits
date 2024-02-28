![alt text](https://github.com/le-sgs/chain-credits/blob/main/cclogore.png)

# Blockchain-based carbon credits marketplace (Hardhat + Ganache)

This project demonstrates a blockchain-based hardhat project with basic functions. It comes with 2 contracts, tests for those contracts, and a script that deploys those contracts.

Try running some of the following tasks:

```shell
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network ganache
```

Remember to create sub-folder "carbon-credits-marketplace". Install Node.js and npm. Then install React in the sub-folder.

Then, create a React app by running
```shell
npx create-react-app carbon-credits-marketplace
```

cd to the app directory.

Install Web3.js
```shell
npm install web3
```

To start the project,
First, run the ganache server and then the React server
```shell
ganache -cli
npm start
```

Make sure Metamask is configured to work with the ganache local network with a new account that was setup with the private key given.

Note: As of now, persistent storage is not available as an option on the Ganache setup. Deployment addresses are susceptible to change upon restarts of the Ganache server. As such, update it on the app, Metamask, etc.
