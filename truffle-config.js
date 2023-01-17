const path = require("path");
const fs = require("fs-extra");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/abis"),
  networks: {
    development: {
     host: "0.0.0.0",     // Localhost (default: none)
     port: 7545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
     gas: 2100000,
     gasPrice: 8000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.17", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
         enabled: false,
         runs: 200
       },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
