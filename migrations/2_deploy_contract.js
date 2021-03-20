const AssetTracker = artifacts.require("./AssetTracker.sol");

module.exports = function(deployer) {
    const _arbitrator = '0x55DE89a04014A37aBfE47B4E0c4773DB7d382A65';
    deployer.deploy(AssetTracker,_arbitrator);
};