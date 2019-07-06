const isFilepathWebpackChunk = require("../index");
const webpackStats = require("./cases/helpscout/webpackStats.json");
const getAllChunkNames = require("../getAllChunkNames");
const webpackChunkNames = getAllChunkNames(webpackStats);

describe("detect if file path is webpack chunk", () => {
  it("should return true", () => {
    const filepath =
      "https://dhmmnd775wlnp.cloudfront.net/3398189b92/js/apps/dist/2fa~apps~authentication~beacons~connection-settings~custom-fields~customer-profile~customers~dashboa~aaa993df-234eecb673c7c303f4cf.js";

    expect(isFilepathWebpackChunk(filepath, webpackChunkNames)).toEqual(true);
  });
});
