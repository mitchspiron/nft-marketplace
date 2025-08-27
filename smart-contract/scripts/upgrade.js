const { ethers, upgrades } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🔄 Starting contract upgrades...");

  // Lire les adresses déployées
  let addresses;
  try {
    const addressesData = fs.readFileSync("deployed-addresses.json", "utf8");
    addresses = JSON.parse(addressesData);
    console.log("📖 Loaded addresses from deployed-addresses.json");
  } catch (error) {
    console.error("❌ Could not read deployed-addresses.json");
    console.log(
      "Please run deploy-upgradeable.js first or provide addresses manually"
    );
    process.exit(1);
  }

  const MARKET_PROXY_ADDRESS = addresses.NFTMarketUpgradeable;
  const NFT_PROXY_ADDRESS = addresses.NFTUpgradeable;

  console.log("📍 Using addresses:");
  console.log("   - NFTMarketUpgradeable:", MARKET_PROXY_ADDRESS);
  console.log("   - NFTUpgradeable:", NFT_PROXY_ADDRESS);

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Upgrading with account:", deployer.address);

  try {
    // Upgrade du NFTMarketUpgradeable
    console.log("\n1. Upgrading NFTMarketUpgradeable...");
    const NFTMarketUpgradeableV2 = await ethers.getContractFactory(
      "NFTMarketUpgradeable"
    );

    console.log("   - Validating upgrade compatibility...");
    await upgrades.validateUpgrade(
      MARKET_PROXY_ADDRESS,
      NFTMarketUpgradeableV2
    );

    console.log("   - Performing upgrade...");
    const upgradedMarket = await upgrades.upgradeProxy(
      MARKET_PROXY_ADDRESS,
      NFTMarketUpgradeableV2
    );
    await upgradedMarket.waitForDeployment();

    console.log("✅ NFTMarketUpgradeable upgraded successfully");
    console.log("   - Proxy address:", await upgradedMarket.getAddress());

    // Vérifier que l'état est préservé
    const listingPrice = await upgradedMarket.getListingPrice();
    console.log(
      "   - Listing price preserved:",
      ethers.formatEther(listingPrice),
      "ETH"
    );

    // Upgrade du NFTUpgradeable
    console.log("\n2. Upgrading NFTUpgradeable...");
    const NFTUpgradeableV2 = await ethers.getContractFactory("NFTUpgradeable");

    console.log("   - Validating upgrade compatibility...");
    await upgrades.validateUpgrade(NFT_PROXY_ADDRESS, NFTUpgradeableV2);

    console.log("   - Performing upgrade...");
    const upgradedNFT = await upgrades.upgradeProxy(
      NFT_PROXY_ADDRESS,
      NFTUpgradeableV2
    );
    await upgradedNFT.waitForDeployment();

    console.log("✅ NFTUpgradeable upgraded successfully");
    console.log("   - Proxy address:", await upgradedNFT.getAddress());

    // Vérifier que l'état est préservé
    const nftName = await upgradedNFT.name();
    const nftSymbol = await upgradedNFT.symbol();
    const totalSupply = await upgradedNFT.getTotalSupply();

    console.log("   - Name preserved:", nftName);
    console.log("   - Symbol preserved:", nftSymbol);
    console.log("   - Total supply:", totalSupply.toString());

    console.log("\n🎉 All upgrades completed successfully!");

    // Mettre à jour le fichier avec les nouvelles informations
    addresses.lastUpgrade = new Date().toISOString();
    addresses.upgradeCount = (addresses.upgradeCount || 0) + 1;

    fs.writeFileSync(
      "deployed-addresses.json",
      JSON.stringify(addresses, null, 2)
    );
  } catch (error) {
    console.error("❌ Upgrade failed:", error.message);

    if (error.message.includes("upgrade")) {
      console.log("\n💡 Common upgrade issues:");
      console.log(
        "   - Storage layout changes (added/removed/reordered state variables)"
      );
      console.log(
        "   - Constructor changes (use initializer functions instead)"
      );
      console.log("   - Incompatible changes in parent contracts");
    }

    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
