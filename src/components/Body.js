import * as React from 'react';
import './Body.css';
import Decentral_Bank_Image from '../decentral_bank.webp';
import Bank_Decentral from '../bank_dece.webp';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Body({accountAddress}) {
  return (
    <div className='body'>
      <div className='balances_component'>

      </div>
      <div className='transfer_component'>
        <div className='decentral_bank_images'>
            <img src={Decentral_Bank_Image} className='decentral_bank_image'></img>
        </div>
        <div className='transfer_fields'>
            <div className='decentral_logo_compo'>
            <img src={Bank_Decentral} className='bank_decentral_img'></img>
                <div className='text_field_dece'>Decentral Bank</div>
            </div>
            <div className='text_field_compo'>
                <TextField id="outlined-basic" label="Amount in USDT" variant="outlined" />
                <Button variant="contained">Deposit</Button>
                <Button variant="contained">Withdraw</Button>
            </div>
        </div>
      </div>
    </div>
  );
}
export default Body;
