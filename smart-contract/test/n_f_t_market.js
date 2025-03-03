const NFTMarket = artifacts.require("NFTMarket");
const NFT = artifacts.require("NFT");
const { expect } = require("chai");

contract("NFTMarket", function (accounts) {
  let nftMarket;
  let nft;
  const listingPrice = web3.utils.toWei("0.025", "ether");
  const auctionPrice = web3.utils.toWei("1", "ether");

  before(async () => {
    nftMarket = await NFTMarket.deployed();
    nft = await NFT.new(nftMarket.address);
  });

  it("should set the correct listing price", async () => {
    const price = await nftMarket.getListingPrice();
    expect(price.toString()).to.equal(listingPrice);
  });

  it("should create and list an NFT", async () => {
    await nft.createToken("https://mytoken.com/1");

    await nftMarket.createMarketItem(nft.address, 1, auctionPrice, {
      from: accounts[0],
      value: listingPrice,
    });

    const items = await nftMarket.fetchMarketItems();
    expect(items.length).to.equal(1);
    expect(items[0].price.toString()).to.equal(auctionPrice);
    expect(items[0].seller).to.equal(accounts[0]);
    expect(items[0].owner).to.equal(
      "0x0000000000000000000000000000000000000000"
    );
  });

  it("should execute a market sale", async () => {
    await nftMarket.createMarketSale(nft.address, 1, {
      from: accounts[1],
      value: auctionPrice,
    });

    const items = await nftMarket.fetchMarketItems();
    expect(items.length).to.equal(0);

    const myNFTs = await nftMarket.fetchMyNFTs({ from: accounts[1] });
    expect(myNFTs.length).to.equal(1);
    expect(myNFTs[0].owner).to.equal(accounts[1]);
  });

  it("should fetch items created by a user", async () => {
    const itemsCreated = await nftMarket.fetchItemsCreated({
      from: accounts[0],
    });
    expect(itemsCreated.length).to.equal(1);
    expect(itemsCreated[0].seller).to.equal(accounts[0]);
  });
});
