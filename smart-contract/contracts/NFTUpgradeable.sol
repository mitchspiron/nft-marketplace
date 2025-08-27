// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract NFTUpgradeable is 
    Initializable, 
    ERC721Upgradeable, 
    ERC721URIStorageUpgradeable, 
    OwnableUpgradeable, 
    UUPSUpgradeable 
{
    uint256 private _tokenIdCounter;
    address public contractAddress;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address marketplaceAddress) public initializer {
        __ERC721_init("Brada Tokens", "BRADAS"); // formats: ERC721(name, symbol)
        __ERC721URIStorage_init(); // for tokenURI storage
        __Ownable_init(); // for access control
        __UUPSUpgradeable_init(); // for upgradeability
        
        contractAddress = marketplaceAddress;
        _tokenIdCounter = 0;
    }

    function createToken(string memory uri) public returns (uint) {
        _tokenIdCounter++;
        uint256 newItemId = _tokenIdCounter;
        
        _mint(msg.sender, newItemId); // mint the token: mint means create a new token and assign it to an owner
        _setTokenURI(newItemId, uri);
        setApprovalForAll(contractAddress, true);
        
        return newItemId;
    }

    function updateMarketplaceAddress(address newMarketplaceAddress) public onlyOwner {
        require(newMarketplaceAddress != address(0), "Invalid marketplace address");
        contractAddress = newMarketplaceAddress;
    }

    function getCurrentTokenId() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function getTotalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // Override required by Solidity
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721URIStorageUpgradeable)
    {
        super._burn(tokenId);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}