import * as React from 'react';
import './App.css';
import  AppBar from './AppBar';
import Web3 from 'web3';
import { useEffect , useState } from 'react';
import Tether from '../abis/Tether.json';
import DecentralBank from '../abis/DecentralBank.json';
import RWD from '../abis/Reward.json';
import Body from './Body';

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
  
  // checking every state variable in console
  console.log('Account Address',accountAddress);
  console.log('Tether contract',tether);
  console.log('Reward Contract',rwd);
  console.log('DecentralBank Contract',decentralBank);
  console.log('Tether Balance',tetherBalance);
  console.log('Reward Balance',rwdBalance);
  console.log('Staking Balance',stakingBalance);
  console.log('Loading',loading);


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

    // Load Tether
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

    // Load RWD
    const rwdData = RWD.networks[networkId];
    if (rwdData) {
      const rwd = new web3.eth.Contract(RWD.abi, rwdData.address);
      setRwd(rwd);
      if(accountAddress !== null)
      {
        let rwdBalance = await rwd.methods.balanceOf(accountAddress).call();
        setRwdBalance(rwdBalance.toString());
      }
    }
    else {
      window.alert('RWD contract not deployed to detected network.');
    }

    // Load DecentralBank
    const decentralBankData = DecentralBank.networks[networkId];
    if (decentralBankData) {
      const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address);
      setDecentralBank(decentralBank);
      if(accountAddress !== null)
      {
        let stakingBalance = await decentralBank.methods.stakingBalance(accountAddress).call();
        setStakingBalance(stakingBalance.toString());
      }
    }
    else {
      window.alert('DecentralBank contract not deployed to detected network.');
    }
    if(accountAddress !== null)
    {
      return ;
    }
    setLoading(false);
  }

  const stakeTokens = (amount) => {
    setLoading(true);
    tether.methods.approve(decentralBank._address, amount).send({ from: accountAddress }).on('transactionHash', (hash) => {
      decentralBank.methods.stakeTokens(amount).send({ from: accountAddress }).on('transactionHash', (hash) => {
        setLoading(false);
      })
    })
  }

  const unstakeTokens = () => {
    setLoading(true);
    decentralBank.methods.unStakeTokens().send({ from: accountAddress }).on('transactionHash', (hash) => {
      setLoading(false);
    })
  }

  useEffect(() => {
    web3Connect();
  }, []);
  
  useEffect(() => {
    getAccountAddress();
    loadSmartContract();
  }, [accountAddress]);

  if(loading === false)
  {
    return (
      <div className='dashboard'>
        <AppBar accountAddress={accountAddress} />
        <Body 
          accountAddress={accountAddress}
          tetherBalance={tetherBalance}
          rwdBalance={rwdBalance}
          stakingBalance={stakingBalance} 
          stakeTokens={stakeTokens}
          unstakeTokens={unstakeTokens}
        > 
        </Body>
      </div>
    );
  }
  else
  {
    return(
      <div className='dashboard'>
        <h3 className='loading'>Loading...</h3>
      </div>
    );
  }

 
}
export default App;
