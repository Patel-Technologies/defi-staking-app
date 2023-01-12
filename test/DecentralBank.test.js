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
        // Transfer 100 Mock Tether tokens to investor
        await tether.transfer(customer, ethToWei('100'), { from: owner })
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

        describe('Yield Farming', async () => {
            it('Rewards investors for staking mTokens.', async () => {
                let result
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), ethToWei('100'), 'Customer Mock Tether wallet balance correct before staking.')

                // Customer deposits Mock Tether
                await tether.approve(decentralBank.address, ethToWei('100'), { from: customer })
                await decentralBank.stakeTokens(ethToWei('100'), { from: customer })

                // Check Mock Tether balance after staking
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), ethToWei('0'), 'Customer Mock Tether wallet balance correct after staking.')

                // Check staking balance
                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), ethToWei('100'), 'Decentral Bank Mock Tether balance correct after staking.')

                // Check staking result
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'true', 'Customer staking status correct after staking.')

                // Reward to stakers
                await decentralBank.rewardToStakers({from:owner})
                
                // Checking that stakers get reward or not
                // result = await rwd.balanceOf(customer)
                // assert.equal(result.toString(), ethToWei('100'), 'Customer Reward Token wallet balance correct after staking.')

                // Unstake tocken
                await decentralBank.unStakeTokens({from:customer})

                // Checking that token unstaked or not
                result = await tether.balanceOf(customer)
                assert.equal(result.toString(), ethToWei('100'), 'Customer Mock Tether wallet balance correct after unstaking.')

                // Checking that staking status is false or not
                result = await decentralBank.isStaking(customer)
                assert.equal(result.toString(), 'false', 'Customer staking status correct after unstaking.')

                // Checking that decentralbank balance is 0 or not
                result = await tether.balanceOf(decentralBank.address)
                assert.equal(result.toString(), ethToWei('0'), 'Decentral Bank Mock Tether balance correct after unstaking.')

                // Checking that staking balance is 0 or not
                result = await decentralBank.stakingBalance(customer)
                assert.equal(result.toString(), ethToWei('0'), 'Customer staking balance correct after unstaking.')
            })
        })
    })
})