const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonCreditsTrading", function () {
  let carbonCreditsTrading;
  let owner, addr1, addr2;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const CarbonCreditsTrading = await ethers.getContractFactory("CarbonCreditsTrading");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy a new CarbonCreditsTrading contract for each test
    carbonCreditsTrading = await CarbonCreditsTrading.deploy();
  });

  describe("Order Placement", function () {
    it("Should place buy and sell orders successfully", async function () {
      // Place a buy order
      await carbonCreditsTrading.connect(addr1).placeOrder(100, 10, true);
      // Place a sell order
      await carbonCreditsTrading.connect(addr2).placeOrder(100, 10, false);

      const buyOrder = await carbonCreditsTrading.orders(0);
      const sellOrder = await carbonCreditsTrading.orders(1);

      expect(buyOrder.isBuyOrder).to.equal(true);
      expect(sellOrder.isBuyOrder).to.equal(false);
    });
  });

  describe("Order Matching", function () {
    it("Should match orders correctly", async function () {
      // Place a sell order
      await carbonCreditsTrading.connect(addr1).placeOrder(100, 10, false);
      // Place a matching buy order
      await carbonCreditsTrading.connect(addr2).placeOrder(100, 10, true);

      const trade = await carbonCreditsTrading.trades(0);

      expect(trade.buyer).to.equal(addr2.address);
      expect(trade.seller).to.equal(addr1.address);
      expect(trade.quantity).to.equal(100);
      expect(trade.pricePerCredit).to.equal(10);
    });
  });
});
