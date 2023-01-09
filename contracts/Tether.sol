// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

contract Tether {
  string public name = "Tether";
  string public symbol = "USDT";
  uint256 public decimals = 6;
  uint256 public totalSupply = 1000000000000000;

  event Transfer(address indexed from, address indexed to, uint256 value);

  event Approval(address indexed owner, address indexed spender, uint256 value);

  mapping(address => uint256) public balanceOf;

  mapping(address => mapping(address => uint256)) public allowance;

  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value);
    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  function approve(address _spender, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_spender] = _value;
    emit Approval(msg.sender, _spender, _value);
    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(_value <= balanceOf[_from]); 
    require(_value <= allowance[_from][msg.sender]);
    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;
    allowance[_from][msg.sender] -= _value; 
    emit Transfer(_from, _to, _value);
    return true;
  }

}