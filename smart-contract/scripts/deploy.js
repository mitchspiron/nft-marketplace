const hre = require("hardhat");

async function main() {
  // Deployment of NFTMarket contract
  const Market = await hre.ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy();
  await market.waitForDeployment();
  const marketAddress = await market.getAddress();
  console.log("NFTMarket deployed to address:", marketAddress);

  // Deployment of NFT contract with marketplace
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(marketAddress);
  await nft.waitForDeployment();
  const nftContractAddress = await nft.getAddress();
  console.log("NFT deployed to address:", nftContractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
