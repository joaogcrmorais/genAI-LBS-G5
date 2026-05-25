const path = require("node:path");

module.exports = {
  server: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true,
    fs: {
      allow: [path.resolve(__dirname, "..")]
    }
  },
  preview: {
    host: "127.0.0.1",
    port: 3000,
    strictPort: true
  }
};
