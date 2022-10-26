const { network } = require("hardhat");
const {
    deploymentChains,
    DECIMAL,
    INITIAL_ANSWER,
} = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    if (deploymentChains.includes(network.name) /*chainId == "31337"*/) {
        log("Local network detected! Deploying please wait...");
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMAL, INITIAL_ANSWER],
        });
        log("Mocks Deloyed!!!");

        log("--------------------00-------------------------");
    }
};
module.exports.tags = ["all", "mocks"];
