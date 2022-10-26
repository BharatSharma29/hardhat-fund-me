const { network } = require("hardhat");

const networkConfig = {
    137: {
        name: "polygon",
        ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    5: {
        name: "goerli",
        ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
};

const deploymentChains = ["hardhat", "localhost"];
const DECIMAL = 8;
const INITIAL_ANSWER = 200000000000;

module.exports = {
    networkConfig,
    deploymentChains,
    DECIMAL,
    INITIAL_ANSWER,
};
