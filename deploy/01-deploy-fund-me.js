//import
//not need of main function

// function deployFunc(hre) {
//   console.log("hii");
// }

// module.exports.default = deployFunc;

// module.exports = async (hre) => {
//     const {getNamedAccounts, deployments}= hre;
//     hre.getNamedAccounts;
//     hre.deployments;

const { networkConfig, deploymentChains } = require("../helper-hardhat-config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    // This is know as syntactic sugar
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    // if chainId is X the use Y
    // if chainId is Z the use A
    //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

    let ethUsdPriceFeedAddress;

    if (deploymentChains.includes(network.name)) {
        const ethUsdAgggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAgggregator.address;
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    // Mock contracts:
    // if the contract doesn't exist, we deploy a minimal version of it for our local testing

    //well what happens when we want to change chains?
    //when going for localhost or hardhat network  we want to use a mock

    log("Deploying FundMe");

    const args = [ethUsdPriceFeedAddress];
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //    constructor arguments eg:- price feed
        log: true, //  custom logging here so that we don't have to do all that consol.log() stuff
        waitConfirmations: network.config.blockConfirmations,
    });

    if (
        !deploymentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args);
    }

    log("---------------------01-----------------------------");
};

module.exports.tags = ["all", "fundme"];
