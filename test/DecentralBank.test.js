const Tether = artifacts.require("Tether");
const RWD = artifacts.require("Reward");
const DecentralBank = artifacts.require("DecentralBank");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('DecentralBank', ([owner, customer]) => {
    let decentralBank, tether, rwd

    function ethToWei(eth) {
        return web3.utils.toWei(eth, 'ether')
    }

    before(async () => {
        // Load Contracts
        tether = await Tether.new()
        rwd = await RWD.new()
        decentralBank = await DecentralBank.new(tether.address, rwd.address)

        // Transfer all RWD tokens to DecentralBank (1 million)
        await rwd.transfer(decentralBank.address, ethToWei('1000000'))
    })

    describe('Mock Tether Deployment', async () => {
        it('Matches contract name successfully.', async () => {
            const name = await tether.name()
            assert.equal(name, 'Tether')
        })
    })

    describe('Reward Token Deployment', async () => {
        it('Matches contract name successfully.', async () => {
            const name = await rwd.name()
            assert.equal(name, 'Reward Token')
        })
    })

    describe('Decentral Bank Deployment', async () => {
        it('Matches contract name successfully.', async () => {
            const name = await decentralBank.name()
            assert.equal(name, 'Decentral Bank')
        })

        it('Contract has tokens.', async () => {
            let balance = await rwd.balanceOf(decentralBank.address)
            assert.equal(balance.toString(), ethToWei('1000000'))
        })
    })
})