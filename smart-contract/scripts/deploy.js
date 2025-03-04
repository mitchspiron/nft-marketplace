const hre = require("hardhat");

async function main() {
  // Déploiement du contrat NFTMarket
  const Market = await hre.ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy();
  await market.waitForDeployment();
  const marketAddress = await market.getAddress();
  console.log("NFTMarket déployé à l'adresse:", marketAddress);

  // Déploiement du contrat NFT en liant le market
  const NFT = await hre.ethers.getContractFactory("NFT");
  const nft = await NFT.deploy(marketAddress);
  await nft.waitForDeployment();
  const nftContractAddress = await nft.getAddress();
  console.log("NFT déployé à l'adresse:", nftContractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
