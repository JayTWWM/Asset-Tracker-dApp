pragma solidity >=0.5.0 <=0.7.4;
import "./Library.sol";

contract AssetTracker {

    // // Asset mapping and counter
    // mapping(uint256 => Library.Asset) public AssetStore;
    // uint256 public assetCount = 0;

    // Identity mapping and counter
    mapping(address => Library.Identity) public IdentityStore;

    // // Create Asset
    // function createAsset(
    //     string memory _assetUid
    // ) public returns (uint256) {
    //     // Requires and assets
    //     assetCount++;
    //     AssetStore[assetCount] = AssetLibrary.Asset(_assetUid, "key", msg.sender, true);
    //     uint256 ind = getOwnerIndex(msg.sender);
    //     IdentityStore[ind].assetCount++;
    //     IdentityStore[ind].ownedAssets[IdentityStore[ind].assetCount] = AssetStore[assetCount];
    //     emit AssetCreate(_assetUid,"key");
    // }

    // Sign-up function
    function createIdentity(
        string memory _name,
        string memory _email,
        string memory _password,
        string memory _position
    ) public returns (uint256) {
        require(IdentityStore[msg.sender].addr == address(0),"You Already Have An Account!");
        Library.Identity storage newIdentity = IdentityStore[msg.sender];
        newIdentity.name = _name;
        newIdentity.email = _email;
        newIdentity.password = _password;
        newIdentity.position = _position;
        newIdentity.addr = msg.sender;
        newIdentity.assetCount = 0;
        emit IdentityCreate(_name, _email, _position);
    }

    // Login function
    function logInIdentity(string memory _password) public returns (uint256) {
        require(IdentityStore[msg.sender].addr != address(0),"You Don't Have An Account!");
        string memory acc = IdentityStore[msg.sender].password;
        require(keccak256(abi.encodePacked((acc))) == keccak256(abi.encodePacked((_password))),"Invalid Password");
        string memory _name = IdentityStore[msg.sender].name;
        string memory _email = IdentityStore[msg.sender].email;
        string memory _position = IdentityStore[msg.sender].position;
        emit IdentityLogin(_name, _email, _position);
    }

    // // Check if address exists
    // function checkAddressExists(address addr) private view returns (bool) {
    //     for (uint256 i = 1; i <= identityCount; i++) {
    //         address acc = IdentityStore[i].addresser;
    //         if (keccak256(abi.encodePacked((acc))) == keccak256(abi.encodePacked((addr)))) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // // Check if email exists
    // function checkEmailExists(string memory _email) private view returns (bool) {
    //     for (uint256 i = 1; i <= identityCount; i++) {
    //         string memory acc = IdentityStore[i].email;
    //         if (keccak256(abi.encodePacked((acc))) == keccak256(abi.encodePacked((_email)))) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // // Get email's index
    // function getEmailIndex(string memory _email) private view returns (uint) {
    //     for (uint256 i = 1; i <= identityCount; i++) {
    //         string memory acc = IdentityStore[i].email;
    //         if (keccak256(abi.encodePacked((acc))) == keccak256(abi.encodePacked((_email)))) {
    //             return i;
    //         }
    //     }
    // }

    // // Get owner's index
    // function getOwnerIndex(address addr) private view returns (uint) {
    //     for (uint256 i = 1; i <= identityCount; i++) {
    //         address acc = IdentityStore[i].addresser;
    //         if (keccak256(abi.encodePacked((acc))) == keccak256(abi.encodePacked((addr)))) {
    //             return i;
    //         }
    //     }
    // }

    // // Asset Create Event
    // event AssetCreate(string assetUid, string key);

    // Sign-up Event
    event IdentityCreate(string name, string email, string position);

    // Login Event
    event IdentityLogin(string name, string email, string position);
}
