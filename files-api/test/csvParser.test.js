const { expect } = require("chai");
const { parseCsvStrict } = require("../src/utils/csvParser");

describe("CSV Parser", () => {
  it("should parse valid CSV data according to spec", async () => {
    const csvData = `file,text,number,hex
file1.csv,RgTya,64075909,70ad29aacf0b690b0467fe2b2767f765
file1.csv,AtjW,6,d33a8ca5d36d3106219f66f939774cf5`;

    const result = await parseCsvStrict(csvData);

    expect(result).to.be.an("array");
    expect(result).to.have.length(2);
    expect(result[0]).to.deep.equal({
      text: "RgTya",
      number: 64075909,
      hex: "70ad29aacf0b690b0467fe2b2767f765",
    });
    expect(result[1]).to.deep.equal({
      text: "AtjW",
      number: 6,
      hex: "d33a8ca5d36d3106219f66f939774cf5",
    });
  });

  it("should validate hex as exactly 32 characters", async () => {
    const csvData = `file,text,number,hex
file1.csv,valid,123,70ad29aacf0b690b0467fe2b2767f765
file1.csv,short,456,abc123
file1.csv,long,789,70ad29aacf0b690b0467fe2b2767f765123`;

    const result = await parseCsvStrict(csvData);
    expect(result).to.have.length(1);
    expect(result[0].text).to.equal("valid");
  });

  it("should validate number as integer only", async () => {
    const csvData = `file,text,number,hex
file1.csv,valid,123,70ad29aacf0b690b0467fe2b2767f765
file1.csv,decimal,12.5,70ad29aacf0b690b0467fe2b2767f765
file1.csv,negative,-456,70ad29aacf0b690b0467fe2b2767f765`;

    const result = await parseCsvStrict(csvData);
    expect(result).to.have.length(2);
    expect(result[0].number).to.equal(123);
    expect(result[1].number).to.equal(-456);
  });

  it("should discard lines with missing columns", async () => {
    const csvData = `file,text,number,hex
file1.csv,complete,123,70ad29aacf0b690b0467fe2b2767f765
file1.csv,missing,456
file1.csv,another,789,80be29aacf0b690b0467fe2b2767f766`;

    const result = await parseCsvStrict(csvData);
    expect(result).to.have.length(2);
    expect(result[0].text).to.equal("complete");
    expect(result[1].text).to.equal("another");
  });

  it("should handle empty files", async () => {
    const result = await parseCsvStrict("file,text,number,hex\n");
    expect(result).to.be.an("array");
    expect(result).to.have.length(0);
  });

  it("should handle files with only header", async () => {
    const result = await parseCsvStrict("file,text,number,hex");
    expect(result).to.be.an("array");
    expect(result).to.have.length(0);
  });
});
