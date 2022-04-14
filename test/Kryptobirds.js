const { assert } = require("chai");
require("chai").use(require("chai-as-promised")).should();

const Kryptobirdz = artifacts.require("Kryptobirdz");

contract("Kryptobirdz", (accounts) => {
  let kryptobirdz;

  beforeEach(async () => {
    kryptobirdz = await Kryptobirdz.new();
  });

  it("contract has a name", async () => {
    const name = await kryptobirdz.name();
    assert.equal(name, "Kryptobird");
  });
});
