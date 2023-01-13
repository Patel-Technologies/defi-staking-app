import * as React from 'react';
import './App.css';
import  AppBar from './AppBar';
import Web3 from 'web3';

function App() {
  const [accountAddress, setAccountAddress] = React.useState('');
  let web3;
  function web3Connect() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      // console.log('window.ethereum', window.ethereum);
      window.ethereum.enable();
      web3 = window.web3;
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      web3 = window.web3;
      // console.log('window.web3', window.web3);
    } else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      // console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }

  function convertAccountAddressInto(accountAddress)
  {
    return accountAddress.substring(0, 6) + "..." + accountAddress.substring(accountAddress.length - 4, accountAddress.length);
  }

  function getAccountAddress() {
    web3.eth.getAccounts().then((accounts) => {
      setAccountAddress(convertAccountAddressInto(accounts[0]));
    });
  }

  React.useEffect(() => {
    web3Connect();
    getAccountAddress();
  }, []);

  return (
    <div>
      <AppBar accountAddress={accountAddress} setAccountAddress={setAccountAddress} />
    </div>
  );
}
export default App;
