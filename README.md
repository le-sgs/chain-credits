# Blockchain-based carbon credits marketplace (Hardhat + Ganache)

This project demonstrates a blockchain-based hardhat project. basic Hardhat use case. It comes with 2 contracts, tests for those contracts, and a script that deploys those contracts.

Try running some of the following tasks:

```shell
npx hardhat compile
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

Remember to create sub-folder "carbon-credits-marketplace" and install React in it. 

Note: As of now, persistent storage is not available as an option on the Ganache setup. Deployment addresses are susceptible to change upon restarts of the Ganache server. As such, update it on the app, Metamask, etc.
