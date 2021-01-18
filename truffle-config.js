module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // for more about customizing your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
            gas: 4698712,
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