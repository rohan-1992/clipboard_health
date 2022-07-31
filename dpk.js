const crypto = require("crypto");

// Generate Hash and Trim the length of candidate
function getCandidate(data) {
    return crypto.createHash("sha3-512").update(data).digest("hex");
}

function getCandidateFromEvent(event) {
    let { partitionKey } = event;
    let data;
    if (partitionKey) {
        data = (typeof partitionKey) === "string" ? partitionKey : JSON.stringify(partitionKey);
    } else {
        data = JSON.stringify(event)
    };
    return getCandidate(data);
}

const deterministicPartitionKey = (event) => {
    const TRIVIAL_PARTITION_KEY = "0";
    const MAX_PARTITION_KEY_LENGTH = 256;
    let candidate;
    if (event) {
        candidate = getCandidateFromEvent(event);
    } else {
        candidate = TRIVIAL_PARTITION_KEY;
    }

    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        return getCandidate(candidate);
    }

    return candidate;
};

module.exports = {
    deterministicPartitionKey
}