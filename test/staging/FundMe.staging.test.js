const { assert } = require("chai");
const { ethers, getNamedAccounts, network } = require("hardhat");
const { deploymentChains } = require("../../helper-hardhat-config");

deploymentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", async function () {
          let fundMe;
          let deployer;
          let sendValue = ethers.utils.parseEther("0.2");
          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer;
              fundMe = await ethers.getContract("FundMe", deployer);
          });

          it("Allows to fund and withdraw amount", async function () {
              await fundMe.fund({ value: sendValue });
              await fundMe.withdraw();
              const endingFundMeBalance = await fundMe.provider.getBalance(
                  fundMe.address
              );
              assert.equal(endingFundMeBalance.toString(), "0");
          });
      });
