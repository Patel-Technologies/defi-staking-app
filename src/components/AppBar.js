import * as React from 'react';
import './AppBar.css';
import DecentralLogo from '../bank_logo.png';
import UserImage from '../user_image.png';

function ResponsiveAppBar({accountAddress}) {

  // method to convert account address into short form
  function convertAccountAddressInto(accountAddress)
  {
    return accountAddress.substring(0, 6) + "..." + accountAddress.substring(accountAddress.length - 4, accountAddress.length);
  }
  
  return (
    <div className='navbar'>
      <div className='navbar_group'>
        <img src={DecentralLogo} className='decentral_bank_logo'></img>
        <div className='heading'>DAPP Yield Staking </div>
        <div className='user'>
          <div className='account_address'>Account Address: {accountAddress ? convertAccountAddressInto(accountAddress) : "Connect with metamask account."}</div>
          <img src={UserImage} className='name_logo'></img>
        </div>
      </div>
    </div>
  );
}
export default ResponsiveAppBar;
