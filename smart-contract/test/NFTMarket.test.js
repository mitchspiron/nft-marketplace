const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  it("Sould create an execute market sale", async function () {
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.waitForDeployment();
    const marketAddress = market.getAddress();

    expect(marketAddress).to.not.be.null; // Check if address is valid

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.waitForDeployment();
    const nftContractAddress = nft.getAddress();

    expect(nftContractAddress).to.not.be.null;

    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    const auctionPrice = ethers.parseUnits("100", "ether");

    await nft.createToken("https://www.mytokenlocation.com");
    await nft.createToken("https://www.mytokenlocation2.com");

    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });

    const [_, buyerAddress] = await ethers.getSigners();

    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    let items = await market.fetchMarketItems();

    items = await Promise.all(
      items.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        let item = {
          price: i.price.toString(),
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          tokenUri,
        };
        return item;
      })
    );

    console.log("items:", items);
  });

  it("Should retrieve market items correctly", async function () {
    // Deploy contracts
    const Market = await ethers.getContractFactory("NFTMarket");
    const market = await Market.deploy();
    await market.waitForDeployment();
    const marketAddress = await market.getAddress();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy(marketAddress);
    await nft.waitForDeployment();
    const nftContractAddress = await nft.getAddress();

    // Get listing price
    let listingPrice = await market.getListingPrice();
    listingPrice = listingPrice.toString();

    // Set auction price
    const auctionPrice = ethers.parseUnits("100", "ether");

    // Create tokens
    await nft.createToken("https://www.mytokenlocation1.com");
    await nft.createToken("https://www.mytokenlocation2.com");
    await nft.createToken("https://www.mytokenlocation3.com");

    // Create market items
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, {
      value: listingPrice,
    });
    await market.createMarketItem(nftContractAddress, 3, auctionPrice, {
      value: listingPrice,
    });

    // Fetch market items
    let marketItems = await market.fetchMarketItems();

    // Verify there are 3 unsold items
    expect(marketItems.length).to.equal(3);

    // Sell one item
    const [_, buyerAddress] = await ethers.getSigners();
    await market
      .connect(buyerAddress)
      .createMarketSale(nftContractAddress, 1, { value: auctionPrice });

    // Fetch market items again
    marketItems = await market.fetchMarketItems();

    // Verify there are 2 unsold items
    expect(marketItems.length).to.equal(2);

    // Check item details
    const items = await Promise.all(
      marketItems.map(async (i) => {
        const tokenUri = await nft.tokenURI(i.tokenId);
        return {
          itemId: i.itemId.toString(),
          nftContract: i.nftContract,
          tokenId: i.tokenId.toString(),
          seller: i.seller,
          owner: i.owner,
          price: i.price.toString(),
          sold: i.sold,
          tokenUri,
        };
      })
    );

    // Verify the correct items are returned (items 2 and 3 should be available)
    expect(items[0].tokenId).to.equal("2");
    expect(items[1].tokenId).to.equal("3");
    expect(items[0].sold).to.be.false;
    expect(items[1].sold).to.be.false;

    // Verify the tokenURIs match
    expect(items[0].tokenUri).to.equal("https://www.mytokenlocation2.com");
    expect(items[1].tokenUri).to.equal("https://www.mytokenlocation3.com");

    console.log("Market items:", items);
  });
});
