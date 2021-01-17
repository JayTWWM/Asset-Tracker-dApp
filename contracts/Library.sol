pragma solidity >=0.5.0 <=0.7.4;

library Library {
    struct Identity {
        string name;                                            // name
        string email;                                           // email id
        string password;                                        // password
        string position;                                        // position in supply chain(beta)
        address addr;                                           // address(beta)
        uint assetCount;                                        // number of assets owned
        mapping (uint => Asset) ownedAssets;                    // list of owned assets
    }
    struct Asset {
        string assetUid;            // unique id
        string key;                 // verification key
        address ownerAddress;       // current owner's address(beta)
        bool isGenuine;             // genuine flag
    }
}