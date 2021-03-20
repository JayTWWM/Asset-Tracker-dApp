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

library Library {
    struct Identity {
        string name;                                            // name
        string email;                                           // email id
        string password;                                        // password
        string position;                                        // position in supply chain(beta)
        address addr;                                           // address
        uint assetCount;                                        // number of assets owned
        mapping (uint => Asset) ownedAssets;                    // list of owned assets
    }
    struct Asset {
        uint ownerFlag;             // owner's asset key
        string assetUid;            // unique id
        string key;                 // verification key
        address ownerAddress;       // current owner's address
        bool isGenuine;             // genuine flag
        bool isVerified;            // verification flag
        uint quantity;              // quantity of the asset batch
    }
    struct Failure {
        uint id;                    // id of the failure
        address owner;                 // address of the owner
        string uid;                 // uid of the asset
    }
}