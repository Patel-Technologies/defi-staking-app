// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.0;

import "./Reward.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Reward reward;
    Tether tether;

    constructor (Reward _rwd,Tether _tether) public {
        owner = msg.sender;
        reward = _rwd;
        tether = _tether;
    }
}
