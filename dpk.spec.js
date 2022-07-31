const { deterministicPartitionKey } = require("./dpk");
const { expect } = require("chai");
const { describe } = require("mocha");
const validInputWithPartitonKey = {
  partitionKey: "123"
};

describe("deterministicPartitionKey", function () {
  it("Returns the literal '0' when given no input", function (done) {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).to.be.a("string");
    expect(trivialKey).to.equal("0");
    done();
  });

  it("Returns some random string for a partiton key", function (done) {
    const trivialKey = deterministicPartitionKey(validInputWithPartitonKey);
    expect(trivialKey).to.be.a("string");
    done();
  });

});
