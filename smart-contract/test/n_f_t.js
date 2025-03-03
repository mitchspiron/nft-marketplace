const NFT = artifacts.require("NFT");

contract("NFT", (accounts) => {
  let nftInstance;
  const marketplaceAddress = accounts[1]; // Simulate a marketplace address

  before(async () => {
    nftInstance = await NFT.new(marketplaceAddress);
  });

  it("should deploy the contract correctly", async () => {
    assert(nftInstance.address !== "", "Contract did not deploy correctly");
  });

  it("should mint a new token and set its URI", async () => {
    const tokenURI = "https://example.com/metadata.json";
    const newItemId = await nftInstance.createToken(tokenURI, { from: accounts[0] });

    const owner = await nftInstance.ownerOf(newItemId.logs[0].args.tokenId);
    const storedTokenURI = await nftInstance.tokenURI(newItemId.logs[0].args.tokenId);

    assert.equal(owner, accounts[0], "Token owner should be the creator");
    assert.equal(storedTokenURI, tokenURI, "Token URI should be correctly set");
  });

  it("should approve the marketplace for all tokens", async () => {
    const isApproved = await nftInstance.isApprovedForAll(accounts[0], marketplaceAddress);
    assert.isTrue(isApproved, "Marketplace should be approved for all tokens");
  });
});
