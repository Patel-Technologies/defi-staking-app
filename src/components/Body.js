import * as React from 'react';
import './Body.css';
import Decentral_Bank_Image from '../decentral_bank.webp';
import Bank_Decentral from '../bank_dece.webp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Balance from './Balances';
import Tether from '../tether-usdt-logo.png';
import Reward from '../reward.webp';

function Body(props) {
  const [amount, setAmount] = React.useState('0');

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleDeposit = () => {
    if(amount > 0)
    {
      props.stakeTokens(window.web3.utils.toWei(amount.toString()));
    }
  };

  const handleWithdraw = () => {
    props.unstakeTokens();
  };

  return (
    <div className='body'>
      <div className='balances_component'>
        <Balance name="Available Token:" logo={Tether} symbol="USDT" balance={window.web3.utils.fromWei(props.tetherBalance)}/>
        <Balance name="Staking Token:" logo={Tether} symbol="USDT" balance={window.web3.utils.fromWei(props.stakingBalance)}/>
        <Balance name="Reward Token:" logo={Reward} symbol="RWD" balance={window.web3.utils.fromWei(props.rwdBalance)}/>
      </div>
      <div className='transfer_component'>
        <div className='decentral_bank_images'>
            <img src={Decentral_Bank_Image} className='decentral_bank_image' alt="Bank Img"></img>
        </div>
        <div className='transfer_fields'>
            <div className='decentral_logo_compo'>
              <img src={Bank_Decentral} className='bank_decentral_img' alt="Decentral Bank"></img>
                <div className='text_field_dece'>Decentral Bank</div>
            </div>
            <div className='text_field_compo'>
                <TextField id="outlined-basic" label="Amount in USDT" variant="outlined" value={amount} onChange={handleAmountChange}/>
                <Button variant="contained" onClick={handleDeposit}>Deposit</Button>
                <Button variant="contained" onClick={handleWithdraw}>Withdraw</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Body;
