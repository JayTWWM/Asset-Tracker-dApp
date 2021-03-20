module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
            gas: 6721975,
            gasPrice: 25000000000
        }
    },
    solc: {
        optimizer: {
            enabled: true,
            runs: 200
        }
    }
};
// const HDWalletProvider = require('@truffle/hdwallet-provider');
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

// module.exports = {
//     networks: {
//         development: {
//             host: "127.0.0.1", // Localhost (default: none)
//             port: 7545, // Standard Ethereum port (default: none)
//             network_id: "*", // Any network (default: none)
//         },
//         matic: {
//             provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
//             network_id: 80001,
//             confirmations: 2,
//             timeoutBlocks: 200,
//             skipDryRun: true
//         },
//     },

//     // // Set default mocha options here, use special reporters etc.
//     // mocha: {
//     //     // timeout: 100000
//     // },

//     solc: {
//         optimizer: {
//             enabled: true,
//             runs: 200
//         }
//     }
// }