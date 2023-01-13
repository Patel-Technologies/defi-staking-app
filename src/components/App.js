import * as React from 'react';
import './App.css';
import  AppBar from './AppBar';

function App() {
  const [accountAddress, setAccountAddress] = React.useState('');

  return (
    <div>
      <AppBar accountAddress={accountAddress} setAccountAddress={setAccountAddress} />
    </div>
  );
}
export default App;
