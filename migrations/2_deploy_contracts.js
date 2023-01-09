const Tether = artifacts.require("Tether");
const RWD = artifacts.require("Reward");
const DecentralBank = artifacts.require("DecentralBank");

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Tether);
    const tether = await Tether.deployed()
    await deployer.deploy(RWD);
    const rwd = await RWD.deployed()
    await deployer.deploy(DecentralBank);
    const decentralBank = await DecentralBank.deployed()

    await rwd.transfer(decentralBank.address, '1000000000000000000000000') // 1 million tokens to DecentralBank
    await tether.transfer(accounts[1], '100000000000000000000') // 100 tokens to account[1] for testing purposes
}