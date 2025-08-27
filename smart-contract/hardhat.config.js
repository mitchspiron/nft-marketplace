require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");

const projectId = process.env.INFURA_RPC_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: "../client/src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${projectId}`,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${projectId}`,
    },
    ganache: {
      url: "http://127.0.0.1:7545/",
    },
  },
};
