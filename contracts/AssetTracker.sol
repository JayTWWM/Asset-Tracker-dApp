// SPDX-License-Identifier: Apache-2.0
// 
// Copyright 2021 Jay Mehta
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
// http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

pragma solidity >=0.5.0 <=0.7.4;
import "./Library.sol";

contract AssetTracker {

    // Asset mapping
    mapping(string => Library.Asset) AssetStore;

    // Identity mapping
    mapping(address => Library.Identity) IdentityStore;
    mapping(string => address) private IdentityLookup;

    // Create Asset
    function createAsset(
        string memory _assetUid,
        string memory _random
    ) public returns (uint256) {
        string memory accer = IdentityStore[msg.sender].position;
        require(keccak256(abi.encodePacked((accer))) == keccak256(abi.encodePacked(("Manufacturer"))),"You're not a manufacturer!");
        string memory details = string(abi.encodePacked(IdentityStore[msg.sender].email, IdentityStore[msg.sender].name));
        string memory acc = createKey(_random,_assetUid,details);
        IdentityStore[msg.sender].assetCount++;
        AssetStore[_assetUid] = Library.Asset(IdentityStore[msg.sender].assetCount,_assetUid, acc, msg.sender, true, true);
        IdentityStore[msg.sender].ownedAssets[IdentityStore[msg.sender].assetCount] = AssetStore[_assetUid];
        emit AssetCreate(_assetUid);
    }

    // Get Asset Key
    function getAssetKey(string memory _assetUid) public view returns (string memory) {
        Library.Asset storage curr = AssetStore[_assetUid];
        require(curr.ownerAddress == msg.sender,"You're not the owner!");
        require(curr.isGenuine,"The asset isn't genuine!");
        require(curr.isVerified,"The asset isn't verified!");
        return curr.key;
    }

    // Verification of asset
    function verifyAsset(string memory _assetUid, string memory _key) public returns (uint256) {
        Library.Asset storage curr = AssetStore[_assetUid];
        require(curr.ownerAddress == msg.sender,"You're not the owner!");
        require(curr.isGenuine,"The asset isn't genuine!");
        string memory acc = AssetStore[_assetUid].key;
        string memory _ownerEmail = IdentityStore[msg.sender].email;
        if (keccak256(abi.encodePacked((acc))) == keccak256(abi.encodePacked((_key)))) {
            AssetStore[_assetUid].isVerified = true;
            emit AssetVerificationSuccessful(_ownerEmail,_assetUid);
        } else {
            AssetStore[_assetUid].isGenuine = false;
            emit AssetVerificationFailed(_ownerEmail,_assetUid);
        }
    }

    // Transfer ownership
    function transferOwnership(string memory _assetUid, string memory _receiverEmail) public returns (uint256) {
        Library.Asset storage curr = AssetStore[_assetUid];
        require(curr.ownerAddress == msg.sender,"You're not the owner!");
        require(curr.isGenuine,"The asset isn't genuine!");
        require(curr.isVerified,"The asset isn't verified!");
        string memory _senderEmail = IdentityStore[msg.sender].email;
        address acc = IdentityLookup[_receiverEmail];
        delete IdentityStore[msg.sender].ownedAssets[curr.ownerFlag];
        AssetStore[_assetUid].ownerAddress = acc;
        AssetStore[_assetUid].isVerified = false;
        IdentityStore[acc].assetCount++;
        AssetStore[_assetUid].ownerFlag = IdentityStore[acc].assetCount;
        IdentityStore[acc].ownedAssets[IdentityStore[acc].assetCount] = AssetStore[_assetUid];
        emit AssetOwnershipTransfer(_senderEmail,_receiverEmail);
    }

    // Sell to end consumer
    function sellToEndConsumer(string memory _assetUid)  public returns (uint256) {
        string memory accer = IdentityStore[msg.sender].position;
        require(keccak256(abi.encodePacked((accer))) == keccak256(abi.encodePacked(("Retailer"))),"You're not a retailer!");
        Library.Asset storage curr = AssetStore[_assetUid];
        require(curr.ownerAddress == msg.sender,"You're not the owner!");
        string memory _sellerEmail = IdentityStore[msg.sender].email;
        delete IdentityStore[msg.sender].ownedAssets[curr.ownerFlag];
        emit SoldToEndConsumer(_assetUid,_sellerEmail);
    }

    // Sign-up function
    function createIdentity(
        string memory _name,
        string memory _email,
        string memory _password,
        string memory _position
    ) public returns (uint256) {
        require(IdentityLookup[_email] == address(0),"This email is already used!");
        require(IdentityStore[msg.sender].addr == address(0),"You Already Have An Account!");
        Library.Identity storage newIdentity = IdentityStore[msg.sender];
        newIdentity.name = _name;
        newIdentity.email = _email;
        newIdentity.password = _password;
        newIdentity.position = _position;
        newIdentity.addr = msg.sender;
        newIdentity.assetCount = 0;
        IdentityLookup[_email] = msg.sender;
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

    // Create key for asset
    function createKey(string memory _random, string memory _assetUid, string memory _details) private view returns (string memory) {
        return bytes32ToString(keccak256(abi.encodePacked(_random, _assetUid, _details, block.number)));
    }

    // Bytes32 to string
    function bytes32ToString(bytes32 _bytes32) public pure returns (string memory) {
        uint8 i = 0;
        while(i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    // Asset sold to end consumer
    event SoldToEndConsumer(string assetUid, string sellerEmail);

    // Asset Verification Successful
    event AssetVerificationSuccessful(string ownerEmail, string assetUid);

    // Asset Verification Failed
    event AssetVerificationFailed(string ownerEmail, string assetUid);

    // Asset Ownership Transfer Event
    event AssetOwnershipTransfer(string senderEmail, string receiverEmail);

    // Asset Create Event
    event AssetCreate(string assetUid);

    // Sign-up Event
    event IdentityCreate(string name, string email, string position);

    // Login Event
    event IdentityLogin(string name, string email, string position);
}
