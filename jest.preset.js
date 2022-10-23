const nxPreset = require('@nrwl/jest/preset').default;

const tenSeconds = 10000;

module.exports = { ...nxPreset, testTimeout: tenSeconds };
