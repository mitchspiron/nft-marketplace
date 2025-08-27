const { time } = require("console");
const { ethers, upgrades, network } = require("hardhat");

async function main() {
  console.log("Deploying upgradeable contracts...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);
  console.log(
    "Account balance:",
    (await deployer.provider.getBalance(deployer.address)).toString()
  );

  // Déploiement du contrat NFTMarketUpgradeable
  console.log("\n1. Deploying NFTMarketUpgradeable...");
  const NFTMarketUpgradeable = await ethers.getContractFactory(
    "NFTMarketUpgradeable"
  );

  const listingPrice = ethers.parseEther("0.025"); // 0.025 ETH
  const nftMarket = await upgrades.deployProxy(
    NFTMarketUpgradeable,
    [listingPrice],
    {
      initializer: "initialize",
      kind: "uups",
    }
  );

  await nftMarket.waitForDeployment();
  const marketAddress = await nftMarket.getAddress();
  console.log("NFTMarketUpgradeable deployed to:", marketAddress);

  // Déploiement du contrat NFTUpgradeable
  console.log("\n2. Deploying NFTUpgradeable...");
  const NFTUpgradeable = await ethers.getContractFactory("NFTUpgradeable");

  const nft = await upgrades.deployProxy(NFTUpgradeable, [marketAddress], {
    initializer: "initialize",
    kind: "uups",
  });

  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log("NFTUpgradeable deployed to:", nftAddress);

  console.log("\n✅ Deployment completed successfully!");
  console.log("📋 Contract Addresses:");
  console.log("   - NFTMarketUpgradeable:", marketAddress);
  console.log("   - NFTUpgradeable:", nftAddress);
  console.log("   - Listing Price:", ethers.formatEther(listingPrice), "ETH");

  // Vérification des contrats déployés
  console.log("\n🔍 Verifying deployments...");
  const marketName = await nft.name();
  const marketSymbol = await nft.symbol();
  const currentListingPrice = await nftMarket.getListingPrice();

  console.log("   - NFT Name:", marketName);
  console.log("   - NFT Symbol:", marketSymbol);
  console.log(
    "   - Current Listing Price:",
    ethers.formatEther(currentListingPrice),
    "ETH"
  );

  // Save address to a file for upgrade scripts
  const fs = require("fs");
  const addresses = {
    NFTMarketUpgradeable: marketAddress,
    NFTUpgradeable: nftAddress,
    listingPrice: listingPrice.toString(),
    deployer: deployer.address,
    network: (await ethers.provider.getNetwork()).name,
    timestamp: new Date().toISOString(),
  };

  fs.writeFileSync(
    `deployed-addresses.json`,
    JSON.stringify(addresses, null, 2)
  );

  console.log("\n💾 Addresses saved to deployed-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
