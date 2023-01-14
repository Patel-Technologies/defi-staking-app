import * as React from 'react';
import './App.css';
import  AppBar from './AppBar';
import Web3 from 'web3';

function App() {
  //initialize state variable
  const [accountAddress, setAccountAddress] = React.useState('');
  const [tether,setTether] = React.useState({});
  const [rwd,setRwd] = React.useState({});
  const [decentralBank,setDecentralBank] = React.useState({});
  const [tetherBalance,setTetherBalance] = React.useState('0');
  const [rwdBalance,setRwdBalance] = React.useState('0');
  const [stakingBalance,setStakingBalance] = React.useState('0');
  const [loading,setLoading] = React.useState(true); 

  // initialize web3 variable
  let web3;

  // method for connecting metamask
  function web3Connect() {

    if (window.ethereum)
    {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      web3 = window.web3;
    } 
    else if (window.web3) 
    {
      window.web3 = new Web3(window.web3.currentProvider);
      web3 = window.web3;
    } 
    else 
    {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

  }

  // method to convert account address into short form
  function convertAccountAddressInto(accountAddress)
  {
    return accountAddress.substring(0, 6) + "..." + accountAddress.substring(accountAddress.length - 4, accountAddress.length);
  }

  // method to get account address
  async function getAccountAddress() {
    await web3.eth.getAccounts().then((accounts) => {
      setAccountAddress(convertAccountAddressInto(accounts[0]));
    });
  }

  // method to set and get network
  async function getNetworkId() {
    return await web3.eth.net.getId();
  }

  React.useEffect(async () => {
    await web3Connect();
    await getAccountAddress();
  }, []);

  return (
    <div>
      <AppBar accountAddress={accountAddress} setAccountAddress={setAccountAddress} />
    </div>
  );
}
export default App;
