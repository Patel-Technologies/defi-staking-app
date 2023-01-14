import * as React from 'react';
import './App.css';
import  AppBar from './AppBar';
import Web3 from 'web3';
import { useEffect , useState } from 'react';
import Tether from '../abis/Tether.json';

function App() {
  //initialize state variable
  const [accountAddress, setAccountAddress] = useState(null);
  const [tether,setTether] = useState({});
  const [rwd,setRwd] = React.useState({});
  const [decentralBank,setDecentralBank] = useState({});
  const [tetherBalance,setTetherBalance] = useState('0');
  const [rwdBalance,setRwdBalance] = useState('0');
  const [stakingBalance,setStakingBalance] = useState('0');
  const [loading,setLoading] = useState(true); 

  // method for connecting metamask
  function web3Connect() {

    if (window.ethereum)
    {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } 
    else if (window.web3) 
    {
      window.web3 = new Web3(window.web3.currentProvider);
    } 
    else 
    {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }

  }

  // method to get account address
  async function getAccountAddress() {
    
    const web3 = window.web3;
    if (web3) {
      const account = await web3.eth.getAccounts();
      setAccountAddress(account[0]);
    }
  }

  // method to set and get network
  async function getNetworkId() {
    const web3 = window.web3;
    if (web3 === undefined) {
      return;
    }
    return await web3.eth.net.getId();
  }

  // method to load smart contract
  async function loadSmartContract() {
    const web3 = window.web3;
    if (web3 === undefined) {
      return;
    }
    const networkId = await getNetworkId();
    const tetherData = Tether.networks[networkId];
    if (tetherData) {
      const tether = new web3.eth.Contract(Tether.abi, tetherData.address);
      setTether(tether);
      if(accountAddress !== null)
      {
        let tetherBalance = await tether.methods.balanceOf(accountAddress).call();
        setTetherBalance(tetherBalance.toString());
      }
    }
    else {
      window.alert('Tether contract not deployed to detected network.');
    }
  }

  useEffect(() => {
    web3Connect();
  }, []);
  
  useEffect(() => {
    getAccountAddress();
    loadSmartContract();
    console.log(accountAddress, "account address");
  }, [accountAddress]);

  return (
    <div>
      <AppBar accountAddress={accountAddress} />
    </div>
  );
}
export default App;
