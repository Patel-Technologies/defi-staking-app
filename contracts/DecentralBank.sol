// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

import "./Reward.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Reward reward;
    Tether tether;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor (Tether _tether,Reward _rwd) {
        owner = msg.sender;
        reward = _rwd;
        tether = _tether;
    }

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "amount cannot be 0");

        tether.transferFrom(msg.sender,address(this), _amount);

        stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    function rewardToStakers() public {
        require(msg.sender == owner, "caller must be the owner");

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint256 balance = stakingBalance[recipient] / 10;
            if (balance > 0) {
                reward.transfer(recipient, balance);
            }
        }
    }

    function unStakeTokens() public {
        uint256 balance = stakingBalance[msg.sender];

        require(balance > 0, "staking balance cannot be 0");

        tether.transfer(msg.sender, balance);

        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }

}
