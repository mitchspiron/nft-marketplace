const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("NFT Marketplace Upgradeable", function () {
  let nftMarket, nft;
  let owner, addr1, addr2;
  let listingPrice;

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy NFTMarketUpgradeable
    const NFTMarketUpgradeable = await ethers.getContractFactory(
      "NFTMarketUpgradeable"
    );
    listingPrice = ethers.parseEther("0.025");
    nftMarket = await upgrades.deployProxy(
      NFTMarketUpgradeable,
      [listingPrice],
      {
        initializer: "initialize",
        kind: "uups",
      }
    );
    await nftMarket.waitForDeployment();

    // Deploy NFTUpgradeable
    const NFTUpgradeable = await ethers.getContractFactory("NFTUpgradeable");
    const marketAddress = await nftMarket.getAddress();
    nft = await upgrades.deployProxy(NFTUpgradeable, [marketAddress], {
      initializer: "initialize",
      kind: "uups",
    });
    await nft.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy both contracts correctly", async function () {
      expect(await nft.name()).to.equal("Brada Tokens");
      expect(await nft.symbol()).to.equal("BRADA");
      expect(await nftMarket.getListingPrice()).to.equal(listingPrice);
    });

    it("Should set the right owner", async function () {
      expect(await nft.owner()).to.equal(owner.address);
      expect(await nftMarket.owner()).to.equal(owner.address);
    });
  });

  describe("NFT Creation", function () {
    it("Should create a token and return the correct token ID", async function () {
      const tokenURI = "https://example.com/token/1";

      await expect(nft.connect(addr1).createToken(tokenURI)).to.not.be.reverted;

      expect(await nft.getCurrentTokenId()).to.equal(1);
      expect(await nft.getTotalSupply()).to.equal(1);
      expect(await nft.ownerOf(1)).to.equal(addr1.address);
      expect(await nft.tokenURI(1)).to.equal(tokenURI);
    });

    it("Should increment token ID for multiple tokens", async function () {
      await nft.connect(addr1).createToken("https://example.com/token/1");
      await nft.connect(addr2).createToken("https://example.com/token/2");

      expect(await nft.getCurrentTokenId()).to.equal(2);
      expect(await nft.getTotalSupply()).to.equal(2);
    });
  });

  describe("Market Operations", function () {
    let tokenId;

    beforeEach(async function () {
      // Create a token
      const tx = await nft
        .connect(addr1)
        .createToken("https://example.com/token/1");
      const receipt = await tx.wait();
      tokenId = 1; // First token ID
    });

    it("Should create market item", async function () {
      const price = ethers.parseEther("1");
      const nftAddress = await nft.getAddress();

      await expect(
        nftMarket
          .connect(addr1)
          .createMarketItem(nftAddress, tokenId, price, { value: listingPrice })
      ).to.emit(nftMarket, "MarketItemCreated");

      expect(await nftMarket.getTotalItems()).to.equal(1);
    });

    it("Should fail to create market item without listing fee", async function () {
      const price = ethers.parseEther("1");
      const nftAddress = await nft.getAddress();

      await expect(
        nftMarket.connect(addr1).createMarketItem(nftAddress, tokenId, price)
      ).to.be.revertedWith("Price must be equal to listing price");
    });

    it("Should complete a market sale", async function () {
      const price = ethers.parseEther("1");
      const nftAddress = await nft.getAddress();

      // Create market item
      await nftMarket
        .connect(addr1)
        .createMarketItem(nftAddress, tokenId, price, { value: listingPrice });

      // Buy the item
      await expect(
        nftMarket
          .connect(addr2)
          .createMarketSale(nftAddress, 1, { value: price })
      ).to.emit(nftMarket, "MarketItemSold");

      expect(await nft.ownerOf(tokenId)).to.equal(addr2.address);
      expect(await nftMarket.getTotalSoldItems()).to.equal(1);
    });
  });

  describe("Market Queries", function () {
    beforeEach(async function () {
      const nftAddress = await nft.getAddress();
      const price = ethers.parseEther("1");

      // Create multiple tokens and market items
      await nft.connect(addr1).createToken("https://example.com/token/1");
      await nft.connect(addr1).createToken("https://example.com/token/2");
      await nft.connect(addr2).createToken("https://example.com/token/3");

      // List items on market
      await nftMarket
        .connect(addr1)
        .createMarketItem(nftAddress, 1, price, { value: listingPrice });
      await nftMarket
        .connect(addr1)
        .createMarketItem(nftAddress, 2, price, { value: listingPrice });
      await nftMarket
        .connect(addr2)
        .createMarketItem(nftAddress, 3, price, { value: listingPrice });

      // Buy one item
      await nftMarket
        .connect(addr2)
        .createMarketSale(nftAddress, 1, { value: price });
    });

    it("Should fetch unsold market items", async function () {
      const items = await nftMarket.fetchMarketItems();
      expect(items.length).to.equal(2); // 2 unsold items
    });

    it("Should fetch user's NFTs", async function () {
      const items = await nftMarket.connect(addr2).fetchMyNFTs();
      expect(items.length).to.equal(1); // addr2 bought 1 NFT
    });

    it("Should fetch items created by user", async function () {
      const items = await nftMarket.connect(addr1).fetchItemsCreated();
      expect(items.length).to.equal(2); // addr1 created 2 market items
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to update listing price", async function () {
      const newPrice = ethers.parseEther("0.05");

      await expect(nftMarket.updateListingPrice(newPrice)).to.emit(
        nftMarket,
        "ListingPriceUpdated"
      );

      expect(await nftMarket.getListingPrice()).to.equal(newPrice);
    });

    it("Should not allow non-owner to update listing price", async function () {
      const newPrice = ethers.parseEther("0.05");

      await expect(
        nftMarket.connect(addr1).updateListingPrice(newPrice)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });

    it("Should allow owner to update marketplace address in NFT contract", async function () {
      await expect(nft.updateMarketplaceAddress(addr1.address)).to.not.be
        .reverted;

      expect(await nft.contractAddress()).to.equal(addr1.address);
    });
  });

  describe("Contract Upgrade", function () {
    it("Should upgrade NFTMarketUpgradeable", async function () {
      // Deploy new version
      const NFTMarketUpgradeableV2 = await ethers.getContractFactory(
        "NFTMarketUpgradeable"
      );

      // Upgrade
      const upgraded = await upgrades.upgradeProxy(
        nftMarket,
        NFTMarketUpgradeableV2
      );

      // Check that it's still the same address
      expect(await upgraded.getAddress()).to.equal(
        await nftMarket.getAddress()
      );

      // Check that state is preserved
      expect(await upgraded.getListingPrice()).to.equal(listingPrice);
    });

    it("Should upgrade NFTUpgradeable", async function () {
      // Deploy new version
      const NFTUpgradeableV2 = await ethers.getContractFactory(
        "NFTUpgradeable"
      );

      // Upgrade
      const upgraded = await upgrades.upgradeProxy(nft, NFTUpgradeableV2);

      // Check that it's still the same address
      expect(await upgraded.getAddress()).to.equal(await nft.getAddress());

      // Check that state is preserved
      expect(await upgraded.name()).to.equal("Brada Tokens");
    });
  });
});
