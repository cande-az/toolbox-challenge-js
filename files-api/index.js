const app = require("./src/server");

const { PORT } = require("./src/config/envs");

app.listen(PORT || 3000, () => {
  console.log(`🚀 API running on port ${PORT || 3000}`);
});
