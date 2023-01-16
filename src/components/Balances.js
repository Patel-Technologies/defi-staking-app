import * as React from 'react';
import './Balances.css';
import Decentral from '../logo.png';

function Body({accountAddress}) {
  return (
    <div className='balances_main_comp'>
        <div className='balances_inner_comp'>
            <div className='name_balance'>Account Balance:</div>
            <div className='main_detail'>
                <img src={Decentral} className='image_logo_currency'></img>
                <div className='currency_name'>Dollar</div>
                <div className='currency_amount'>9784.79</div>
            </div>
        </div>
    </div>
  );
}
export default Body;
