const filesService = require("../services/filesService");

class FilesController {
  async getFilesData(req, res) {
    try {
      const { fileName } = req.query;
      const data = await filesService.getFilesData(fileName);
      res.json(data);
    } catch (error) {
      console.error("System error in getFilesData:", error);

      if (
        error.message.includes("invalid") ||
        error.message.includes("not found")
      ) {
        return res.status(400).json({
          error: "Invalid request",
          detail: error.message,
        });
      }

      res.status(500).json({
        error: "Internal server error",
        detail: "Unable to process request",
      });
    }
  }

  async getFilesList(req, res) {
    try {
      const files = await filesService.getFilesList();
      res.json({ files });
    } catch (error) {
      console.error("Error in getFilesList:", error);
      res.status(500).json({
        error: "Failed to retrieve files list",
        detail: error.message,
      });
    }
  }
}

module.exports = new FilesController();
