const { expect } = require("chai");
const sinon = require("sinon");
const nock = require("nock");
const filesService = require("../src/services/filesService");
const externalApi = require("../src/config/externalApi");

describe("FilesService", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    nock.cleanAll();
  });

  afterEach(() => {
    sandbox.restore();
    nock.cleanAll();
  });

  describe("getFilesList", () => {
    it("should return list of files from API", async () => {
      const mockFiles = ["test1.csv", "test2.csv"];
      nock("https://echo-serv.tbxnet.com")
        .get("/v1/secret/files")
        .reply(200, { files: mockFiles });

      const result = await filesService.getFilesList();
      expect(result).to.deep.equal(mockFiles);
    });

    it("should handle API errors", async () => {
      nock("https://echo-serv.tbxnet.com")
        .get("/v1/secret/files")
        .reply(500, { error: "Server Error" });

      try {
        await filesService.getFilesList();
        expect.fail("Should throw error");
      } catch (error) {
        expect(error).to.be.instanceof(Error);
        expect(error.message).to.include("Request failed with status code 500");
      }
    });
  });

  describe("getFilesData", () => {
    const mockCsvData =
      "file,text,number,hex\nfile1.csv,test,123,70ad29aacf0b690b0467fe2b2767f765";

    it("should return parsed CSV data for all files", async () => {
      sandbox
        .stub(externalApi, "get")
        .onFirstCall()
        .resolves({ data: { files: ["test1.csv"] } })
        .onSecondCall()
        .resolves({ data: mockCsvData });

      const result = await filesService.getFilesData();
      expect(result).to.be.an("array");
      expect(result[0]).to.have.property("file", "test1.csv");
      expect(result[0]).to.have.property("lines");
      expect(result[0].lines).to.be.an("array");
      expect(result[0].lines[0]).to.deep.equal({
        text: "test",
        number: 123,
        hex: "70ad29aacf0b690b0467fe2b2767f765",
      });
    });

    it("should return data for specific file", async () => {
      sandbox
        .stub(externalApi, "get")
        .onFirstCall()
        .resolves({ data: { files: ["test1.csv"] } }) // getFilesList call
        .onSecondCall()
        .resolves({ data: mockCsvData }); // get file content call

      const result = await filesService.getFilesData("test1.csv");
      expect(result).to.be.an("array");
      expect(result[0].file).to.equal("test1.csv");
      expect(result[0].lines).to.be.an("array");
      expect(result[0].lines[0]).to.deep.equal({
        text: "test",
        number: 123,
        hex: "70ad29aacf0b690b0467fe2b2767f765",
      });
    });

    it("should validate file names", async () => {
      try {
        await filesService.getFilesData("");
        expect.fail("Should throw error for empty filename");
      } catch (error) {
        expect(error.message).to.include("invalid");
      }
    });

    it("should handle file not found", async () => {
      sandbox
        .stub(externalApi, "get")
        .resolves({ data: { files: ["test1.csv"] } });

      try {
        await filesService.getFilesData("nonexistent.csv");
        expect.fail("Should throw error for non-existent file");
      } catch (error) {
        expect(error.message).to.include("not found");
      }
    });
  });
});
