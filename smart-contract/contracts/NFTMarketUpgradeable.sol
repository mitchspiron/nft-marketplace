// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract NFTMarketUpgradeable is 
    Initializable, 
    ReentrancyGuardUpgradeable, 
    OwnableUpgradeable, 
    UUPSUpgradeable 
{
    uint256 private _itemIdCounter;
    uint256 private _itemsSoldCounter;
    uint256 public listingPrice;

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event MarketItemSold(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price
    );

    event ListingPriceUpdated(uint256 oldPrice, uint256 newPrice);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(uint256 _listingPrice) public initializer {
        __ReentrancyGuard_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        
        require(_listingPrice > 0, "Listing price must be greater than 0");
        listingPrice = _listingPrice;
        _itemIdCounter = 0;
        _itemsSoldCounter = 0;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function updateListingPrice(uint256 _newListingPrice) public onlyOwner {
        require(_newListingPrice > 0, "Listing price must be greater than 0");
        uint256 oldPrice = listingPrice;
        listingPrice = _newListingPrice;
        emit ListingPriceUpdated(oldPrice, _newListingPrice); // Emit event when listing price is updated.
    }

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        require(nftContract != address(0), "Invalid NFT contract address");

        _itemIdCounter++;
        uint256 itemId = _itemIdCounter;

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721Upgradeable(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function createMarketSale(address nftContract, uint256 itemId) 
        public 
        payable 
        nonReentrant 
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        
        require(msg.value == price, "Please submit the asking price to complete the purchase");
        require(!idToMarketItem[itemId].sold, "Item already sold");
        require(idToMarketItem[itemId].seller != address(0), "Item does not exist");

        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721Upgradeable(nftContract).transferFrom(address(this), msg.sender, tokenId);
        
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSoldCounter++;

        payable(owner()).transfer(listingPrice);

        emit MarketItemSold(
            itemId,
            nftContract,
            tokenId,
            idToMarketItem[itemId].seller,
            msg.sender,
            price
        );
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIdCounter;
        uint256 unsoldItemCount = _itemIdCounter - _itemsSoldCounter;
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0) && !idToMarketItem[i + 1].sold) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIdCounter;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Count items owned by msg.sender
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIdCounter;
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        // Count items created by msg.sender
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = idToMarketItem[i + 1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }
        return items;
    }

    function getMarketItem(uint256 itemId) public view returns (MarketItem memory) {
        require(itemId > 0 && itemId <= _itemIdCounter, "Item does not exist");
        return idToMarketItem[itemId];
    }

    function getTotalItems() public view returns (uint256) {
        return _itemIdCounter;
    }

    function getTotalSoldItems() public view returns (uint256) {
        return _itemsSoldCounter;
    }

    function getUnsoldItemsCount() public view returns (uint256) {
        return _itemIdCounter - _itemsSoldCounter;
    }

    // Fonction pour retirer les fonds du contrat (frais de listing accumulés)
    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    // Fonction pour obtenir le balance du contrat
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Fonction d'urgence pour annuler une vente (seulement le propriétaire)
    function emergencyCancelSale(uint256 itemId) public onlyOwner {
        require(itemId > 0 && itemId <= _itemIdCounter, "Item does not exist");
        require(!idToMarketItem[itemId].sold, "Item already sold");
        
        MarketItem storage item = idToMarketItem[itemId];
        
        // Retourner le NFT au vendeur
        IERC721Upgradeable(item.nftContract).transferFrom(address(this), item.seller, item.tokenId);
        
        // Marquer comme vendu pour l'enlever des listes
        item.sold = true;
        item.owner = item.seller;
    }
}