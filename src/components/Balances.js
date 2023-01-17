import * as React from 'react';
import './Balances.css';

function Body(props) {
  return (
    <div className='balances_main_comp'>
        <div className='balances_inner_comp'>
            <div className='name_balance'>{props.name}</div>
            <div className='main_detail'>
                <img src={props.logo} className='image_logo_currency' alt="Currency logo"></img>
                <div className='currency_name'>{props.symbol}</div>
                <div className='currency_amount'>{props.balance}</div>
            </div>
        </div>
    </div>
  );
}
export default Body;
