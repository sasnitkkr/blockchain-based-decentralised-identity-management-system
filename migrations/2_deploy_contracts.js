var Defence = artifacts.require("./Defence.sol");
var University = artifacts.require("./University.sol");

module.exports = function (deployer) {
  deployer.deploy(Defence);
  deployer.deploy(University);
};
