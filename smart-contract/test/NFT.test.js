const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT Contract", function () {
  let nftContract;
  let marketplaceContract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy NFTMarket contract first
    const NFTMarket = await ethers.getContractFactory("NFTMarket");
    marketplaceContract = await NFTMarket.deploy();
    await marketplaceContract.waitForDeployment();

    // Deploy NFT contract with marketplace address
    const NFT = await ethers.getContractFactory("NFT");
    nftContract = await NFT.deploy(marketplaceContract.target);
    await nftContract.waitForDeployment();

    // Get signers
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should create a new token", async function () {
    const tokenURI = "https://example.com/token1";
    
    // Create a token
    const tx = await nftContract.connect(addr1).createToken(tokenURI);
    await tx.wait();

    // Check token owner
    const tokenOwner = await nftContract.ownerOf(1);
    expect(tokenOwner).to.equal(addr1.address);
  });

  it("Should set correct token URI", async function () {
    const tokenURI = "https://example.com/token1";
    
    // Create a token
    await nftContract.connect(addr1).createToken(tokenURI);

    // Retrieve and check token URI
    const retrievedTokenURI = await nftContract.tokenURI(1);
    expect(retrievedTokenURI).to.equal(tokenURI);
  });

  it("Should approve marketplace contract for all tokens", async function () {
    const tokenURI = "https://example.com/token1";
    
    // Create a token
    await nftContract.connect(addr1).createToken(tokenURI);

    // Check if marketplace is approved for all tokens
    const isApprovedForAll = await nftContract.isApprovedForAll(
      addr1.address, 
      marketplaceContract.target
    );
    expect(isApprovedForAll).to.be.true;
  });

  it("Should increment token IDs correctly", async function () {
    const tokenURI1 = "https://example.com/token1";
    const tokenURI2 = "https://example.com/token2";
    
    // Create multiple tokens
    await nftContract.connect(addr1).createToken(tokenURI1);
    await nftContract.connect(addr2).createToken(tokenURI2);
    
    // Check token owners
    const tokenOwner1 = await nftContract.ownerOf(1);
    const tokenOwner2 = await nftContract.ownerOf(2);
    
    expect(tokenOwner1).to.equal(addr1.address);
    expect(tokenOwner2).to.equal(addr2.address);
  });
});