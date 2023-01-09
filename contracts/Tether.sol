// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

contract Tether {
  string public name = "Tether";
  string public symbol = "USDT";
  uint256 public decimals = 6;
  uint256 public totalSupply = 1000000000000000;
//   mapping(address => uint256) public balanceOf;

//   constructor() public {
//     balanceOf[msg.sender] = totalSupply;
//   }

//   function transfer(address _to, uint256 _value) public returns (bool success) {
//     require(balanceOf[msg.sender] >= _value);
//     balanceOf[msg.sender] -= _value;
//     balanceOf[_to] += _value;
//     return true;
//   }
}