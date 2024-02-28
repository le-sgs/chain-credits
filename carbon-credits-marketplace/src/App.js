import React, { useState, useEffect } from 'react';
import getWeb3 from './getWeb3';
import InstituteRegistrationABI from './contracts/InstituteRegistration.json';
import CarbonCreditsTradingABI from './contracts/CarbonCreditsTrading.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [instituteName, setInstituteName] = useState('');
  const [orderQuantity, setOrderQuantity] = useState('');
  const [pricePerCredit, setPricePerCredit] = useState('');
  const [isBuyOrder, setIsBuyOrder] = useState(true);
  const [instituteRegistration, setInstituteRegistration] = useState(null);
  const [carbonCreditsTrading, setCarbonCreditsTrading] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        
        const instituteRegContract = new web3.eth.Contract(
          InstituteRegistrationABI,
          '0x615bed92C500dbF44c0651c96d02394016b9BA1c' // New InstituteRegistration address
        );
        const carbonCreditsTradingContract = new web3.eth.Contract(
          CarbonCreditsTradingABI,
          '0x8B5f86C7d772d28Df06237dBF096E69c77C99891' // New CarbonCreditsTrading address
        );

        setWeb3(web3);
        setAccounts(accounts);
        setInstituteRegistration(instituteRegContract);
        setCarbonCreditsTrading(carbonCreditsTradingContract);
      } catch (error) {
        console.error("Failed to load web3, accounts, or contract: ", error);
        alert('Failed to load web3, accounts, or contract. Check console for details.');
      }
    };

    initWeb3();
  }, []);

  const registerInstitute = async (e) => {
    e.preventDefault();
    try {
      const gasPrice = await web3.eth.getGasPrice();
      await instituteRegistration.methods.registerInstitute(instituteName).send({
        from: accounts[0],
        gasPrice
      });
      alert('Institute registered successfully');
    } catch (error) {
      alert('Registration failed. See console for details.');
      console.error(error);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const gasPrice = await web3.eth.getGasPrice();
      await carbonCreditsTrading.methods.placeOrder(
        web3.utils.toWei(orderQuantity, 'ether'), 
        web3.utils.toWei(pricePerCredit, 'ether'), 
        isBuyOrder
      ).send({
        from: accounts[0],
        gasPrice
      });
      alert('Order placed successfully');
    } catch (error) {
      alert('Order placement failed. See console for details.');
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Blockchain-Based Carbon Credits Marketplace</h1>
      <form onSubmit={registerInstitute}>
        <input type="text" value={instituteName} onChange={e => setInstituteName(e.target.value)} placeholder="Institute Name" />
        <button type="submit">Register Institute</button>
      </form>

      <form onSubmit={placeOrder}>
        <input type="text" value={orderQuantity} onChange={e => setOrderQuantity(e.target.value)} placeholder="Quantity" />
        <input type="text" value={pricePerCredit} onChange={e => setPricePerCredit(e.target.value)} placeholder="Price Per Credit" />
        <div>
          <input type="radio" id="buy" name="orderType" checked={isBuyOrder} onChange={() => setIsBuyOrder(true)} /> <label htmlFor="buy">Buy</label>
          <input type="radio" id="sell" name="orderType" checked={!isBuyOrder} onChange={() => setIsBuyOrder(false)} /> <label htmlFor="sell">Sell</label>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default App;
