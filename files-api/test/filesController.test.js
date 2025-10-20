const { expect } = require("chai");
const sinon = require("sinon");
const filesController = require("../src/controllers/filesController");
const filesService = require("../src/services/filesService");

describe("FilesController", () => {
  let sandbox;
  let mockReq, mockRes;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockReq = { query: {} };
    mockRes = {
      json: sandbox.stub(),
      status: sandbox.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe("getFilesData", () => {
    it("should return files data successfully", async () => {
      const mockData = [
        {
          file: "test1.csv",
          lines: [{ text: "test", number: 123, hex: "abc123" }],
        },
      ];
      sandbox.stub(filesService, "getFilesData").resolves(mockData);

      await filesController.getFilesData(mockReq, mockRes);

      expect(mockRes.json.calledWith(mockData)).to.be.true;
      expect(mockRes.status.called).to.be.false;
    });

    it("should handle specific file request", async () => {
      const mockData = [{ file: "test1.csv", lines: [] }];
      mockReq.query.fileName = "test1.csv";
      sandbox.stub(filesService, "getFilesData").resolves(mockData);

      await filesController.getFilesData(mockReq, mockRes);

      expect(filesService.getFilesData.calledWith("test1.csv")).to.be.true;
      expect(mockRes.json.calledWith(mockData)).to.be.true;
    });

    it("should handle service errors", async () => {
      const error = new Error("Service error");
      sandbox.stub(filesService, "getFilesData").rejects(error);

      await filesController.getFilesData(mockReq, mockRes);

      expect(mockRes.status.calledWith(500)).to.be.true;
      expect(mockRes.json.calledOnce).to.be.true;
    });
  });

  describe("getFilesList", () => {
    it("should return files list successfully", async () => {
      const mockFiles = ["test1.csv", "test2.csv"];
      sandbox.stub(filesService, "getFilesList").resolves(mockFiles);

      await filesController.getFilesList(mockReq, mockRes);

      expect(mockRes.json.calledWith({ files: mockFiles })).to.be.true;
      expect(mockRes.status.called).to.be.false;
    });

    it("should handle service errors", async () => {
      const error = new Error("API error");
      sandbox.stub(filesService, "getFilesList").rejects(error);

      await filesController.getFilesList(mockReq, mockRes);

      expect(mockRes.status.calledWith(500)).to.be.true;
      expect(mockRes.json.calledOnce).to.be.true;
    });
  });
});
